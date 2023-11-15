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
router.get('/', (req, res, next) => {
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
router.get('/:id', (req, res, next) => {
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
router.put('/:id', (req, res, next) => {
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
router.post('/:id/rent', async (req, res, next) => {
    /**
     * När rent-routen anropas ska följande hända:
     * Cykelns status ska ändras
     * En resa ska skapas (user_id, bike_id, starttid, startposition)
     * Returnera/spara trip_id?
     */
    const rent = {
        // oavsett om vi skickar med userId via body eller inte
        // (behöver nog se hur det är tänkt innan jag förstår mervärdet
        // med att göra så i tillägg till att ha idt endast i tokenet)
        // så tänker jag att vi initialt ska satsa på att resan ska registreras
        // på det användaridt som ligger i tokenet. Det ska inte räcka med
        // att token är giltig utan det måste tillhöra rätt användare också
        token: req.headers['x-access-token'],
        userId: req.body.userId,
        bikeId: req.params.id
    }

    const result = await bikesModel.rentBike(rent, res, next)

    return result // frågan är vad som ska returneras // Jag tänker att det bör räcka med reseidt bara? :) /JL
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
router.post('/:id/return', async (req, res, next) => {
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
    // const rent = {
    //     bikeId: req.params.id,
    //     tripId: req.body.tripId // via resan kommer vi åt userId
    // }

    // Jag tänker att vi bara behöver reseidt, eftersom både userid
    // och bikeid är redan kopplade till reseidt :)
    // tänker också att denna kanske passar bättre under trips/ routen?
    // Finns det ngn säkerhetsrisk med att inte kontrollera användarens token/id vid återlämning? Att någon går in och "mass-stoppar" en massa resor och orsakar trafikkaos tex :)
    const rent = req.params.tripid;

    const result = await bikesModel.returnBike(rent, res, next)

    // här tänker jag att man returnerar hela resedatat,
    // med starttid, startpunkt, sluttid, slutpunkt, de olika beståndsdelarna i kostnaden samt beräknad totalkostnad
    return result
});

module.exports = router
