package user

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	"os"

	"github.com/google/uuid"

	_ "github.com/lib/pq"
)

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

func GetDb() (db *sql.DB, err error) {
	connStr, exists := os.LookupEnv("DATABASE_CONN_STR")
	if !exists {
		return nil, errors.New("connection string Not Found")
	}
	db, err = sql.Open("postgres", connStr)
	return db, err
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []User
	db, err := GetDb()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("500 - Database Connection Error"))
	}
	rows, err := db.Query("SELECT id, username, email FROM users")
	for rows.Next() {
		var u User
		err = rows.Scan(&u.ID, &u.Username, &u.Email)
		users = append(users, u)
	}

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

	db, err := GetDb()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("500 - Server Issue"))
		return
	}
	userNameOrEmailExists := false
	err = db.QueryRow(`SELECT EXISTS(SELECT 1 FROM users WHERE username = $1 OR email = $2) AS "exists"`, newUser.Username, newUser.Email).Scan(&userNameOrEmailExists)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("500 - Server Issue"))
		return
	}
	if userNameOrEmailExists {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("400 User exists"))
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
