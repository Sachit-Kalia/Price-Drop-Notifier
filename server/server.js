const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const cors = require('cors');

const app = express();



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({origin : "*"}));

app.post('/products', (req,res)=>{
     console.log('request on products route: ', req.body.test);
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})