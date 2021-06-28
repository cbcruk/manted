async function getList(next, items = []) {
  try {
    const response = await fetch(next)
    const { data, links } = await response.json()
    const mergeditems = items.concat(data)

    console.log(`LIST: ${mergeditems.length}`)

    if (links.next) {
      return getList(`https://www.wanted.co.kr${links.next}`, mergeditems)
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
      const response = await fetch(
        `https://www.wanted.co.kr/api/v4/jobs/${curr}`
      )
      const data = await response.json()
      const {
        job: { address, company, position, logo_img },
      } = data
      const location = address?.geo_location?.location ?? {
        lat: 0,
        lng: 0,
      }
      const name = `${company.name} - ${position}`

      return prevValue.concat({
        id: curr,
        ...location,
        name,
        logo: logo_img.thumb,
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
    `https://www.wanted.co.kr/api/v4/jobs?country=kr&tag_type_id=669&job_sort=job.latest_order&locations=all&years=-1&limit=20&offset=0`
  )
  const ids = list.map((job) => job.id)
  console.timeEnd('getList')

  console.time('getDetail')
  const jobs = await getDetail(ids)
  console.timeEnd('getDetail')

  await Deno.writeTextFile('./raw_data/data.json', JSON.stringify(jobs))
}
main()
