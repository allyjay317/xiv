package user

import (
	"encoding/json"
	"net/http"

	database "github.com/alyjay/xivdb"
	"github.com/google/uuid"

	_ "github.com/lib/pq"
)

type User struct {
	ID       string `json:"id,omitempty" db:"id"`
	Username string `json:"username" db:"username"`
	Email    string `json:"email" db:"email"`
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
