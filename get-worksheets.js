if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }
const GoogleSpreadsheet = require('google-spreadsheet')
const { SPREADSHEET_KEY, GOOGLE_CREDENTIALS } = process.env

const creds = JSON.parse(GOOGLE_CREDENTIALS)
const doc = new GoogleSpreadsheet(SPREADSHEET_KEY)

const getWorksheets = cb => {
  doc.useServiceAccountAuth(creds, () => {
    doc.getInfo((err, info) => {
      if (err) {
        cb(err)
      } else {
        cb(null, info.worksheets)
      }
    })
  })
}

module.exports = getWorksheets
