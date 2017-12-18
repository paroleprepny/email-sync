#!/usr/bin/env node

require('dotenv').config()
const GoogleSpreadsheet = require('google-spreadsheet')
const fs = require('fs')
const { SPREADSHEET_KEY, DONORS_SHEET_ID, VOLUNTEERS_SHEET_ID } = process.env

fs.readFile('./.credentials.json', 'utf-8', (err, data) => {
  if (err) throw err
  const creds = JSON.parse(data)
  const doc = new GoogleSpreadsheet(SPREADSHEET_KEY)

  doc.useServiceAccountAuth(creds, () => {
    doc.getInfo((err, info) => {
      if (err) throw err
      const { worksheets } = info
      const donorsSheet = worksheets.find(s => s.id === DONORS_SHEET_ID)
      const volunteersSheet = worksheets.find(s => s.id === VOLUNTEERS_SHEET_ID)
      console.log(JSON.stringify(donorsSheet, null, 2))
      console.log(JSON.stringify(volunteersSheet, null, 2))
    })
  })
})
