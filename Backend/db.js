const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('dotenv').config()
const mongoURI = process.env.MONGODB_URI

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=> {
        console.log("Connected")
    })
}

module.exports = connectToMongo