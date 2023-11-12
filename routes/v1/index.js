const express = require('express')
const router = express.Router()
const adminAuthMiddleware = require('../../middleware/admin-auth.js')

/**
 * @description Collection of REST API endpoints
 */

router.use('/', require('./bikes.js'))
router.use('/', require('./cities.js'))
router.use('/', require('./login.js'))
router.use('/', require('./trips.js'))
router.use('/', require('./users.js'))
router.use('/', require('./zones.js'))
router.use('/', adminAuthMiddleware, require('./admin.js'))

module.exports = router
