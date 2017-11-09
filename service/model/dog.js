//Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create a Schema for our Dog Object.
const dogSchema = new Schema({
    name: { type: String },
    age: { type: Number },
    species: { type: String }
});

//Associate CRUD requests with schema, these functions "findOne" etc are Mongo Functions
dogSchema.statics = {
    get: function (query, callback) {
        this.findOne(query, callback);
    },
    getAll: function (callback) {
        this.find(callback);
    },
    updateByID: function (id, updateData, callback) {
        this.findOneAndUpdate({ _id: id }, updateData, { new: true }, callback);
    },
    removeByID: function (removeData, callback) {
        this.remove(removeData, callback);
    },
    create: function (data, callback) {
        const dog = new this(data);
        dog.save(callback);
    },
}
const dog = mongoose.model("dog", dogSchema);
module.exports = {
    Dog: dog
};