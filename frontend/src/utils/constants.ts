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
import pct from '../assets/img/job_images/Pictomancer.png'
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
import { ffIcons } from '../Components/GearSet/util'

export enum API_REQUEST_RESULT {
  SUCCESS = 'Success',
  FAILURE = 'Failure',
  ALREADY_EXISTS = 'Already Exists',
  NOT_LOGGED_IN = 'Not Logged In',
}

export const FLOOR_1 = [
  Slot.BRACELET,
  Slot.EARRINGS,
  Slot.RING1,
  Slot.RING2,
  Slot.NECKLACE,
]

export const SLOT_INFO: Record<
  Partial<Slot | UpgradeItem>,
  { floor: 1 | 2 | 3 | 4; tomeCost: number; bookCost: number; name: string, icon: string }
> = {
  [Slot.BODY]: {
    name: 'Body',
    bookCost: 6,
    floor: 3,
    tomeCost: 825,
    icon: ffIcons.body
  },
  [Slot.BRACELET]: {
    name: 'Bracelet',
    bookCost: 3,
    floor: 1,
    tomeCost: 375,
    icon: ffIcons.wrist
  },
  Brine: {
    name: 'Brine',
    bookCost: 4,
    floor: 3,
    tomeCost: 0,
    icon: ''
  },
  [Slot.EARRINGS]: {
    name: 'Earrings',
    bookCost: 3,
    floor: 1,
    tomeCost: 375,
    icon: ffIcons.earring
  },
  [Slot.FEET]: {
    name: 'Feet',
    bookCost: 4,
    floor: 2,
    tomeCost: 495,
    icon: ffIcons.feet
  },
  [Slot.HANDS]: {
    name: 'Hands',
    bookCost: 4,
    floor: 2,
    tomeCost: 495,
    icon: ffIcons.hand
  },
  [Slot.HEAD]: {
    name: 'Head',
    bookCost: 4,
    floor: 2,
    tomeCost: 495,
    icon: ffIcons.head
  },
  [Slot.LEGS]: {
    name: 'Legs',
    bookCost: 6,
    floor: 3,
    tomeCost: 825,
    icon: ffIcons.legs
  },
  [Slot.NECKLACE]: {
    name: 'Necklace',
    bookCost: 3,
    floor: 1,
    tomeCost: 375,
    icon: ffIcons.necklace
  },
  [Slot.RING1]: {
    name: 'Ring',
    bookCost: 3,
    floor: 1,
    tomeCost: 375,
    icon: ffIcons.ring
  },
  [Slot.RING2]: {
    name: 'Ring',
    bookCost: 3,
    floor: 1,
    tomeCost: 375,
    icon: ffIcons.ring
  },
  Shine: {
    name: 'Shine',
    bookCost: 3,
    floor: 2,
    tomeCost: 0,
    icon: ''
  },
  Twine: {
    name: 'Twine',
    bookCost: 4,
    floor: 3,
    tomeCost: 0,
    icon: ''
  },
  [Slot.WEAPON]: {
    name: 'Weapon',
    bookCost: 8,
    floor: 4,
    tomeCost: 500,
    icon: ''
  },
}

export enum Role {
  TANK,
  HEALER,
  STRIKING,
  MAIMING,
  SCOUTING,
  RANGED,
  CASTER,
  LIMITED
}

export const JobInfo: Record<Jobs, { name?: string; icon?: string, role: Role }> = {
  [Jobs.AST]: {
    icon: ast,
    name: 'Astrologian',
    role: Role.HEALER
  },
  [Jobs.BLM]: {
    icon: blm,
    name: 'Black Mage',
    role: Role.CASTER
  },
  [Jobs.BLU]: {
    icon: blu,
    name: 'Blue Mage',
    role: Role.LIMITED
  },
  [Jobs.BRD]: {
    icon: brd,
    name: 'Bard',
    role: Role.RANGED
  },
  [Jobs.DNC]: {
    icon: dnc,
    name: 'Dancer',
    role: Role.RANGED
  },
  [Jobs.DRG]: {
    icon: drg,
    name: 'Dragoon',
    role: Role.MAIMING
  },
  [Jobs.DRK]: {
    icon: drk,
    name: 'Dark Knight',
    role: Role.TANK
  },
  [Jobs.PCT]: {
    icon: pct,
    name: 'Pictomancer',
    role: Role.CASTER
  },
  [Jobs.GNB]: {
    icon: gnb,
    name: 'Gunbreaker',
    role: Role.TANK
  },
  [Jobs.MCH]: {
    icon: mch,
    name: 'Machinist',
    role: Role.RANGED
  },
  [Jobs.MNK]: {
    icon: mnk,
    name: 'Monk',
    role: Role.STRIKING
  },
  [Jobs.NIN]: {
    icon: nin,
    name: 'Ninja',
    role: Role.SCOUTING
  },
  [Jobs.PLD]: {
    icon: pld,
    name: 'Paladin',
    role: Role.TANK
  },
  [Jobs.RDM]: {
    icon: rdm,
    name: 'Red Mage',
    role: Role.CASTER
  },
  [Jobs.RPR]: {
    icon: rpr,
    name: 'Reaper',
    role: Role.MAIMING
  },
  [Jobs.SAM]: {
    icon: sam,
    name: 'Samurai',
    role: Role.STRIKING
  },
  [Jobs.SCH]: {
    icon: sch,
    name: 'Scholar',
    role: Role.HEALER
  },
  [Jobs.SGE]: {
    icon: sge,
    name: 'Sage',
    role: Role.HEALER
  },
  [Jobs.SMN]: {
    icon: smn,
    name: 'Summoner',
    role: Role.CASTER
  },
  [Jobs.VPR]: {
    icon: vpr,
    name: 'Viper',
    role: Role.SCOUTING
  },
  [Jobs.WAR]: {
    icon: war,
    name: 'Warrior',
    role: Role.TANK
  },
  [Jobs.WHM]: {
    icon: whm,
    name: 'White Mage',
    role: Role.HEALER
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

export const PIECE_SIZE = '30px'
