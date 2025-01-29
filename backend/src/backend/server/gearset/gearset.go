package gearset

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
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

type Items map[int]interface{}

func (i *Items) Scan(val interface{}) error {
	switch v := val.(type) {
	case []byte:
		json.Unmarshal(v, &i)
		return nil
	case string:
		json.Unmarshal([]byte(v), &i)
		return nil
	default:
		return fmt.Errorf("unsupported type %T", v)
	}
}

func (i *Items) Value() (driver.Value, error) {
	return json.Marshal(i)
}

type GearSet struct {
	ID    string `json:"id" db:"id"`
	Name  string `json:"name" db:"name"`
	Job   Job    `json:"job" db:"job"`
	Items Items  `json:"items" db:"config"`
}

type GearSetRequest struct {
	UserId string `json:"id" db:"user_id"`
	Name   string `json:"name" db:"name"`
	Job    Job    `json:"job" db:"job"`
	Items  map[int]struct {
		Augmented bool   `json:"augmented"`
		Have      bool   `json:"have"`
		Source    Source `json:"source"`
	} `json:"items" db:"config"`
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
	characterId := mux.Vars(r)["characterId"]
	var Sets []GearSet

	db, err := database.GetDb(w)
	if err != nil {
		return
	}

	err = db.Select(&Sets, `SELECT id, name, job, config from gear_sets WHERE character_id = $1`, characterId)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(Sets)
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
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(err)
		return
	}

	_, err = db.Exec(`UPDATE gear_sets SET name = $1, job = $2, config = $3 WHERE id = $4`,
		req.Name,
		req.Job,
		items,
		id)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("could not update"))
		return
	}
}

func DeleteGearSet(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	db, err := database.GetDb(w)
	if err != nil {
		return
	}

	_, err = db.Exec(`DELETE FROM gear_sets WHERE id = $1`, id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusAccepted)
}
