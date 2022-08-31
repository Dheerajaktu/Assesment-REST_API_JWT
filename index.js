const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;
const mongoose = require('./database/db-mogoose');
const bodyParser = require('body-parser');
const { json } = require('express');
// const token = require('./auth/tokenDecode');
dotenv.config();
app.use(express.json());



// app.use(token);
app.use(require('./router/r-index'));
app.use(express.urlencoded({ extended: false }));




app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
})





