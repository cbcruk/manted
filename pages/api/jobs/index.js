import path from 'path'
import { promises as fs } from 'fs'

async function jobs(req, res) {
  const id = req.query.companyId
  const dir = path.join(process.cwd(), '.cached/jobs/byCompanyId')
  const data = await fs.readFile(dir + `/${id}.json`)

  res.json(JSON.parse(data))
}

export default jobs
