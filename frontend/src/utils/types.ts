export enum Slot {
  HEAD = 'Head',
  BODY = 'Body',
  HANDS = 'Hands',
  LEGS = 'Legs',
  FEET = 'Feet',
  EARRINGS = 'Earrings',
  NECKLACE = 'Necklace',
  BRACELET = 'Bracelet',
  RING1 = 'Ring1',
  RING2 = 'Ring2',
  WEAPON = 'Weapon',
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
  items: { [key in Slot]: GearPiece }
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
  WHM = 'WHM',
  SCH = 'SCH',
  AST = 'AST',
  SGE = 'SGE',
  PLD = 'PLD',
  WAR = 'WAR',
  DRK = 'DRK',
  GNB = 'GNB',
  MNK = 'MNK',
  DRG = 'DRG',
  NIN = 'NIN',
  SAM = 'SAM',
  RPR = 'RPR',
  BRD = 'BRD',
  MCH = 'MCH',
  DNC = 'DNC',
  RDM = 'RDM',
  BLM = 'BLM',
  SMN = 'SMN',
  BLU = 'BLU',
  VPR = 'VPR',
  PCT = 'PCT',
}

export enum Language {
  DE = 'de',
  EN = 'en',
  FR = 'fr',
  JA = 'ja',
}
