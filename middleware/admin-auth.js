/**
 * @description Middleware functions to check if admin token is provided
 */

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

/**
 * @description Function to validate admin token
 *
 * @param {String} token Admin token
 * 
 * @returns {Boolean}
 */
function verifyToken(token) {
    if (token) {
        try {
            jwt.verify(token, jwtSecret);
            return true;
        } catch (err) {
            return false;
        }
    }

    return true;
}

/**
 * @description Function to check if admin token is provided
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
function adminAuthMiddleware(req, res, next) {
    const token = req.headers['x-access-token'];
    const payload = jwt.decode(token)

    if (!token) {
        return res.status(401).send('Admin token is required');
    }

    if (!verifyToken(token)) {
        return res.status(403).send('Invalid admin token');
    }

    if (!payload.admin) {
        return res.status(403).send('You are not authorized to access');
    }

    next();
}

module.exports = adminAuthMiddleware
