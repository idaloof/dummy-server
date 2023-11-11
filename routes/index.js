const express = require('express')
const router = express.Router();

/**
 * @description Collection of REST API endpoints
 */

router.use('/', require('./bikes.js'))
router.use('/', require('./cities.js'))
router.use('/', require('./auth.js'))
router.use('/', require('./trips.js'))
router.use('/', require('./users.js'))
router.use('/', require('./zones.js'))

module.exports = router
