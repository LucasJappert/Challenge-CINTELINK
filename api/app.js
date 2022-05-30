require('dotenv').config();
const logger = require('./middlewares/logger');
const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

module.exports = app;

