const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDb = require('./config/db');

// Routes
const userRoute = require('./routes/user_route');
const productRoute = require('./routes/product_route');



require('dotenv').config();
const port = process.env.PORT || 3000;
const api = process.env.API_URL;
connectDb();


app.use(express.json());
app.use(`${api}/users`, userRoute);
app.use(`${api}/products`, productRoute);

app.listen(port, () => {
  console.log(`midProject app running on port ${port}`);
});