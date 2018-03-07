const google = require('googleapis')
const difference = require('lodash.difference')
const service = google.admin('directory_v1')
const { normalizeEmail } = require('validator')

const getNewEmails = ({ jwtClient, groupEmail, emails }, cb) => {
  let existingEmails = []

  const getExistingEmails = nextPageToken => {
    service.members.list({
      groupKey: groupEmail,
      auth: jwtClient,
      pageToken: nextPageToken
    }, (err, data) => {
      if (err) {
        cb(err)
      } else {
        const { members, nextPageToken } = data
        existingEmails = existingEmails.concat(members.map(m => normalizeEmail(m.email)))
        if (nextPageToken) {
          getExistingEmails(nextPageToken)
        } else {
          const newEmails = difference(emails, existingEmails)
          cb(null, newEmails)
        }
      }
    })
  }

  getExistingEmails()
}

module.exports = getNewEmails
