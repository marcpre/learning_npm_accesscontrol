const express = require('express')
const AccessControl = require('accesscontrol')

const app = express()
const grants = require('./config/accesscontrol')

const ac = new AccessControl(grants)

app.get('/test', (req, res) => {
  const permission = ac.can(req.user.role).readAny('test')
  if (permission.granted) {
    res.send('Hello World!')
  } else {
    res.status(403).end()
  }
})

// Service
const port = process.env.APP_PORT || 8080
const host = process.env.APP_HOST || 'localhost'

app.listen(port, () => {
  console.log(`Listening on ${host}:${port}`)
})

module.exports = app
