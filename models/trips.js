/**
 * @description Trip model handling trip requests
 */

const data = require('../data/trip.json')

const trip = {
    /**
     * @description Function that returns all trips
     *
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {Array} Array of trips
     */
    getAllTrips: function getAllTrips(res, next) {
        try {
            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    },
    /**
     * @description Function that returns one trip by id
     *
     * @param {number} id Trip id
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {Object} Trip object
     */
    getOneTrip: function getOneTrip(id, res, next) {
        try {
            const index = data.findIndex(item => item.id === id);

            if (index === -1) {
                return res.status(404).send('Trip not found');
            }
    
            return res.status(200).json(data[index]);
        } catch (parseErr) {
            next(parseErr)
        }
    }
}

module.exports = trip
