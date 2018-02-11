require('dotenv').config()
const { GOOGLE_CREDENTIALS } = process.env
const google = require('googleapis')
// const drive = google.drive('v2')

const key = JSON.parse(GOOGLE_CREDENTIALS)
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/drive'], // an array of auth scopes
  null
)

jwtClient.authorize((err, tokens) => {
  if (err) {
    console.log(err)
    return
  }

  console.log({ tokens })

  // Make an authorized request to list Drive files.
  // drive.files.list({
  //   auth: jwtClient
  // }, (err, resp) => {
  //   if (err) throw err
  //   console.log(resp)
  //   // handle err and response
  // })
})
