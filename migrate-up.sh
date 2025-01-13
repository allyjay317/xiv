#!/bin/sh
echo $POSTGRESQL_URL
migrate -database postgres://Allison:!H8gwkr101190@localhost:5432/xiv?sslmode=disable -path backend/src/backend/database/migrations $1