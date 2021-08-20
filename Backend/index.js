//Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
//Creating an app from express
const app = express();

//Getting the output as a JSON from the app
//app.use(express.json());
app.use(bodyparser.json());
app.use(cors());

app.get('/', async(req,res) => {
    res.send('Welcome to the Online Shopping Platform!!');
})

//Importing the routes
const UserRoutes = require('./routes/User');
const ProductRoutes = require('./routes/Product');
const UserDeliveryRoutes = require('./routes/UserDelivery');
const UserReport = require('./routes/UserReport');
const ProductOfferRoutes = require('./routes/ProductOffer');
const insertItemRoutes = require('./routes/Item');

//Using the routes
app.use("/user", UserRoutes);
app.use("/product", ProductRoutes);
app.use("/userdelivery", UserDeliveryRoutes);
app.use("/userreport", UserReport);
app.use("/productOffer", ProductOfferRoutes);
app.use("/insertitem", insertItemRoutes);

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

//Connection to mongoose
mongoose.connect(MONGODB_URI || '&w=majority' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}, (error) => {
    if(error) {
        console.log('Error in connection');
    }
})

mongoose.connection.once('open', () => {
    console.log('Database Synched!!');
})

//Running on the server
app.listen(PORT,() => {
    console.log(`Server is started and running on ${PORT}`);
});

module.exports = app;

