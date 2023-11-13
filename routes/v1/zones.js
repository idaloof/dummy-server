import express from "express";
import zonesModel from "../../models/zones.js";

const router = express.Router();

/**
 * Note to self:
 * Wrappa hämtningarna i en try catch där catch pekar
 * mot felhanterings-middleware med hjälp av next
 * Tänk på payload/token
 */

/**
 * @description Route for getting all zones
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
router.get("/", (req, res, next) => {
    zonesModel.getAllZones(res, next);
});

/**
 * @description Route for getting one zone
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
router.get("/:id", (req, res, next) => {
    const zoneId = req.params.id;

    zonesModel.getOneZone(zoneId, res, next);
});

/**
 * @description Route for inserting a zone
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Function} next Next function
 *
 * @returns {void}
 */
router.post("/", (req, res, next) => {
    zonesModel.insertZone(req, res, next);
});

export default router;
