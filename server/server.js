const express = require("express");
const app = express();
const morgan = require("morgan");
var cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/products", (req, res) => {
  console.log("request on products route: ", req.body.test);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
