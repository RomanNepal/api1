const express = require('express');
const app = express();
const home_routes = require('./home.routes');
const auth_routes = require('./auth.routes');
const label_routes = require('./label.routes');
const user_routes = require('./user.routes');
const category_routes = require('./category.routes')
app.use(home_routes);
app.use(auth_routes);
app.use("/label",label_routes);
app.use("/user",user_routes);
app.use("/category", category_routes);

module.exports = app;