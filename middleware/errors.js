/**
 *
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).send("Something broke!");
}

export default errorHandler;
