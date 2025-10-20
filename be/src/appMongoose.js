const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.DB_URL;

const DB_NAME = "library-app";

const connectdb = async() => {
    try {
        await mongoose.connect(`${DB_URL}/${DB_NAME}`);
        console.log("Database connected successfully");
    } catch (err) {
        console.error(err);
    }
};

connectdb();

module.exports = {};