//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const open = require("open");

//Express
const app = express();
const port = process.env.port || 3000;
const router = express.Router();

//Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Routing
app.use("/api/dog", router);

//Mock data instead of database
const dogs = [
    {
        id: 1,
        name: "Sir borks a lot",
        age: 3,
        species: "Pug"
    }
];

/* GET REQUESTS */
//Provide all dogs on base url of https://localhost:3000/api/dog
router.get("/", (req, res) => {
    res.json(dogs);
});

//Get a specific dog based on id provided such as /api/dog/2
router.get("/:id", (req, res) => {
    const dogID = req.params.id;
    const currentDog = dogs.find((dog) => dog.id == dogID);
    if (currentDog) {
        res.json(currentDog);
    } else {
        res.sendStatus(404);
    }
});

/* POST REQUESTS */
// Base url, takes a dog with the four attributes, checks if its valid and
// unique, then adds it to the array.
router.post("/", (req, res) => {
    const postDog = req.body;
    const isValid = isValidDog(postDog) && !dogs.find((a) => a.id == postDog.id);
    if (isValid) {
        dogs.push(postDog);
        res.send(postDog);
    } else {
        res.sendStatus(500);
    }
});

/* PUT REQUESTS */
// Take a dog object at a specific ID url e.g. /api/dog/1 Replace contents of the
// dog with that id, with the dog recieved, not including the ID.
router.put("/:id", (req, res) => {
    const dogID = req.params.id;
    const currentDog = dogs.find((dog) => dog.id == dogID);
    if (currentDog) {
        const putDog = req.body;
        const isValid = isValidDog(putDog);
        if (isValid) {
            currentDog.name = putDog.name;
            currentDog.age = putDog.age;
            currentDog.species = putDog.species;
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    }
});

/* DELETE REQUESTS */
// Doesn't take any information, a delete request at a specific ID endpoint will
// delete the object.
router.delete("/:id", (req, res) => {
    const dogID = req.params.id;
    const currentDog = dogs.findIndex((dog) => dog.id == dogID);
    if (currentDog !== -1) {
        dogs.splice(currentDog, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

//Checks if the object has all required attributes
function isValidDog(dog) {
    return "id" in dog && "name" in dog && "age" in dog && "species" in dog;
}

//Run server
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`)
    }
});
