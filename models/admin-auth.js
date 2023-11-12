/**
 * @description Auth model handling registration, login and comparing passwords
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const helpers = require('./helpers.js');
const filePath = './data/admin.json';
const nrOfAdmins = require('../data/admin.json').length;

/**
 * Note to self:
 * next-funktionen kan användas vid error.
 * Då redirectas en till middleware för felhantering
 * Fråga: Hur ska middleware för felhantering veta vilken
 * statuskod som ska returneras (4xx eller 5xx)
 * när next(error) anropas?
 */

const auth = {
    /**
     * @description Function that handles admin registration
     *
     * @param {Request} req Request object
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {Object} JSON object
     */
    register: function register(req, res, next) {
        const saltRounds = 10;
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/register",
                    title: "Email or password missing",
                    detail: "Email or password missing in request"
                }
            });
        }
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/register",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
            }

            helpers.addToJsonFile(
                filePath,
                {
                    "id": `${nrOfAdmins + 1}`,
                    "access": "what",
                    "username": email,
                    "hash": hash,
                    "active": true
                },
                next
            )

            return res.status(201).json({
                data: {
                    message: `User ${email} successfully registered.`
                }
            });
        });
    },

    /**
     * @description Function that handles admin login
     *
     * @param {Request} req Request object
     * @param {Response} res Response object
     * @param {Function} next Next function
     *
     * @returns {Object} JSON object
     */
    login: async function login(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "Email or password missing",
                    detail: "Email or password missing in request"
                }
            });
        }

        const data = require('../data/admin.json');
        const index = data.findIndex(item => item.username === email);

        if (index === -1) {
            return res.status(404).send('User not found');
        }
        const hash = data[index].hash;

        const user = {
            email: email,
            password: password,
            hash: hash
        }

        return auth.comparePasswords(
            res,
            password,
            user,
        );
    },
    /**
     * @description Function that compares passwords
     *
     * @param {Request} req Request object
     * @param {String} password Password
     * @param {Object} user User
     *
     * @returns {Object} JSON object
     */
    comparePasswords: function comparePasswords(res, password, user) {
        bcrypt.compare(password, user.hash, (err, result) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/login",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
            }

            if (result) {
                const payload = {
                    email: user.email
                };
                const jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });

                return res.json({
                    data: {
                        type: "success",
                        message: "User logged in",
                        user: payload,
                        token: jwtToken
                    }
                });
            }

            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "Wrong password",
                    detail: "Password is incorrect."
                }
            });
        });
    },
};

module.exports = auth
