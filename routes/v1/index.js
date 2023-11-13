const express = require("express");
const router = express.Router();
// const adminAuthMiddleware = require('../../middleware/admin-auth.js')
const adminAuthMiddleware = require("../../models/admin-auth.js").checkToken;

/**
 * @description Collection of REST API endpoints
 */

router.use("/admin", adminAuthMiddleware, require("./admin.js"));
router.use("/bikes", require("./bikes.js"));
router.use("/cities", require("./cities.js"));
router.use("/login", require("./login.js"));
router.use("/trips", require("./trips.js"));
router.use("/users", require("./users.js"));
router.use("/zones", require("./zones.js"));

module.exports = router;
