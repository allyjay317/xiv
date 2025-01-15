module github.com/alyjay/xiv

go 1.23.4

require (
	github.com/alyjay/xivdb v0.0.0-00010101000000-000000000000
	github.com/google/uuid v1.6.0
	github.com/gorilla/mux v1.8.1
	github.com/joho/godotenv v1.5.1
	github.com/lib/pq v1.10.9
)

require (
	github.com/jmoiron/sqlx v1.4.0 // indirect
	github.com/ravener/discord-oauth2 v0.0.0-20230514095040-ae65713199b3 // indirect
	github.com/rs/cors v1.11.1 // indirect
	golang.org/x/oauth2 v0.25.0 // indirect
)

replace github.com/alyjay/xivdb => ../database
