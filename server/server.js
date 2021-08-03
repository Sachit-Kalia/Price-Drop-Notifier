const express = require("express");
const app = express();
const morgan = require("morgan");
var cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const user = require("./routes/user");
const product = require("./routes/product");



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(cors({origin : "*"}));

app.use("/user", user);
app.use("/product", product);



const port = process.env.PORT || 3000;


connectDB()
.then(()=>{
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
}).catch((err)=>{
    console.log(err);
});

