const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const env_variables = process.env;

//------- Leave imports above ------


//------- Host backend ----

const app = express();

// ---- Database -----
const uri = `mongodb+srv://${env_variables.DB_username}:${env_variables.DB_password}@${env_variables.DB_domain}`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology:true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// -------------------------
const port = 8080;

var mainRouter = require('./routes/main.routes');


app.listen(port, () => {
    console.log(`Backend app running on port ${port}`);
});

app.use('/api', mainRouter);

module.exports = app;