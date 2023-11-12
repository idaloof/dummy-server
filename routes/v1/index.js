const express = require('express')
const router = express.Router()
// const adminAuthMiddleware = require('../../middleware/admin-auth.js')
const adminAuthMiddleware = require('../../models/admin-auth.js').checkToken;

/**
 * @description Collection of REST API endpoints
 */

router.use('/admin', adminAuthMiddleware, require('./admin.js'))
router.use('/', require('./bikes.js'))
router.use('/', require('./cities.js'))
router.use('/', require('./login.js'))
router.use('/', require('./trips.js'))
router.use('/', require('./users.js'))
router.use('/', require('./zones.js'))

module.exports = router
