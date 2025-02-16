import { Size } from '../../utils/types'

export function getSize(size: Size) {
  if (size === 'XS') return 12
  if (size === 'S') return 16
  if (size === 'M') return 24
  if (size === 'L') return 32
  if (size === 'XL') return 50
  return 12
}
