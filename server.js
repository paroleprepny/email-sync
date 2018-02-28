const express = require('express')
const { PORT } = process.env
const app = express()

app.listen(PORT, () => {
  console.log(`started app on PORT ${PORT}`)
})
