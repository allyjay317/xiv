package user

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/alyjay/xiv/character"
	database "github.com/alyjay/xivdb"
	"github.com/google/uuid"

	_ "github.com/lib/pq"
)

type User struct {
	ID          string                `json:"id,omitempty" db:"id"`
	Username    string                `json:"username" db:"username"`
	DiscordId   string                `json:"discord_id" db:"discord_id"`
	Avatar      string                `json:"avatar" db:"avatar"`
	AccentColor string                `json:"accent_color" db:"accent_color"`
	Characters  []character.Character `json:"characters"`
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

type DiscordUserResponse struct {
	Id                   string `json:"id"`
	Username             string `json:"username"`
	Avatar               string `json:"avatar"`
	Discriminator        string `json:"discriminator"`
	PublicFlags          int    `json:"public_flags"`
	Flags                int    `json:"flags"`
	Banner               string `json:"banner"`
	AccentColor          int    `json:"accent_color"`
	GlobalName           string `json:"global_name"`
	AvatarDecorationData map[string]struct {
		SkuId string `json:"sku_id"`
		Asset string `json:"asset"`
	} `json:"avatar_decoration_data"`
	BannerColor  string              `json:"banner_color"`
	Clan         map[string]struct{} `json:"clan"`
	PrimaryGuild map[string]struct{} `json:"primary_guild"`
	MfaEnabled   bool                `json:"mfa_enabled"`
	Locale       string              `json:"locale"`
	PremiumType  int                 `json:"premium_type"`
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	var user User
	var characters []character.Character
	id := r.URL.Query().Get("id")

	db, err := database.GetDb(w)
	if err != nil {
		return
	}
	err = db.Get(&user, `SELECT * FROM users WHERE id=$1`, id)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("No User Found"))
		return
	}

	err = db.Select(&characters, `SELECT character_id, name, avatar, portrait FROM characters WHERE user_id=$1`, id)
	if err != nil {

	}

	user.Characters = append(user.Characters, characters...)

	json.NewEncoder(w).Encode(user)
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

	client := &http.Client{}
	req, _ := http.NewRequest("GET", "https://discord.com/api/users/@me", nil)
	req.Header.Set("Authorization", result.TokenType+" "+result.AccessToken)
	res, err := client.Do(req)
	if err != nil {
		http.Redirect(w, r, site_url+"/error", http.StatusInternalServerError)
		return
	}

	defer res.Body.Close()

	var userResult DiscordUserResponse
	_ = json.NewDecoder(res.Body).Decode(&userResult)

	newUUID := uuid.NewString()

	db, err := database.GetDb(w)
	if err != nil {
		return
	}

	var user User
	user.ID = newUUID
	err = db.Get(&user, `SELECT * FROM users WHERE discord_id=$1`, userResult.Id)
	if err != nil {
		user.Username = userResult.Username
		user.DiscordId = userResult.Id
		user.Avatar = userResult.Avatar
		if userResult.AccentColor != 0 {
			user.AccentColor = fmt.Sprintf("#%x", userResult.AccentColor)
		} else if userResult.BannerColor != "" {
			user.AccentColor = userResult.BannerColor
		}
		_, err = db.Exec(`INSERT INTO users (id, username, discord_id, avatar, accent_color) VALUES ($1, $2, $3, $4, $5)`,
			user.ID,
			user.Username,
			user.DiscordId,
			user.Avatar,
			user.AccentColor,
		)
	}

	http.Redirect(w, r, site_url+"/login?id="+user.ID, http.StatusSeeOther)
}
