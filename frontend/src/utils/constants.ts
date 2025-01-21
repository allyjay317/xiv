import { Jobs, Slot, UpgradeItem } from './types'

export const SIDEBAR_WIDTH = 300
export const HEADER_HEIGHT = 100

import ast from '../assets/img/job_images/Astrologian.png'
import brd from '../assets/img/job_images/Bard.png'
import blm from '../assets/img/job_images/BlackMage.png'
import blu from '../assets/img/job_images/BlueMage.png'
import dnc from '../assets/img/job_images/Dancer.png'
import drk from '../assets/img/job_images/DarkKnight.png'
import drg from '../assets/img/job_images/Dragoon.png'
import pct from '../assets/img/job_images/GreenMage.png'
import gnb from '../assets/img/job_images/Gunbreaker.png'
import mch from '../assets/img/job_images/Machinist.png'
import mnk from '../assets/img/job_images/Monk.png'
import nin from '../assets/img/job_images/Ninja.png'
import pld from '../assets/img/job_images/Paladin.png'
import rpr from '../assets/img/job_images/Reaper.png'
import rdm from '../assets/img/job_images/RedMage.png'
import sge from '../assets/img/job_images/Sage.png'
import sam from '../assets/img/job_images/Samurai.png'
import sch from '../assets/img/job_images/Scholar.png'
import smn from '../assets/img/job_images/Summoner.png'
import vpr from '../assets/img/job_images/Viper.png'
import war from '../assets/img/job_images/Warrior.png'
import whm from '../assets/img/job_images/WhiteMage.png'

export enum API_REQUEST_RESULT {
  SUCCESS = "Success",
  FAILURE = "Failure",
  ALREADY_EXISTS = "Already Exists"
}

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
    icon: ast,
    name: 'Astrologian',
  },
  BLM: {
    icon: blm,
    name: 'Black Mage',
  },
  BLU: {
    icon: blu,
    name: 'Blue Mage',
  },
  BRD: {
    icon: brd,
    name: 'Bard',
  },
  DNC: {
    icon: dnc,
    name: 'Dancer',
  },
  DRG: {
    icon: drg,
    name: 'Dragoon',
  },
  DRK: {
    icon: drk,
    name: 'Dark Knight',
  },
  PCT: {
    icon: pct,
    name: 'Pictomancer',
  },
  GNB: {
    icon: gnb,
    name: 'Gunbreaker',
  },
  MCH: {
    icon: mch,
    name: 'Machinist',
  },
  MNK: {
    icon: mnk,
    name: 'Monk',
  },
  NIN: {
    icon: nin,
    name: 'Ninja',
  },
  PLD: {
    icon: pld,
    name: 'Paladin',
  },
  RDM: {
    icon: rdm,
    name: 'Red Mage',
  },
  RPR: {
    icon: rpr,
    name: 'Reaper',
  },
  SAM: {
    icon: sam,
    name: 'Samurai',
  },
  SCH: {
    icon: sch,
    name: 'Scholar',
  },
  SGE: {
    icon: sge,
    name: 'Sage',
  },
  SMN: {
    icon: smn,
    name: 'Summoner',
  },
  VPR: {
    icon: vpr,
    name: 'Viper',
  },
  WAR: {
    icon: war,
    name: 'Warrior',
  },
  WHM: {
    icon: whm,
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
