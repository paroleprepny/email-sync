if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }
const { GoogleSpreadsheet } = require('google-spreadsheet')
const { SPREADSHEET_KEY, GOOGLE_CREDENTIALS } = process.env

const getWorksheets = async () => {
  const creds = JSON.parse(GOOGLE_CREDENTIALS)
  const doc = new GoogleSpreadsheet(SPREADSHEET_KEY)
  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo()
  return doc.sheetsByIndex
}

module.exports = getWorksheets
