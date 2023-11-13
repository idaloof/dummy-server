const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const { default: errorHandler } = require("./middleware/errors.js");

const app = express();
const port = 1338;

app.use(morgan("combined"));

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Här kan vi lägga in en middleware för att kolla API-nyckel?

app.use("/v1", require("./routes/v1/index.js"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
