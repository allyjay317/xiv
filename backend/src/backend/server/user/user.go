package user

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"

	database "github.com/alyjay/xivdb"
	"github.com/google/uuid"

	_ "github.com/lib/pq"
)

type User struct {
	ID       string `json:"id,omitempty" db:"id"`
	Username string `json:"username" db:"username"`
	Email    string `json:"email" db:"email"`
}

type LoginRequest struct {
	Code string `json:"code"`
}

type AuthTokenRequest struct {
	ClientId     string `json:"client_id"`
	ClientSecret string `json:"client_secret"`
	Code         string `json:"code"`
	GrantType    string `json:"grant_type"`
	RedirectURI  string `json:"redirect_uri"`
	Scope        string `json:"scope"`
}

type AuthTokenResponse struct {
	AccessToken  string `json:"access_token"`
	TokenType    string `json:"token_type"`
	ExpiresIn    int    `json:"expires_in"`
	RefreshToken string `json:"refresh_token"`
	Scope        string `json:"scope"`
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []User
	db, err := database.GetDb(w)
	if err != nil {
		return
	}
	err = db.Select(&users, "SELECT id, username, email FROM users")

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("500 - Server Issue"))
		return
	}
	json.NewEncoder(w).Encode(users)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var newUser User
	_ = json.NewDecoder(r.Body).Decode(&newUser)
	newUUID := uuid.NewString()

	db, err := database.GetDb(w)
	if err != nil {
		return
	}

	_, err = db.Exec(`INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4)`, newUUID, newUser.Username, newUser.Email, "hunter2")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("500 - Server Issue"))
		return
	}
	newUser.ID = newUUID
	json.NewEncoder(w).Encode(newUser)
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	client_id, _ := os.LookupEnv("DISCORD_CLIENT_ID")
	client_secret, _ := os.LookupEnv("DISCORD_CLIENT_SECRET")
	redirect_uri, _ := os.LookupEnv("DISCORD_REDIRECT_URI")
	site_url, _ := os.LookupEnv("SITE_URL")
	code := r.URL.Query().Get("code")
	pUrl := "https://discord.com/api/oauth2/token"
	b := AuthTokenRequest{
		ClientId:     client_id,
		ClientSecret: client_secret,
		Code:         code,
		GrantType:    "client_credentials",
		RedirectURI:  redirect_uri,
		Scope:        "identify",
	}
	payloadBuf := new(bytes.Buffer)

	data := url.Values{}
	data.Set("client_id", client_id)
	data.Set("client_secret", client_secret)
	data.Set("code", code)
	data.Set("grant_type", "authorization_code")
	data.Set("redirect_uri", redirect_uri)

	json.NewEncoder(payloadBuf).Encode(b)

	resp, err := http.Post(pUrl, "application/x-www-form-urlencoded", strings.NewReader(data.Encode()))
	if err != nil {
		http.Redirect(w, r, site_url+"/error", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Redirect(w, r, site_url+"/error", http.StatusInternalServerError)
		return
	}

	var result AuthTokenResponse
	err = json.Unmarshal([]byte(body), &result)
	if err != nil {
		http.Redirect(w, r, site_url+"/error", http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, site_url+"/login?authorization_token="+result.AccessToken+"&token_type="+result.TokenType, http.StatusSeeOther)
}
