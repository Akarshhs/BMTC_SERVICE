const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const user = require('./src/routes/api/user');
const conductor = require('./src/routes/api/conductor')
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');


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



app.use(morgan(':method :status :url'))
app.use('/api/user', user);
app.use('/api/bus', conductor);


app.listen(PORT, () => {
    console.log(`Server started on the ${PORT}`)
})