const google = require('googleapis')
const service = google.admin('directory_v1')
const groupBy = require('async/groupBy')

const addEmails = ({ jwtClient, groupEmail, emails }) => {
  const addEmail = (email, cb) => {
    service.members.insert({
      groupKey: groupEmail,
      resource: { email },
      auth: jwtClient
    }, (err, data) => {
      cb(null, err ? 'error' : 'success')
    })
  }

  groupBy(emails, addEmail, (err, result) => {
    if (err) throw err
    console.log(`added emails for ${groupEmail}`)
    console.log(result)
  })
}

module.exports = addEmails
