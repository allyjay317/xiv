import { createTypeMap } from './utils'

export const Dark = createTypeMap({
  bg1: '#0A0A0A',
  bg2: '#1f1f1f',
  bg3: '#333333',
  fg1: '#EEEEEE',
  fg2: '#c2c2c2',
  fg3: '#999999',
  ui: '#1E1E1E',
  accent: '#983628',
  accent2: '#913527',
})

type TColor = typeof Dark

export const Classic: TColor = {
  bg1: '#234780',
  bg2: '#2C58A0',
  bg3: '#356AC0',
  fg1: '#e0d5be',
  fg2: '#d7a85b',
  fg3: '#A37327',
  ui: '#1E1E40',
  accent: '#A73027',
  accent2: '#952A23',
}

export const Light: TColor = {
  bg1: '#8B98BB',
  bg2: '#7E8CB4',
  bg3: '#7180AC',
  fg1: '#0D1F2D',
  fg2: '#122C3F',
  fg3: '#17374F',
  ui: '#CCCCCC',
  accent: '#C57B57',
  accent2: '#C17149',
}

export const Sepia: TColor = {
  bg1: '#E3D3B5',
  bg2: '#D8C197',
  bg3: '#CDB07A',
  fg1: '#4B2206',
  fg2: '#713309',
  fg3: '#97440C',
  ui: '#C8A96A',
  accent: '#D05D11',
  accent2: '#BD550F',
}

const hexToDec = (color: string) => {
  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)
  return [r, g, b]
}

const decToHex = (v: number) => {
  let val = Math.max(Math.min(v, 255), 0)

  const str = val.toString(16)
  if (str.length === 1) return `0${str}`
  return str
}

export const Color: TColor & {
  rgba: (color: string, alpha: number) => string
  darken: (color: string, mult: number) => string
  lighten: (color: string, mult: number) => string
} = {
  ...Classic,
  rgba: (color: string, alpha: number) => {
    if (color.length < 7) {
      return color
    }
    const [r, g, b] = hexToDec(color)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  },
  darken: (color: string, mult: number = 1) => {
    const x = mult * 10
    const [r, g, b] = hexToDec(color)
    return `#${decToHex(r - x)}${decToHex(g - x)}${decToHex(b - x)}`
  },
  lighten: (color: string, mult: number = 1) => {
    const x = mult * 10
    const [r, g, b] = hexToDec(color)
    return `#${decToHex(r + x)}${decToHex(g + x)}${decToHex(b + x)}`
  },
}
