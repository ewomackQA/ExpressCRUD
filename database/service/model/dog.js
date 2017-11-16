//Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a Schema for our Dog Object. Our dog is going to have a name, which
// will be a string. An age, which will be a number. A species, which will be a
// string.
const dogSchema = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    species: {
        type: String
    }
});

// Associate CRUD requests with schema, these functions "findOne" etc are
// MongoDB functions to access the DB
dogSchema.statics = {
    //Takes an object that has an ID, returns the object that has that ID.
    get: function (query, callback) {
        this.findOne(query, callback);
    },
    //Retrieves all dogs.
    getAll: function (callback) {
        this.find(callback);
    },
    //Takes an ID to update by and the data you want to replace the old data with.
    updateByID: function (id, updateData, callback) {
        this.findOneAndUpdate({
            _id: id
        }, updateData, callback);
    },
    // Takes an object that has an ID of the object you want to remove, then removes
    // it.
    removeByID: function (removeData, callback) {
        this.remove(removeData, callback);
    },
    // Takes an object (from the request body) of an object you want to create,
    // creates a dog using the model constructor, then saves it into the database.
    create: function (data, callback) {
        const dog = new this(data);
        dog.save(callback);
    }
}
//Creates the model from the schema
const dog = mongoose.model("dog", dogSchema);
module.exports = {
    Dog: dog
};