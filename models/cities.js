/**
 * @description City model handling city requests
 */

const fs = require('fs')
const helpers = require('../models/helpers.js')
const data = require('../data/city.json')

const city = {
    /**
     * @description Function that returns all cities
     *
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {void}
     */
    getAllCities: function getAllCities(res, next) {
        try {
            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    },
    /**
     * @description Function that returns one city by id
     *
     * @param {number} id City id
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {void}
     */
    getOneCity: function getOneCity(id, res, next) {
        try {
            const index = data.findIndex(item => item.id === id);

            if (index === -1) {
                return res.status(404).send('City not found');
            }
    
            return res.status(200).json(data[index]);
        } catch (parseErr) {
            next(parseErr)
        }
    },
    /**
     * @description Function that inserts a new city
     *
     * @param {Request} req Request object
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {void}
     */
    insertCity: async function insertCity(req, res, next) {
        let city = req.body

        const cityId = data.length + 1
        const cityName = city.name
        const cityCoords = city.coords

        const polyString = helpers.encodeArrayOfCoords(cityCoords)
    
        const filePath = './data/city.json'

        city = {
            id: cityId,
            name: cityName,
            geometry: polyString
        }

        helpers.addToJsonFile(filePath, city, next)

        return res.status(201).json(city)
    }
}

module.exports = city
