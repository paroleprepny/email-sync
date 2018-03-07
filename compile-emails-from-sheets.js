const uniq = require('lodash.uniq')
const concat = require('async/concat')
const compact = require('lodash.compact')
const flatten = require('lodash.flatten')
const { normalizeEmail } = require('validator')
const { DONORS_SHEET_ID, VOLUNTEERS_SHEET_ID, GOOGLE_FORM_SHEET_ID } = process.env

const compileEmailsFromSheets = (sheets, done) => {
  concat([DONORS_SHEET_ID, VOLUNTEERS_SHEET_ID, GOOGLE_FORM_SHEET_ID], (sheetId, next) => {
    const sheet = sheets.find(s => s.id === sheetId)
    getEmailsFromSheet(sheet, (err, emails) => {
      if (err) return next(err)
      next(null, emails)
    })
  }, (err, allEmails) => {
    if (err) return done(err)
    done(null, uniq(allEmails))
  })
}

function getEmailsFromSheet (sheet, cb) {
  sheet.getRows((err, rows) => {
    if (err) {
      cb(err)
    } else {
      const sanitizedEmails = compact(flatten(rows.map(r => extractEmails(r.email))))
      const uniqEmails = uniq(sanitizedEmails)
      const normalizedEmails = uniqEmails.map(e => normalizeEmail(e))
      cb(null, normalizedEmails)
    }
  })
}

function extractEmails (text) {
  if (text) {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
  }
}

module.exports = compileEmailsFromSheets
