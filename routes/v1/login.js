import express from "express";
import adminAuthModel from "../../models/admin-auth.js";

const router = express.Router();

/**
 * Note to self:
 * Wrappa hämtningarna i en try catch där catch pekar
 * mot felhanterings-middleware med hjälp av next
 */

/**
 * @description Admin login route
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
router.post("/admin", (req, res) => {
    adminAuthModel.login(req, res);
});

export default router;
