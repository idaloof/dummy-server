/**
 *
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
function errorHandler(err, req, res) {
    console.error(err);
    res.status(500).send("Something broke!");
}

export default errorHandler;
