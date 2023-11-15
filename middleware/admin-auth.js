// /**
//  * @description Middleware functions to check if admin token is provided
//  */

// const jwt = require('jsonwebtoken');
// const jwtSecret = process.env.JWT_SECRET;

// /**
//  * @description Function to validate admin token
//  *
//  * @param {String} token Admin token
//  *
//  * @returns {Boolean}
//  */
// function verfiyToken(token) {
//     if (token) {
//         try {
//             jwt.verify(token, jwtSecret);
//             return true;
//         } catch (err) {
//             return false;
//         }
//     }

//     return true;
// }

// Flyttade in denna i auth-modellen :) /J

// /**
//  * @description Function to check if admin token is provided
//  *
//  * @param {Request} req Request object
//  * @param {Response} res Response object
//  * @param {Function} next Next function
//  *
//  * @returns {void}
//  */
// function adminAuthMiddleware(req, res, next) {
//     const token = req.headers['admin-token'];

//     if (!token) {
//         return res.status(401).send('Admin token is required');
//     }

//     if (!verfiyToken(token)) {
//         return res.status(403).send('Invalid admin token');
//     }

//     next();
// }

// module.exports = adminAuthMiddleware
