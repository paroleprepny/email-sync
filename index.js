#!/usr/bin/env node

const getWorksheets = require('./get-worksheets')
const compileEmailsFromSheets = require('./compile-emails-from-sheets')
const authorize = require('./authorize')
const addEmails = require('./add-emails')

getWorksheets((err, worksheets) => {
  if (err) throw err
  compileEmailsFromSheets(worksheets, (err, result) => {
    if (err) throw err
    const { all, volunteers } = result

    authorize((err, jwtClient) => {
      if (err) throw err
      addEmails({ jwtClient, groupEmail: 'pp-test-all@goodcall.nyc', emails: all })
      addEmails({ jwtClient, groupEmail: 'pp-test-volunteers@goodcall.nyc', emails: volunteers })
    })
  })
})
