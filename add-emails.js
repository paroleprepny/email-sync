const google = require('googleapis')
const service = google.admin('directory_v1')
const groupBySeries = require('async/groupBySeries')
const getNewEmails = require('./get-new-emails')

const waitTimeMs = 50

const addEmails = ({ jwtClient, groupEmail, emails }) => {
  const addEmail = (email, cb) => {
    service.members.insert({
      groupKey: groupEmail,
      resource: { email },
      auth: jwtClient
    }, (err, data) => {
      setTimeout(() => {
        if (err) {
          const errReason = err.errors.map(e => e.reason).join(' ')
          cb(null, errReason)
        } else {
          cb(null, 'success')
        }
      }, waitTimeMs)
    })
  }

  getNewEmails({ jwtClient, groupEmail, emails }, (err, newEmails) => {
    if (err) throw err
    console.log(`adding ${newEmails.length} new emails`)
    groupBySeries(newEmails, addEmail, (err, result) => {
      if (err) throw err
      console.log(`added emails for ${groupEmail}`)
      console.log(JSON.stringify(result, null, 2))
    })
  })
}

module.exports = addEmails
