const express = require('express');
const app = express();
const home_routes = require('./home.routes');
const auth_routes = require('./auth.routes');
const brand_routes = require('./brand.routes');
const user_routes = require('./user.routes');
app.use(home_routes);
app.use(auth_routes);
app.use("/brand",brand_routes);
app.use("/user", user_routes);

module.exports = app;