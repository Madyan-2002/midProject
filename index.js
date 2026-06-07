const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDb = require('./config/db');
const bodyParser = require('body-parser');
const authJwt = require('./helper/jwt');
const errorHandler = require('./helper/error_handler');
const unless = require('express-unless');

// Routes
const userRoute = require('./routes/user_route');
const productRoute = require('./routes/product_route');
const categoryRoute = require('./routes/category_route');
const orderRoute = require('./routes/order_route');


// Load environment variables
require('dotenv').config();
const port = process.env.PORT || 3000;
const api = process.env.API_URL;
connectDb();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(`${api}/users`, userRoute);
app.use(`${api}/products`, productRoute);
app.use(`${api}/categories`, categoryRoute);
app.use(`${api}/order`, orderRoute);

//middleware
app.use(authJwt.unless({
  path: [
    `${api}/users/login`,
    `${api}/users/register`,
    `${api}/products`,
  ]
}));
// app.use(authJwt);
app.use(errorHandler);


// Start the server
app.listen(port, () => {
  console.log(`midProject app running on port ${port}`);
});