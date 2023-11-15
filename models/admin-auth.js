/**
 * @description Auth model handling registration, login and comparing passwords
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import helpers from "./helpers.js";
import fs from "fs";

const filePath = "./data/admin.json";
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
const nrOfAdmins = data.length;

/**
 * Note to self:
 * next-funktionen kan användas vid error.
 * Då redirectas en till middleware för felhantering
 * Fråga: Hur ska middleware för felhantering veta vilken
 * statuskod som ska returneras (4xx eller 5xx)
 * när next(error) anropas?
 * // Om jag inte tänker fel så kan man kan lägga till en .code attribut till error själv, dvs error.code = "DATABASE_ERROR" eller liknande. Med reservation för att det kanske bara gäller "egenskapade" errors :) /JL
 */

const auth = {
    checkToken: function (req, res, next) {
        let token = req.headers["x-access-token"];

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/login",
                            title: "Failed authentication",
                            detail: err.message
                        }
                    });
                }

                if (!decoded.admin) {
                    // if unaothorized request it is safer
                    // to make it look like the page does not
                    // exist
                    return res.status(404).json({
                        errors: {
                            status: 404,
                            source: req.originalUrl,
                            title: "Not found",
                            detail: "Page not found"
                        }
                    });
                }

                req.user = {};
                req.user.id = decoded.id;
                // vad tror ni om att ändra admin till role här
                // role kan vara vilken typ av anställning som helst
                // och man kollar då om role är admin i denna request
                // om all personal ligger i samma tabell
                // kommer ju servicepersonal att ha role "service" t ex (om vi vill göra koden lite mer generell)
                req.user.admin = decoded.admin;
                console.log(req.user);
                return next();
            });
        } else {
            return res.status(401).json({
                errors: {
                    status: 401,
                    // source: req.path,
                    source: req.originalUrl,
                    title: "No token",
                    detail: "No token provided in request headers"
                }
            });
        }
    },
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
        const username = req.body.username;
        const password = req.body.password;
        console.log(req.body);

        if (!username || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/register",
                    title: "Email or password missing",
                    detail: "Email or password missing in request"
                }
            });
        }
        bcrypt.hash(password, saltRounds, async function (err, hash) {
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
                    id: `${nrOfAdmins + 1}`,
                    access: "what",
                    username: username,
                    hash: hash,
                    active: true
                },
                next
            );

            return res.status(201).json({
                data: {
                    message: `User ${username} successfully registered.`
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
    login: function login(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/admin/login",
                    title: "Username or password missing",
                    detail: "Username or password missing in request"
                }
            });
        }

        const data = JSON.parse(fs.readFileSync("./data/admin.json", "utf-8"));
        const index = data.findIndex((item) => item.username === username);

        if (index === -1) {
            return res.status(404).send("User not found");
        }
        const hash = data[index].hash;

        const user = {
            id: data[index].id,
            user: username,
            password: password,
            hash: hash,
            access: data[index].access
        };

        return auth.comparePasswords(res, password, user);
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
                    id: user.id,
                    admin: user.access
                };
                const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

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
    }
};

export default auth;
