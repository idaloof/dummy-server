/**
 * @description Zone model handling zone requests
 */

import helpers from "./helpers.js";
const data = require("../data/zone_loc.json");

const zone = {
    /**
     * @description Function that returns all zones
     *
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {Array} Array of zones
     */
    getAllZones: function getAllZones(res, next) {
        try {
            const decodedData = data.map((zone) => ({
                ...zone,
                geometry: helpers.decodePolyString(zone.geometry)
            }));

            return res.status(200).json(decodedData);
        } catch (error) {
            next(error);
        }
    },
    /**
     * @description Function that returns one zone by id
     *
     * @param {number} id Zone id
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {Object} Zone object
     */
    getOneZone: function getOneZone(id, res, next) {
        try {
            const index = data.findIndex((item) => item.id === id);

            if (index === -1) {
                return res.status(404).send("Zone not found");
            }

            const zone = {
                ...data[index],
                geometry: helpers.decodePolyString(data[index].geometry)
            };

            return res.status(200).json(zone);
        } catch (parseErr) {
            next(parseErr);
        }
    },
    /**
     * @description Function that inserts a new zone
     *
     * @param {Request} req Request object
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {void}
     */
    insertZone: async function insertZone(req, res, next) {
        let zone = req.body;

        const zoneLocId = data.length + 1;
        const zoneTypeId = zone.zoneTypeId;
        const cityId = zone.cityId;
        const zoneCoords = zone.coords;

        const polyString = helpers.encodeArrayOfCoords(zoneCoords);

        const filePath = "./data/zone_loc.json";

        zone = {
            id: `${zoneLocId}`,
            zone_id: zoneTypeId,
            city_id: cityId,
            date_from: new Date().toLocaleDateString(),
            geometry: polyString
        };

        helpers.addToJsonFile(filePath, zone, next);

        return res.status(201).json(zone);
    }
};

export default zone;
