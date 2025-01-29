export enum Slot {
  HEAD,
  BODY,
  HANDS,
  LEGS,
  FEET,
  EARRINGS,
  NECKLACE,
  BRACELET,
  RING1,
  RING2,
  WEAPON,
}

export enum UpgradeItem {
  SHINE = 'Shine',
  BRINE = 'Brine',
  TWINE = 'Twine',
}

export enum GearSource {
  RAID = 0,
  CRAFTED = 1,
  TOME = 2,
  CHAOTIC = 3,
  ULTIMATE = 4
}

export type GearPiece = {
  source: GearSource
  have: boolean
  augmented: boolean
}

export type GearSet = {
  id: string
  name: string
  job: Jobs
  items: Record<Slot, GearPiece>
  modified: boolean
}

export enum DataCenter {
  CRYSTAL = 'Crystal',
  AETHER = 'Aether',
  PRIMAL = 'Primal',
  CHAOS = 'Chaos',
  LIGHT = 'Light',
  ELEMENTAL = 'Elemental',
  GAIA = 'Gaia',
  MANA = 'Mana',
}

export enum Server {
  MATEUS = 'Mateus',
  GILGAMESH = 'Gilgamesh',
  EXCALIBUR = 'Excalibur',
  HYPERION = 'Hyperion',
  SARGATANAS = 'Sargatanas',
  ADAMANTOISE = 'Adamantoise',
  CACTUAR = 'Cactuar',
  FAERIE = 'Faerie',
  BRYNHILDR = 'Brynhildr',
  DIABOLOS = 'Diabolos',
  MALBORO = 'Malboro',
  ULTROS = 'Ultros',
  BEHEMOTH = 'Behemoth',
  COEURL = 'Coeurl',
  GOBLIN = 'Goblin',
  JENOVA = 'Jenova',
  MIDGARDSORMR = 'Midgardsormr',
  ZALERA = 'Zalera',
  BALMUNG = 'Balmung',
  EXODUS = 'Exodus',
  LAMIA = 'Lamia',
  LEVIATHAN = 'Leviathan',
  MARLBORO = 'Marlboro',
}

export enum Gender {
  MALE = 1,
  FEMALE = 2,
}

export enum Jobs {
  WHM,
  SCH,
  AST,
  SGE,
  PLD,
  WAR,
  DRK,
  GNB,
  MNK,
  DRG,
  NIN,
  SAM,
  RPR,
  BRD,
  MCH,
  DNC,
  RDM,
  BLM,
  SMN,
  BLU,
  VPR,
  PCT,
}

export enum Language {
  DE = 'de',
  EN = 'en',
  FR = 'fr',
  JA = 'ja',
}
