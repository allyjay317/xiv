import { Jobs, Slot, UpgradeItem } from './types'

export const SIDEBAR_WIDTH = 300
export const HEADER_HEIGHT = 100

export const FLOOR_1 = [
  Slot.BRACELET,
  Slot.EARRINGS,
  Slot.RING1,
  Slot.RING2,
  Slot.NECKLACE,
]

export const SLOT_INFO: Record<
  Slot | UpgradeItem,
  { floor: 1 | 2 | 3 | 4; tomeCost: number; bookCost: number }
> = {
  Body: {
    bookCost: 6,
    floor: 3,
    tomeCost: 825,
  },
  Bracelet: {
    bookCost: 3,
    floor: 1,
    tomeCost: 375,
  },
  Brine: {
    bookCost: 4,
    floor: 3,
    tomeCost: 0,
  },
  Earrings: {
    bookCost: 3,
    floor: 1,
    tomeCost: 375,
  },
  Feet: {
    bookCost: 4,
    floor: 2,
    tomeCost: 495,
  },
  Hands: {
    bookCost: 4,
    floor: 2,
    tomeCost: 495,
  },
  Head: {
    bookCost: 4,
    floor: 2,
    tomeCost: 495,
  },
  Legs: {
    bookCost: 6,
    floor: 3,
    tomeCost: 825,
  },
  Necklace: {
    bookCost: 3,
    floor: 1,
    tomeCost: 375,
  },
  Ring1: {
    bookCost: 3,
    floor: 1,
    tomeCost: 375,
  },
  Ring2: {
    bookCost: 3,
    floor: 1,
    tomeCost: 375,
  },
  Shine: {
    bookCost: 3,
    floor: 2,
    tomeCost: 0,
  },
  Twine: {
    bookCost: 4,
    floor: 3,
    tomeCost: 0,
  },
  Weapon: {
    bookCost: 8,
    floor: 4,
    tomeCost: 500,
  },
}

export const JobInfo: Record<Jobs, { name?: string; icon?: string }> = {
  AST: {
    icon: '/img/job_images/Astrologian.png',
    name: 'Astrologian',
  },
  BLM: {
    icon: '/img/job_images/BlackMage.png',
    name: 'Black Mage',
  },
  BLU: {
    icon: '/img/job_images/BlueMage.png',
    name: 'Blue Mage',
  },
  BRD: {
    icon: '/img/job_images/Bard.png',
    name: 'Bard',
  },
  DNC: {
    icon: '/img/job_images/Dancer.png',
    name: 'Dancer',
  },
  DRG: {
    icon: '/img/job_images/Dragoon.png',
    name: 'Dragoon',
  },
  DRK: {
    icon: '/img/job_images/DarkKnight.png',
    name: 'Dark Knight',
  },
  GMG: {
    icon: '/img/job_images/GreenMage.png',
    name: 'Green Mage',
  },
  GNB: {
    icon: '/img/job_images/Gunbreaker.png',
    name: 'Gunbreaker',
  },
  MCH: {
    icon: '/img/job_images/Machinist.png',
    name: 'Machinist',
  },
  MNK: {
    icon: '/img/job_images/Monk.png',
    name: 'Monk',
  },
  NIN: {
    icon: '/img/job_images/Ninja.png',
    name: 'Ninja',
  },
  PLD: {
    icon: '/img/job_images/Paladin.png',
    name: 'Paladin',
  },
  RDM: {
    icon: '/img/job_images/RedMage.png',
    name: 'Red Mage',
  },
  RPR: {
    icon: '/img/job_images/Reaper.png',
    name: 'Reaper',
  },
  SAM: {
    icon: '/img/job_images/Samurai.png',
    name: 'Samurai',
  },
  SCH: {
    icon: '/img/job_images/Scholar.png',
    name: 'Scholar',
  },
  SGE: {
    icon: '/img/job_images/Sage.png',
    name: 'Sage',
  },
  SMN: {
    icon: '/img/job_images/Summoner.png',
    name: 'Summoner',
  },
  VPR: {
    icon: '/img/job_images/Viper.png',
    name: 'Viper',
  },
  WAR: {
    icon: '/img/job_images/Warrior.png',
    name: 'Warrior',
  },
  WHM: {
    icon: '/img/job_images/WhiteMage.png',
    name: 'White Mage',
  },
}

export const baseStats = {
  [Slot.EARRINGS]: {
    raid: 0,
    tomestone: 0,
  },
  [Slot.NECKLACE]: {
    raid: 0,
    tomestone: 0,
  },
  [Slot.RING1]: {
    raid: 0,
    tomestone: 0,
  },
  [Slot.BRACELET]: {
    raid: 0,
    tomestone: 0,
  },
  [Slot.HEAD]: {
    raid: 0,
    tomestone: 0,
  },
  [Slot.HANDS]: {
    raid: 0,
    tomestone: 0,
  },
  [Slot.FEET]: {
    raid: 0,
    tomestone: 0,
  },
  [Slot.WEAPON]: {
    raid: 0,
    tomestone: 0,
  },
  [Slot.BODY]: {
    raid: 0,
    tomestone: 0,
  },
  [Slot.LEGS]: {
    raid: 0,
    tomestone: 0,
  },
  [UpgradeItem.SHINE]: {
    raid: 0,
    tomestone: 0,
  },
  [UpgradeItem.BRINE]: {
    raid: 0,
    tomestone: 0,
  },
  [UpgradeItem.TWINE]: {
    raid: 0,
    tomestone: 0,
  },
}
