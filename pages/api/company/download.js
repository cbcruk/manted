import { getFile, writeFile } from '@cbcruk/next-utils'
import { groupBy } from 'lodash'
import { THEME_KEYS } from '../../../constants'

async function download(_req, res) {
  const { categories } = JSON.parse(await getFile({ fileName: `/tags/data` }))

  for (const file of THEME_KEYS) {
    const data = await getFile({ fileName: `/jobs/${file}` })
    const companyGroup = groupBy(JSON.parse(data).data, 'company_id')
    const companyIds = Object.keys(companyGroup)

    for (const id of companyIds) {
      const companyData = companyGroup[id].map((job) => {
        return {
          ...job,
          category_tags: job.category_tags.map((categoryTag) => {
            const parent = categories.find(
              (item) => item.id === categoryTag.parent_id
            )
            const child = parent.tags.find((tag) => tag.id === categoryTag.id)

            return {
              ...categoryTag,
              parentLabel: parent.title,
              label: child.title,
            }
          }),
        }
      })

      await writeFile({
        fileName: `/jobs/[byCompanyId]/${id}`,
        data: JSON.stringify(companyData),
      })
    }
  }

  return res.status(200).end()
}

export default download
