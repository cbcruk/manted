import fetch from 'node-fetch'

export const handler = async (req, res, next) => {
  if (req.path === '/api/jobs') {
    const response = await fetch(
      `https://script.google.com/macros/s/${
        import.meta.env.VITE_SPREADSHEET_ID
      }/exec?type=json`
    )
    const data = await response.text()

    return res.end(data)
  }

  next()
}
