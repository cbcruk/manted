import { getFile } from '@cbcruk/next-utils'
import { THEME_KEYS } from '../../../constants'

export async function handler() {
  const files = await Promise.all(
    THEME_KEYS.map((key) => getFile({ fileName: `/markers/${key}` }))
  )
  const data = files.map((file) => JSON.parse(file)).flatMap((a) => a)

  return data
}
