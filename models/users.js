/**
 * @description User model handling user requests
 */

import helpers from "./helpers.js";
import fs from "fs";

const data = JSON.parse(fs.readFileSync("./data/user.json", "utf-8"));

const user = {
    /**
     * @description Function that returns all users
     *
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {Array} Array of users
     */
    getAllUsers: function getAllUsers(res, next) {
        try {
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },
    /**
     * @description Function that returns one user by id
     *
     * @param {number} id user id
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {Object} User object
     */
    getOneUser: function getOneUser(id, res, next) {
        try {
            const index = data.findIndex((item) => item.id === id);

            if (index === -1) {
                return res.status(404).send("User not found");
            }

            return res.status(200).json(data[index]);
        } catch (parseErr) {
            next(parseErr);
        }
    },
    /**
     * @description Function that updates a user
     *
     * @param {Object} user User object
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {Object} User object
     */
    updateUser: function updateUser(user, res, next) {
        const filePath = "./data/user.json";
        const userInfo = user.data;

        helpers.addToJsonFile(filePath, userInfo, next, user.id);
        // i riktiga servern tänker jag att det inte är
        // datat som skickats i requesten som returneras utan
        // det görs en request till databasen som hämtar datat
        // som ligger där (för att säkerställa att den har uppdaterats)

        // jag tänker också att user.balance inte är något som kan uppdateras via denna request, utan det kan endast uppdateras i databasen i samband med att en resa slutförs eller en inbetalning/månadsfakturering görs

        return res.status(201).json({
            id: user.id,
            email: userInfo.email,
            cardnr: userInfo.cardnr,
            balance: userInfo.balance,
            active: userInfo.active
        });
    },

    registerUser: function registerUser(req, res, next) {
        // efterfråga användarens email i denna och registrera
        // i database, returnera användarens id + token som kan användas
        // för att komplettera registrering mer cardnr.
        // Innan cardnr har registrerats kommer tokenets payload att innehålla "role: not_completed" och
        // då kan inte resor påbörjas tänker jag. När cardnr registreras så byts tokenet ut mot ett som innehåller "role: user".. i tillägg till användarens id.
    }
};

export default user;
