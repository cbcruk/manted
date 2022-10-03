import { useAtom } from 'jotai'
import { markerAtom } from '../../atoms/marker'
import { useQuery } from '@tanstack/react-query'

export function useJobs() {
  const [{ selected }] = useAtom(markerAtom)
  const result = useQuery(
    ['/api/jobs', selected?.id],
    () => fetch(`/api/jobs?companyId=${selected.id}`).then((r) => r.json()),
    {
      enabled: Boolean(selected?.id),
    }
  )

  return result
}
