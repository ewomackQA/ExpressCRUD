//Import the Dog Model, along with its CRUD Methods.
const Dog = require("../model/dog").Dog;

// POST Request, call the Create method in Dog Model, return data created to user.
exports.create = (req, res) => {
    Dog.create(req.body, (err, result) => {
        if (err) { return res.send(err); }
        else { return res.json(result); }
    });
};

// GET Request, call the Get method in Dog Model, return specific dog
exports.get = (req, res) => {
    Dog.get({ _id: req.params.id }, (err, result) => {
        if (err) { return res.send(err); }
        else { return res.json(result); }
    });
};

// GET-ALL Request, call the GetAll method in Dog Model, return all dogs
exports.getAll = (req, res) => {
    Dog.getAll((err, result) => {
        if (err) { return res.send(err); }
        else { return res.json(result); }
    });
};

// PUT/Update Request, call the updateByID method in Dog Model, return updated dog
exports.update = (req, res) => {
    Dog.updateByID(req.params.id, req.body, (err, result) => {
        if (err) { return res.send(err); }
        else { return res.json(result); }
    });
};

//DELETE/Remove Request, call removebyID method in Dog Model, return success message.
exports.delete = (req, res) => {
    Dog.removeByID({ _id: req.params.id }, (err, result) => {
        if (err) { return res.send(err); }
        else { return res.json(result); }
    });
};