package gearset

import (
	"encoding/json"
	"net/http"

	database "github.com/alyjay/xivdb"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

type Source int
type Job int
type Slot int

const (
	Raid Source = iota
	Crafted
	Tome
	Chaotic
	Ultimate
)

const (
	WHM Job = iota
	SCH
	AST
	SGE
	PLD
	WAR
	DRK
	GNB
	MNK
	DRG
	NIN
	SAM
	RPR
	BRD
	MCH
	DNC
	RDM
	BLM
	SMN
	BLU
	VPR
	PCT
)

const (
	HEAD Slot = iota
	BODY
	HANDS
	LEGS
	FEET
	EARRINGS
	NECKLACE
	BRACELET
	RING1
	RING2
	WEAPON
	OFFHAND
)

type GearPiece struct {
	Source    Source `json:"source"`
	Have      bool   `json:"have"`
	Augmented bool   `json:"augmented,omitempty"`
}

type GearSet struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Job   Job    `json:"job"`
	Items map[int]struct{}
}

type GearSetRequest struct {
	UserId string `json:"id"`
	Name   string `json:"name"`
	Job    Job    `json:"job"`
	Items  map[int]struct {
		Augmented bool   `json:"augmented"`
		Have      bool   `json:"have"`
		Source    Source `json:"source"`
	}
}

type AddGearSetResponse struct {
	ID string `json:"id"`
}

func AddGearSet(w http.ResponseWriter, r *http.Request) {
	var req GearSetRequest
	_ = json.NewDecoder(r.Body).Decode(&req)

	characterId := mux.Vars(r)["characterId"]

	db, err := database.GetDb(w)
	if err != nil {
		return
	}

	newUUID := uuid.NewString()

	items, err := json.Marshal(req.Items)

	_, err = db.Exec(`INSERT INTO gear_sets (id, user_id, character_id, name, job, config) VALUES ($1, $2, $3, $4, $5, $6)`, newUUID, req.UserId, characterId, req.Name, req.Job, items)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Error entering into database"))
	}

	var res AddGearSetResponse
	res.ID = newUUID

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(res)
}

func GetGearSets(w http.ResponseWriter, r *http.Request) {

}

func UpdateGearSet(w http.ResponseWriter, r *http.Request) {
	var req GearSetRequest
	_ = json.NewDecoder(r.Body).Decode(&req)

	id := mux.Vars(r)["id"]
	db, err := database.GetDb(w)
	if err != nil {
		return
	}

	items, err := json.Marshal(req.Items)

	_, err = db.Exec(`UPDATE gear_sets SET name = $1, job = $2, config = $3 WHERE id = $4`,
		req.Name,
		req.Job,
		items,
		id)
}

func DeleteGearSet(w http.ResponseWriter, r *http.Request) {

}
