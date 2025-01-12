package database

import (
	"errors"
	"net/http"
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func GetDb(w http.ResponseWriter) (db *sqlx.DB, err error) {
	connStr, exists := os.LookupEnv("DATABASE_CONN_STR")
	if !exists {
		return nil, errors.New("connection string Not Found")
	}
	db, err = sqlx.Connect("postgres", connStr)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("500 - Server Issue"))
		return
	}

	return db, err
}
