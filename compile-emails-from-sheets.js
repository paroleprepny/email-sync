const uniq = require('lodash.uniq')
const parallel = require('async/parallel')
const { DONORS_SHEET_ID, VOLUNTEERS_SHEET_ID, GOOGLE_FORM_SHEET_ID } = process.env

const compileEmailsFromSheets = (sheets, cb) => {
  let all = []
  let volunteers = []

  const tasks = [DONORS_SHEET_ID, VOLUNTEERS_SHEET_ID, GOOGLE_FORM_SHEET_ID].map(sheetId => {
    return next => {
      const sheet = sheets.find(s => s.id === sheetId)
      getEmailsFromSheet(sheet, (err, emails) => {
        if (err) return next(err)
        if (sheetId === VOLUNTEERS_SHEET_ID) { volunteers = emails }
        all = all.concat(emails)
        next()
      })
    }
  })

  parallel(tasks, err => {
    if (err) return cb(err)
    cb(null, { all: uniq(all), volunteers })
  })
}

function getEmailsFromSheet (sheet, cb) {
  sheet.getRows((err, rows) => {
    if (err) {
      cb(err)
    } else {
      const uniqEmails = uniq(rows.map(r => r.email))
      cb(null, uniqEmails)
    }
  })
}

module.exports = compileEmailsFromSheets
