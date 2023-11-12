const express = require('express')
const tripsModel = require('../../models/trips.js')

const router = express.Router()

/**
 * Note to self:
 * Wrappa hämtningarna i en try catch där catch pekar
 * mot felhanterings-middleware med hjälp av next
 * Tänk på payload/token
 */

/**
 * @description Route for getting all trips
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
router.get('/trips', (req, res, next) => {
    tripsModel.getAllTrips(res, next)
});

/**
 * @description Route for getting one trip
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
router.get('/trips/:id', (req, res, next) => {
    const tripId = req.params.id

    tripsModel.getOneTrip(tripId, res, next)
});

module.exports = router
