const google = require('googleapis')
require('dotenv').config()
const { GOOGLE_CREDENTIALS, USER_EMAIL } = process.env
const key = JSON.parse(GOOGLE_CREDENTIALS)
const authScopes = [
  'https://www.googleapis.com/auth/admin.directory.user',
  'https://www.googleapis.com/auth/admin.directory.group',
  'https://www.googleapis.com/auth/admin.directory.group.member'
]
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  authScopes,
  USER_EMAIL
)

const authorize = cb => {
  jwtClient.authorize(err => {
    if (err) {
      cb(err)
    } else {
      cb(null, jwtClient)
    }
  })
}

module.exports = authorize
