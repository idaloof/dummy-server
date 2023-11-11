/**
 * @description Bike model handling bike requests
 */

const data = require('../data/bike.json')

const bike = {
    /**
     * @description Function that returns all bikes
     *
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {Array} Array of bikes
     */
    getAllBikes: function getAllBikes(res, next) {
        try {
            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    },
    /**
     * @description Function that returns one bike by id
     *
     * @param {number} id Bike id
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {Object} Bike object
     */
    getOneBike: function getOneBike(id, res, next) {
        try {
            const index = data.findIndex(item => item.id === id);

            if (index === -1) {
                return res.status(404).send('Bike not found');
            }
    
            return res.status(200).json(data[index]);
        } catch (parseErr) {
            next(parseErr)
        }
    }
}

module.exports = bike
