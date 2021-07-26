const express = require("express");
const app = express();
const morgan = require("morgan");
var cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const user = require("./routes/user");



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(cors({origin : "*"}));

app.use("/user", user);

app.post("/products", (req, res) => {
  console.log("request on products route: ", req.body.test);
});

// app.post("/login", (req,res)=>{
//   console.log("request from login route: ", req.body.test);
// });

const port = process.env.PORT || 8000;


connectDB()
.then(()=>{
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
}).catch((err)=>{
    console.log(err);
});

