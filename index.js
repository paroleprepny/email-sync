#!/usr/bin/env node

require('dotenv').config()
const GoogleSpreadsheet = require('google-spreadsheet')
const fs = require('fs')
const compileEmailsFromSheets = require('./compile-emails-from-sheets')
const { SPREADSHEET_KEY } = process.env

fs.readFile('./.credentials.json', 'utf-8', (err, data) => {
  if (err) throw err
  const creds = JSON.parse(data)
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
})
