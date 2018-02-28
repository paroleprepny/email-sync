const google = require('googleapis')
const difference = require('lodash.difference')
const service = google.admin('directory_v1')

const getNewEmails = ({ jwtClient, groupEmail, emails }, cb) => {
  service.members.list({
    groupKey: groupEmail,
    auth: jwtClient
  }, (err, data) => {
    if (err) {
      cb(err)
    } else {
      const existingEmails = data.members.map(m => m.email)
      const newEmails = difference(emails, existingEmails)
      cb(null, newEmails)
    }
  })
}

module.exports = getNewEmails
