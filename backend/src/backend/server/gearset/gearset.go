package gearset

import "net/http"

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
	ID   string `json:"id"`
	Name string `json:"name"`
	Job Job `json:"job"`
	Items map[int]struct {}
}

func AddGearSet(w http.ResponseWriter, r *http.Request) {

}
