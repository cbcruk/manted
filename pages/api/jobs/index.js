async function jobs(_req, res) {
  const response = await fetch(
    `https://script.google.com/macros/s/${process.env.SPREADSHEET_ID}/exec?type=json`
  )
  const data = await response.json()

  res.json(data)
}

export default jobs
