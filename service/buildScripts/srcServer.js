//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const open = require("open");


//Express
const app = express();
const port = process.env.port || 3000;
const router = express.Router();

//Mongo
const db = require("../config/db");
const Dog = require("../controller/dog");

//Middleware
//Parse req.body automatically, reducing the amount of parsing needed.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Enable requests from client webs
app.use(function (req, res, next) {
    //Determine which domain can make requests, in this case everything. (BIG SECURITY FLAW)
    res.header("Access-Control-Allow-Origin", "*");
    //Determine which headers are allowed.
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //Determine which requests are allowed.
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
//Routing
app.use("/", router);

/* GET REQUESTS */
//Provide all dogs on base url of https://localhost:3000/api/dog
router.get("/api/dog", Dog.getAll);

//Get a specific dog based on id provided 
//such as /api/dog/2
router.get("/api/dog/:id", Dog.get);

/* POST REQUESTS */
//Base url, takes a dog with the four attributes, checks if its valid and unique, then adds it to the array.
router.post("/api/dog/", Dog.create);

/* PUT REQUESTS */
//Take a dog object at a specific ID url e.g. /api/dog/1
//Replace contents of the dog with that id, with the dog recieved, not including the ID.
router.put("/api/dog/:id", Dog.update);

/* DELETE REQUESTS */
//Doesn't take any information, a delete request at a specific ID endpoint will delete the object.
router.delete("/api/dog/:id", Dog.delete);

//Run server, open browser.
app.listen(port, (err) => {
    if (err) { console.log(err); }
    else { open(`http://localhost:${port}`) }
});

