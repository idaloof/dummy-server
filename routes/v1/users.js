const express = require('express')
const usersModel = require('../../models/users.js')

const router = express.Router()

/**
 * Note to self:
 * Wrappa hämtningarna i en try catch där catch pekar
 * mot felhanterings-middleware med hjälp av next
 * Tänk på payload/token
 */

/**
 * @description Route for getting all users
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
router.get('/users', (req, res, next) => {
    usersModel.getAllUsers(res, next)
});

/**
 * @description Route for getting one user
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
router.get('/users/:id', (req, res, next) => {
    const userId = req.params.id

    usersModel.getOneUser(userId ,res, next)
});

/**
 * @description Route for updating a user
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
router.put('/users/:id', (req, res, next) => {
    const user = {
        id: req.params.id,
        data: req.body
    }

    usersModel.updateUser(user ,res, next)
});

module.exports = router
