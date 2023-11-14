/**
 *
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json({
        errors: "Something broke!"
    });
}

export default errorHandler;
