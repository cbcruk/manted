import { atom } from 'jotai'

export const markerAtom = atom({
  selected: null,
  expanded: [],
})

export const handleMarkerAtom = atom(
  (get) => get(markerAtom),
  (get, set, arg) =>
    set(markerAtom, {
      ...get(markerAtom),
      ...arg,
    })
)
