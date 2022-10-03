import { getFile, writeFile } from '@cbcruk/next-utils'
import { groupBy } from 'lodash'
import { THEME_KEYS } from '../../../constants'

async function setAddress(list) {
  const address = []

  for (const item of list) {
    const response = await fetch(`${process.env.API_URL}/v4/jobs/${item.id}`)
    const data = await response.json()

    address.push({
      id: data.job.company.id,
      lat: data.job.address.geo_location.n_location.lat,
      lng: data.job.address.geo_location.n_location.lng,
      name: data.job.company.name,
      logo_img_thumb: data.job.logo_img.thumb,
    })
  }

  return address
}

async function markers(_req, res) {
  for (const file of THEME_KEYS) {
    const data = await getFile({ fileName: `/jobs/${file}` })
    const companyGroup = groupBy(JSON.parse(data).data, 'company_id')
    const companyIds = Object.keys(companyGroup)
    const companyList = companyIds.map((id) => companyGroup[id][0])
    const companyListWithGeolocation = await setAddress(companyList)

    await writeFile({
      fileName: `/markers/${file}`,
      data: JSON.stringify(companyListWithGeolocation),
    })
  }

  return res.status(200).end()
}

export default markers
