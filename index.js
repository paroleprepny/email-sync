#!/usr/bin/env node

require('dotenv').config()
const GoogleSpreadsheet = require('google-spreadsheet')
const compileEmailsFromSheets = require('./compile-emails-from-sheets')
const { SPREADSHEET_KEY, GOOGLE_CREDENTIALS } = process.env

const creds = JSON.parse(GOOGLE_CREDENTIALS)
const doc = new GoogleSpreadsheet(SPREADSHEET_KEY)

doc.useServiceAccountAuth(creds, () => {
  doc.getInfo((err, info) => {
    if (err) throw err
    compileEmailsFromSheets(info.worksheets, (err, result) => {
      if (err) throw err
      console.log(JSON.stringify(result, null, 2))
    })
  })
})
