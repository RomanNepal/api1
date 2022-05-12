const express = require('express');
const app = express();
const home_routes = require('./home.routes');
const auth_routes = require('./auth.routes');
const brand_routes = require('./brand.routes');
app.use(home_routes);
app.use(auth_routes);
app.use("/brand",brand_routes);

module.exports = app;