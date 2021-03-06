const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);
const app = express();
const logger = require("morgan")("tiny");
require("./config/passport")(passport);
const configDB = require("./config/database");
mongoose.connect(configDB.url);
const db = mongoose.connection;


app.use(express.static("public"));

app.use(session({
    secret: "super-puper-secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(flash());
app.use(logger);

app.use("/", require("./routes"));

const server = app.listen(3000);
console.log("Server is running on port 3000");
