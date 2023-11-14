/**
 * @description City model handling city requests
 */

import helpers from "../models/helpers.js";
import fs from "fs";

const data = JSON.parse(fs.readFileSync("./data/city.json", "utf-8"));


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
            const decodedData = data.map((city) => ({
                ...city,
                geometry: helpers.decodePolyString(city.geometry)
            }));

            return res.status(200).json(decodedData);
        } catch (error) {
            next(error);
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
            const index = data.findIndex((item) => item.id === id);

            if (index === -1) {
                return res.status(404).send("City not found");
            }

            const city = {
                ...data[index],
                geometry: helpers.decodePolyString(data[index].geometry)
            };

            return res.status(200).json(city);
        } catch (parseErr) {
            next(parseErr);
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
        let city = req.body;

        const cityId = data.length + 1;
        const cityName = city.name;
        const cityCoords = city.coords;

        const polyString = helpers.encodeArrayOfCoords(cityCoords);

        const filePath = "./data/city.json";

        city = {
            id: cityId,
            name: cityName,
            geometry: polyString
        };

        helpers.addToJsonFile(filePath, city, next);

        return res.status(201).json(city);
    }
};

export default city;
