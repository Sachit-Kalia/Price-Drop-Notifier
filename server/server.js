const express = require("express");
const app = express();
const morgan = require("morgan");
var cors = require("cors");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const connectDB = require("./config/db");

connectDB();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/user", user);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
