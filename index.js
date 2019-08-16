'use strict'

const http = require('http')
const config = require('config')

const bodyParser = require( 'body-parser' )

const MessageBusService = require('./service/MessageBusService')
const logger = require('./common/logger')
const express = require('express')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


const routes = require('./routes')

app.use('', routes)

// Error handler
app.use((err, req, res, next) => {
  let status = err.status || 500
  let message = err.message
  if (err.isJoi) {
    status = 400
    message = _(err.details).map('message').join(', ')
  } else if (status === 500) {
    message = 'Internal server error'
  }
  res.status(status)
  res.send({message})
  logger.error(err)
})


MessageBusService.init()
  .then(() => {
    app.listen(config.PORT, '0.0.0.0')
    logger.info('Express server listening on port %d in %s mode', config.PORT, process.env.NODE_ENV)
  })
