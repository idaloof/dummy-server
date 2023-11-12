const express = require('express')
const citiesModel = require('../../models/cities.js')

const router = express.Router()

/**
 * Note to self:
 * Wrappa hämtningarna i en try catch där catch pekar
 * mot felhanterings-middleware med hjälp av next
 * Tänk på payload/token
 */

/**
 * @description Route for getting all cities
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {Response}
 */
router.get('/cities', (req, res, next) => {
    citiesModel.getAllCities(res, next)
});

/**
 * @description Route for getting one city
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {Response}
 */
router.get('/cities/:id', (req, res, next) => {
    const cityId = req.params.id

    citiesModel.getOneCity(cityId, res, next)
});

/**
 * @description Route for inserting a city
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
router.post('/cities', (req, res, next) => {
    citiesModel.insertCity(req, res, next)
});

module.exports = router
