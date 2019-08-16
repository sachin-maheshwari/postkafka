'use strict'

const MessageBusService = require('../service/MessageBusService')
const helper = require('../common/helper')
const config = require('config')
const utils = require('../utils/writer.js')

module.exports.postEvent = function postEvent (req, res) {
  MessageBusService
    .postEvent(req.body)
    .then(() => {
      utils.writeJson(res, null, 204)
    })
}
