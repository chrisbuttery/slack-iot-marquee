require("dotenv").config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express()
const particle = require('particle-api-js')

const Particle = new particle()
const portNumber = 8000
let auth = null

// credentials
const deviceId = process.env.PDEVICE
const username = process.env.PUSER
const password = process.env.PPASS
const hrKey = process.env.HRKEY
const displayKey = process.env.DISPLAYKEY

// middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.post('/api/display', async (req, res, next) => {
  const { token, text } = req.body  
  
  if (!auth) {
    await Particle.login({username, password})
      .then(data => {
        auth = data.body.access_token
      })
      .catch(({ status, message }) => 
        res.status(status).send({ error: message })
      )
  }

  if (!token || token !== displayKey) {
    return res.status(401).send({ error: '401 Unauthorized' })
  }

  await Particle.callFunction({
    deviceId,
    name: 'matrix_display_message',
    argument: text,
    auth
  })
  .then((data) => res.send(`Now displaying: ${data.body}`))
  .catch((err) => console.error(err))

  next()
})

app.post('/api/hr', async (req, res, next) => {
  const { token, text } = req.body  
  if (!auth) {
    await Particle.login({username, password})
      .then(data => {
        auth = data.body.access_token
      })
      .catch(({ status, message }) => 
        res.status(status).send({ error: message })
      )
  }

  if (!token || token !== hrKey) {
    return res.status(401).send({ error: '401 Unauthorized' })
  }

  await Particle.callFunction({
    deviceId,
    name: 'matrix_display_message',
    argument: `Go to HR ${text}`,
    auth
  })
  .then(() => res.send(`${text} is required by HR.`))
  .catch((err) => console.error(err))

  next()
})

// error handling
app.use((err, req, res, next) => 
  res.status(422).send({ error: err.message })
)
// Go!
app.listen(portNumber, () => console.log(`Listening on port ${portNumber}`))
