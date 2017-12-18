#!/usr/bin/env node

require('dotenv').config()
const GoogleSpreadsheet = require('google-spreadsheet')
const fs = require('fs')
const uniq = require('lodash.uniq')
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

      donorsSheet.getRows((err, rows) => {
        if (err) throw err
        const donorEmails = uniq(rows.map(donor => donor.email))
        console.log(donorEmails)
      })

      volunteersSheet.getRows((err, rows) => {
        if (err) throw err
        const volunteerEmails = uniq(rows.map(volunteer => volunteer.email))
        console.log(volunteerEmails)
      })
    })
  })
})
