async function jobs(_req, res) {
  const response = await fetch(
    'https://raw.githubusercontent.com/cbcruk/manted/main/raw_data/data.json'
  )
  const data = await response.json()

  res.json(data)
}

export default jobs
