const uniq = require('lodash.uniq')
const { DONORS_SHEET_ID, VOLUNTEERS_SHEET_ID } = process.env

const compileEmailsFromSheets = (sheets, cb) => {
  const donorsSheet = sheets.find(s => s.id === DONORS_SHEET_ID)
  const volunteersSheet = sheets.find(s => s.id === VOLUNTEERS_SHEET_ID)

  getEmailsFromSheet(donorsSheet, (err, donorEmails) => {
    if (err) return cb(err)
    getEmailsFromSheet(volunteersSheet, (err, volunteerEmails) => {
      if (err) return cb(err)
      cb(null, {
        all: uniq(donorEmails.concat(volunteerEmails)),
        volunteers: volunteerEmails
      })
    })
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
