package main

import (
	"log"
	"net/http"

	"github.com/alyjay/xiv/character"
	"github.com/alyjay/xiv/user"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/user", user.GetUser).Methods("GET")
	// router.HandleFunc("/users", user.CreateUser).Methods("POST")
	router.HandleFunc("/login", user.LoginUser).Methods("GET")
	router.HandleFunc("/character", character.SearchCharacter).Methods("POST")
	router.HandleFunc("/character/verify", character.VerifyCharacter).Methods("POST")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "web.postman.co"},
		AllowCredentials: true,
	})

	log.Fatal(http.ListenAndServe(":8080", c.Handler(router)))
}
