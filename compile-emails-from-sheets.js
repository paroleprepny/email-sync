const uniq = require('lodash.uniq')
const concat = require('async/concat')
const compact = require('lodash.compact')
const flatten = require('lodash.flatten')
const { normalizeEmail } = require('validator')
const { DONORS_SHEET_ID, VOLUNTEERS_SHEET_ID, SUPPORTERS_FORM_SHEET_ID, RELEASED_APPLICANTS_SHEET_ID, INTERESTED_VOLUNTEERS_FORM_ID, VOLUNTEER_APPLICATION_FORM_SHEET_ID } = process.env

const compileEmailsFromSheets = (sheets, done) => {
  const sheetIds = [
    DONORS_SHEET_ID,
    VOLUNTEERS_SHEET_ID,
    SUPPORTERS_FORM_SHEET_ID,
    RELEASED_APPLICANTS_SHEET_ID,
    INTERESTED_VOLUNTEERS_FORM_ID,
    VOLUNTEER_APPLICATION_FORM_SHEET_ID
  ]
  concat(sheetIds, (sheetId, next) => {
    const sheet = sheets.find(s => s.sheetId.toString() === sheetId)
    getEmailsFromSheet(sheet).then(emails => {
      next(null, emails)
    }).catch(err => {
      next(err)
    })
  }, (err, allEmails) => {
    if (err) return done(err)
    done(null, uniq(allEmails))
  })
}

async function getEmailsFromSheet (sheet) {
  const rows = await sheet.getRows()
  const sanitizedEmails = compact(flatten(rows.map(r => extractEmails(
    r._rawData.join(', ')
  ))))
  const uniqEmails = uniq(sanitizedEmails)
  const normalizedEmails = uniqEmails.map(e => normalizeEmail(e))
  return normalizedEmails
}

function extractEmails (text) {
  if (text) {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
  }
}

module.exports = compileEmailsFromSheets
