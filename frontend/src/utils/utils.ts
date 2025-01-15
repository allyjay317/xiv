

type StringMap<IDS extends string> = {
  [ID in IDS]: string
}

export function createTypeMap<T extends string>(map: StringMap<T>) {
  return map
}

