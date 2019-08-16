/**
 * Configure application routes.
 */
const {Router} = require('express')
const requireDir = require('require-dir')

const router = Router()
const controllers = requireDir('./controllers')

router.post('/', controllers.Events.postEvent)

module.exports = router
