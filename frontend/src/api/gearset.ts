import axios from 'axios'
import { GearPiece, GearSet, Jobs, Slot } from '../utils/types'

const apiUrl = import.meta.env.VITE_SERVER_URL

const baseUrl = `${apiUrl}/gearset`

export type GearSetRequest = {
  user_id: string
  name: string
  job: Jobs
  items: Record<Slot, GearPiece>
  index: number
}

async function getGearsets(characterId: string) {
  const res = await axios.get(`${baseUrl}/${characterId}`)
  if (res.status !== 200) {
    throw new Error('Not Found')
  }
  if (res.data) {
    return res.data as Array<GearSet>
  } else {
    return [] as Array<GearSet>
  }
}

async function deleteGearSet(characterId: string, gearsetId: string) {
  const res = await axios.delete(`${baseUrl}/${characterId}/${gearsetId}`)
  if (res.status !== 202) {
    throw new Error('Not Deleted')
  }
}

async function createGearSet(characterId: string, gearSet: GearSetRequest) {
  debugger
  const res = await axios.post(`${apiUrl}/gearset/${characterId}`, gearSet)
  if (res.status !== 201) {
    throw new Error('Not Created')
  }
  if (!res.data.id) {
    throw new Error('Id missing')
  }
  return {
    id: res.data.id as string,
  }
}

async function updateGearSet(
  characterId: string,
  gearSetId: string,
  gearSet: GearSetRequest,
) {
  await axios.patch(`${baseUrl}/${characterId}/${gearSetId}`, gearSet)
}

async function bulkUpdateGearSets(
  characterId: string,
  gearSets: Array<GearSetRequest & {id: string}>
){
  await axios.patch(`${baseUrl}/${characterId}`, gearSets)
}

export const gearsets = {
  getGearsets,
  deleteGearSet,
  createGearSet,
  updateGearSet,
  bulkUpdateGearSets
}
