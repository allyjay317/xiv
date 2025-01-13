package main

import (
	"log"
	"net/http"

	"github.com/alyjay/xiv/user"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/users", user.GetUsers).Methods("GET")
	router.HandleFunc("/users", user.CreateUser).Methods("POST")
	log.Fatal(http.ListenAndServe(":8080", router))
}
