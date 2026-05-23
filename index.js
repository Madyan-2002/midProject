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
const cartRoute = require('./routes/cart_route');




require('dotenv').config();
const port = process.env.PORT || 3000;
const api = process.env.API_URL;
connectDb();


app.use(express.json());
app.use(bodyParser.json());
app.use(`${api}/users`, userRoute);
app.use(`${api}/products`, productRoute);
app.use(`${api}/categories`, categoryRoute);
app.use(`${api}/carts`, cartRoute);

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

app.listen(port, () => {
  console.log(`midProject app running on port ${port}`);
});