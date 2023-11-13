const fs = require("fs");
const polyline = require("@mapbox/polyline");

const helpers = {
    /**
     * @description Function that adds or updates an
     *              object in an array within a JSON
     *              file based on the object's id.
     *
     * @param {String} filePath - The path to the JSON file.
     * @param {String} id - The id of the object to add or update.
     * @param {Object} data - The new data object to add.
     */
    addToJsonFile: function addToJsonFile(filePath, data, next, id = null) {
        fs.readFile(filePath, "utf8", (err, fileData) => {
            if (err) {
                next(err);
                return;
            }

            try {
                const array = JSON.parse(fileData);
                const index = array.findIndex((item) => item.id === id);

                if (index !== -1 || id !== null) {
                    array[index] = { ...array[index], ...data };
                } else {
                    array.push(data);
                }

                const jsonString = JSON.stringify(array, null, 4);

                fs.writeFile(filePath, jsonString, "utf8", (writeErr) => {
                    if (writeErr) {
                        console.error("Error writing file:", writeErr);
                    } else {
                        console.log(`Successfully added/updated object in JSON file!`);
                    }
                });
            } catch (parseErr) {
                console.error("Error parsing JSON string:", parseErr);
            }
        });
    },
    /**
     * @description Function that encodes an array of coordinates into
     * a polyline string.
     *
     * @param {Array} coords Coordinates to encode
     *
     * @returns {String} Polyline string
     */
    encodeArrayOfCoords: function encodeArrayOfCoords(coords) {
        const polyString = polyline.encode(coords);

        return polyString;
    },
    /**
     * @description Function that decodes a polystring into
     * an array of coordinates
     *
     * @param {String} polystring String to decode
     *
     * @returns {Array} Array of coordinates
     */
    decodePolyString: function decodePolyString(polystring) {
        const arrayOfCoords = polyline.decode(polystring);

        return arrayOfCoords;
    }
};

module.exports = helpers;
