const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const user = require('./src/routes/api/user')
var cors = require('cors');
var bodyParser = require('body-parser');


//Load Config
dotenv.config({ path: './config/config.env' });

//connectDB();

const PORT = 5000;

const app = express();
const options = {
    inflate: true,
    limit: 1000,
    extended: true,
    parameterLimit: 1,
};


app.use(bodyParser.json());
//app.use(bodyParser);


app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method"
    );
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

app.use('/api', user);


app.listen(PORT, () => {
    console.log(`Server started on the ${PORT}`)
})