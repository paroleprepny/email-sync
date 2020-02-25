#!/usr/bin/env node

if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }
const getWorksheets = require('./get-worksheets')
const compileEmailsFromSheets = require('./compile-emails-from-sheets')
const authorize = require('./authorize')
const addEmails = require('./add-emails')
const { GROUP_EMAIL } = process.env

const syncEmails = async () => {
  const worksheets = await getWorksheets()

  compileEmailsFromSheets(worksheets, (err, emails) => {
    if (err) throw err
    authorize((err, jwtClient) => {
      if (err) throw err
      addEmails({ jwtClient, groupEmail: GROUP_EMAIL, emails })
    })
  })
}

syncEmails()
