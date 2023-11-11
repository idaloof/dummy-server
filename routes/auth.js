const express = require('express')
const adminModel = require('../models/auth.js')

const router = express.Router()

/**
 * Note to self:
 * Wrappa hämtningarna i en try catch där catch pekar
 * mot felhanterings-middleware med hjälp av next
 */

/**
 * @description Admin login route
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
router.post('/login', (req, res, next) => {
    adminModel.login(req, res, next)
});

/**
 * @description Admin register route
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
router.post('/register', async (req, res, next) => {
    await adminModel.register(req, res, next)
});

module.exports = router


