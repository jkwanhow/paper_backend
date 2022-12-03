const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const env_variables = process.env;

//------- Leave imports above ------


//------- Host backend ----

const app = express();

// ---- session ----
// information can be found on `https://github.com/expressjs/session#compatible-session-stores`
app.use(session({
    secret: '514v3k41ib4n', //secret used to sign session/token
    resave: false, //resave forces session to be saved back to the session store. even if not modified
    saveUninitialized: false, //forces a uninitialised session to be saved to the store.
    //Session is unintialised when it is new, but not modified
    cookie: { secure: false}, //when true, compliant clients will not send back unless https,
    //set secure true once https is set up!
}));

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200, credentials: true }));
app.use(passport.initialize());
app.use(passport.session());

// ---- Database -----
const uri = `mongodb+srv://${env_variables.DB_username}:${env_variables.DB_password}@${env_variables.DB_domain}`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology:true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// -------------------------
app.use(require('body-parser').urlencoded({ extended: false }));

const port = 8080;

var mainRouter = require('./routes/main.routes');


app.listen(port, () => {
    console.log(`Backend app running on port ${port}`);
});

app.use('/api', mainRouter);

module.exports = app;