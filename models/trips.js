/**
 * @description Trip model handling trip requests
 */

import helpers from "./helpers.js";
import fs from "fs";

const data = JSON.parse(fs.readFileSync("./data/trip.json", "utf-8"));

const trip = {
    /**
     * @description Function that returns all trips
     *
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {void} Array of trips
     */
    getAllTrips: function getAllTrips(res, next) {
        try {
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },
    /**
     * @description Function that returns one trip by id
     *
     * @param {number} id Trip id
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {void} Trip object
     */
    getOneTrip: function getOneTrip(id, res, next) {
        try {
            const index = data.findIndex((item) => item.id === id);

            if (index === -1) {
                return res.status(404).send("Trip not found");
            }

            return res.status(200).json(data[index]);
        } catch (parseErr) {
            next(parseErr);
        }
    },
    /**
     * @description Function that inserts a new trip
     *
     * @param {Object} data New trip data
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {void}
     */
    insertTrip: async function insertTrip(tripData, res, next) {
        const trip = {
            id: data.length + 1,
            bike_id: tripData.bikeId,
            user_id: tripData.userId,
            // dessa 4 värden kan registreras direkt i databasen när resan påbörjas respektive avslutas, positionerna för start respektive slut blir cykelns senaste position från cykeltabellen
            // start_time: new Date().toLocaleString(),
            // end_time: "",
            // start_pos: tripData.geometry,
            // end_pos: "",

            // dessa 3 registreras via separat metod i samband med resans slut. Start och slutposition
            // hämtas från databas och kontrollers i koden för vilken zon dessa är i, därefter skickas zon id med i stored procedure som baserat på det
            // räknar fram start och parkeringskostnad. Samt den variabla kostnaden baserat på starttid och sluttid som redan ligger sparade i samma tabell
            // start_cost: "",
            // var_cost: "",
            // park_cost: ""
        };

        const filePath = "./data/trip.json";

        await helpers.addToJsonFile(filePath, trip, next);
    }
};

export default trip;
