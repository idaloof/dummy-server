/**
 * @description User model handling user requests
 */

import helpers from "./helpers.js";
const data = require("../data/user.json");

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

        return res.status(201).json({
            id: user.id,
            email: userInfo.email,
            cardnr: userInfo.cardnr,
            balance: userInfo.balance,
            active: userInfo.active
        });
    }
};

export default user;
