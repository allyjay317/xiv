import { createTypeMap } from './utils'

export const Dark = createTypeMap({
  bg1: 'black',
  bg2: '#2a2a2a',
  bg3: '',
  fg1: 'white',
  ui: '#1E1E1E',
})

export const Classic: typeof Dark = {
  bg1: '#234780',
  bg2: '#3266B8',
  bg3: '',
  fg1: '#E0D5BE',
  ui: '#1E1E40',
}

export const Light: typeof Dark = {
  bg1: '#F5F5F5',
  bg2: '#FFFFFF',
  bg3: '',
  fg1: '#000000',
  ui: '#FFFFFF',
}

export const Sepia: typeof Dark = {
  bg1: '#EFE6D4',
  bg2: '#F6F1E7',
  bg3: '',
  fg1: '#000000',
  ui: '#9A7939',
}

export const Color: typeof Dark = {
  ...Dark,
}
