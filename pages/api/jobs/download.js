import { writeFile } from '@cbcruk/next-utils'
import { THEME_KEYS } from '../../../constants'

async function download(_req, res) {
  for (const key of THEME_KEYS) {
    const response = await fetch(
      `${process.env.API_URL}/v3/themes/${key}/jobs?limit=999`
    )
    const data = await response.json()

    await writeFile({
      fileName: `/jobs/${key}`,
      data: JSON.stringify(data),
    })
  }

  res.status(200).end()
}

export default download
