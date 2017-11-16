//Dependencies
const mongoose = require("mongoose");

//Connect to DB
mongoose.connect("mongodb://localhost/testDB", { useMongoClient: true });
const db = mongoose.connection;

//If an error occurs, output the error
db.on("error", console.error.bind(console, "connection error"));

//once the connection is connected, output that it has.
db.once("open", () => {
    console.log("Connection with database succeeded.");
});

exports.db = db;