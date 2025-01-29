package main

import (
	"log"
	"net/http"

	"github.com/alyjay/xiv/character"
	"github.com/alyjay/xiv/gearset"
	"github.com/alyjay/xiv/user"
	database "github.com/alyjay/xivdb"
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
	database.Migrate()

	router := mux.NewRouter()
	router.HandleFunc("/user", user.GetUser).Methods("GET")
	// router.HandleFunc("/users", user.CreateUser).Methods("POST")
	router.HandleFunc("/login", user.LoginUser).Methods("GET")
	router.HandleFunc("/character", character.SearchCharacter).Methods("POST")
	router.HandleFunc("/character/verify", character.VerifyCharacter).Methods("POST")
	router.HandleFunc("/gearset/{characterId}", gearset.AddGearSet).Methods("POST")
	router.HandleFunc("/gearset/{characterId}/{id}", gearset.UpdateGearSet).Methods("PATCH")
	router.HandleFunc("/gearset/{characterId}/{id}", gearset.DeleteGearSet).Methods("DELETE")
	router.HandleFunc("/gearset/{characterId}", gearset.GetGearSets).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "web.postman.co"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"},
	})

	log.Fatal(http.ListenAndServe(":8080", c.Handler(router)))
}
