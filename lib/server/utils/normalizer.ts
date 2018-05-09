type NormalizableArray<T> = ReadonlyArray<
  T & {
    id: number
  }
>

export interface NormalizedCollection<T> {
  byId: { [id: number]: T }
  allIds: ReadonlyArray<number>
}

export function normalizeCollection<T>(
  collection: NormalizableArray<T>
): NormalizedCollection<T> {
  return {
    byId: collection.reduce((prev, cur) => ({ ...prev, [cur.id]: cur }), {}),
    allIds: collection.map(x => x.id),
  }
}
