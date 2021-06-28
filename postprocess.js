const WANTED_URL = 'https://www.wanted.co.kr'

async function getList(next, items = []) {
  try {
    const response = await fetch(next)
    const { data, links } = await response.json()
    const mergeditems = items.concat(data)

    if (links.next) {
      return getList(`${WANTED_URL}${links.next}`, mergeditems)
    }

    return mergeditems
  } catch (e) {
    console.error(e)
  }
}

async function getDetail(ids) {
  const data = await ids.reduce(async (prev, curr) => {
    const prevValue = await prev

    try {
      const response = await fetch(`${WANTED_URL}/api/v4/jobs/${curr}`)
      const data = await response.json()
      const {
        job: {
          id,
          company: {
            id: company_id,
            name,
            industry_name,
            application_response_stats: { avg_day, avg_rate },
          },
          position,
          address,
          logo_img: { thumb: logo_img_thumb },
          title_img: { thumb: title_img_thumb },
          like_count,
          detail: { main_tasks, requirements },
        },
      } = data
      const location = address?.location ?? ''
      const { lat, lng } = address?.geo_location?.location ?? {
        lat: 0,
        lng: 0,
      }

      return prevValue.concat({
        id,
        company_id,
        name,
        industry_name,
        position,
        location,
        logo_img_thumb,
        title_img_thumb,
        avg_day,
        avg_rate,
        like_count,
        lat,
        lng,
        main_tasks,
        requirements,
      })
    } catch (error) {
      console.error(error)
      return prevValue
    }
  }, Promise.resolve([]))

  return data
}

async function main() {
  console.time('getList')
  const list = await getList(
    `${WANTED_URL}/api/v4/jobs?country=kr&tag_type_id=669&job_sort=job.latest_order&locations=all&years=-1&limit=20&offset=0`
  )
  const ids = list.map((job) => job.id)
  console.timeEnd('getList')

  console.time('getDetail')
  const jobs = await getDetail(ids)
  const jobsLite = jobs.map((job) => {
    const { id, company_id, logo_img_thumb, name, position, lat, lng } = job
    const label = `${name} - ${position}`

    return {
      id,
      company_id,
      logo_img_thumb,
      label,
      lat,
      lng,
    }
  })
  console.timeEnd('getDetail')

  await Deno.writeTextFile('./raw_data/data.json', JSON.stringify(jobs))
  await Deno.writeTextFile(
    './raw_data/data.lite.json',
    JSON.stringify(jobsLite)
  )
}
main()
