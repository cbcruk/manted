import { atom } from 'jotai'

export const fetchJobsAtom = atom(async () => {
  const response = await fetch('/api/jobs')
  const data = await response.json()

  return data
})
