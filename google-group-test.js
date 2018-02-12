require('dotenv').config()
const { GOOGLE_CREDENTIALS, USER_EMAIL } = process.env
const google = require('googleapis')
const service = google.admin('directory_v1')

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

const cb = (err, res) => {
  if (err) return console.error(err)
  console.log(res)
}

jwtClient.authorize(err => {
  if (err) throw err
  service.groups.list({
    auth: jwtClient,
    customer: 'my_customer'
  }, cb)
})
