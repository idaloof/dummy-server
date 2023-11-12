const express = require('express')
const bikesModel = require('../../models/bikes.js')

const router = express.Router()

/**
 * Note to self:
 * Wrappa hämtningarna i en try catch där catch pekar
 * mot felhanterings-middleware med hjälp av next
 * Tänk på payload/token
 */

/**
 * @description Route for getting all bikes
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
router.get('/bikes', (req, res, next) => {
    bikesModel.getAllBikes(res, next)
});

/**
 * @description Route for getting one bike
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
router.get('/bikes/:id', (req, res, next) => {
    const bikeId = req.params.id

    bikesModel.getOneBike(bikeId, res, next)
});

/**
 * @description Route for updating a bike
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
router.put('/bikes/:id', (req, res, next) => {
    const bike = {
        id: req.params.id,
        data: req.body.bike
    }

    bikesModel.updateBike(bike, res, next)
});

/**
 * @description Route for renting a bike
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {Response}
 */
router.post('/bikes/:id/rent', async (req, res, next) => {
    /**
     * När rent-routen anropas ska följande hända:
     * Cykelns status ska ändras
     * En resa ska skapas (user_id, bike_id, starttid, startposition)
     * Returnera/spara trip_id?
     */
    const rent = {
        userId: req.body.userId,
        bikeId: req.params.id
    }

    const result = await bikesModel.rentBike(rent, res, next)

    return result // frågan är vad som ska returneras
});

/**
 * @description Route for returning a bike
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {Response}
 */
router.post('/bikes/:id/return', async (req, res, next) => {
    /**
     * När return-routen anropas ska följande hända:
     * Cykelns status ska ändras
     * En resa ska uppdateras (sluttid, slutposition)
     * En trip_cost ska skapas
     * En transaktion skapas
     * Kundens saldo ändras
     */
    const rent = {
        bikeId: req.params.id,
        tripId: req.body.tripId // via resan kommer vi åt userId
    }

    const result = await bikesModel.returnBike(rent, res, next)

    return result
});

module.exports = router
