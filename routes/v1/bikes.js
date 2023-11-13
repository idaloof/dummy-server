const express = require("express");
const bikesModel = require("../../models/bikes.js");

const router = express.Router();

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
router.get("/", (req, res, next) => {
    bikesModel.getAllBikes(res, next);
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
router.get("/:id", (req, res, next) => {
    const bikeId = req.params.id;

    bikesModel.getOneBike(bikeId, res, next);
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
router.put("/:id", (req, res, next) => {
    const bike = {
        id: req.params.id,
        data: req.body.bike
    };

    bikesModel.updateBike(bike, res, next);
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
router.post("/:id/rent", async (req, res, next) => {
    /**
     * När rent-routen anropas ska följande hända:
     * Cykelns status ska ändras
     * En resa ska skapas (user_id, bike_id, starttid, startposition)
     * Returnera/spara trip_id?
     */
    const rent = {
        userId: req.body.userId,
        bikeId: req.params.id
    };

    const result = await bikesModel.rentBike(rent, res, next);

    return result; // frågan är vad som ska returneras
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
router.post("/:id/return", async (req, res, next) => {
    /**
     * När return-routen anropas ska följande hända:
     * Cykelns status ska ändras
     * En resa ska uppdateras (sluttid, slutposition)
     * Startkostnad läggs till resan
     * Rörlig kostnad ska beräknas (med hjälp av tid och kostnad per tidsenhet) och läggas till resan
     * Parkeringskostnad läggs till resan
     * Var någonstans i flödet ska vi ge rabatter på start- respektive parkeringskostnad?
     * Kundens saldo ändras
     */
    const rent = {
        bikeId: req.params.id,
        tripId: req.body.tripId // via resan kommer vi åt userId
    };

    const result = await bikesModel.returnBike(rent, res, next);

    return result;
});

module.exports = router;
