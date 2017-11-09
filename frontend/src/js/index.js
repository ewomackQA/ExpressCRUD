//Imports
import { getDogs, deleteDog, createDog, updateDog } from "./api/dogApi.js"

//Ran when they select an X on a table element, will submit a DELETE request and remove them from the table.
function deleteDogFromTableAndDB(event) {
    const element = event.target;
    event.preventDefault();
    deleteDog(element.attributes["data-id"].value);
    const row = element.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
function updateDogFromTable(event) {
    const element = event.target;
    event.preventDefault();
    const id = element.attributes["data-id"].value;
    document.getElementById("idStore").value = id;
    addToInput(getDogByID(id));
    const row = element.parentNode.parentNode;
    row.parentNode.removeChild(row);
    //getDogs().then(loadDogsToScreen);
}

//Given an array of dogs, output them all to the table and apply delete events.
function loadDogsToScreen(dogList) {
    //output dogs to table
    let dogsBody = "";
    dogList.forEach((dog) => {
        dogsBody += createTableDataFromDog(dog);
    });
    document.getElementById("dogDetails").innerHTML = dogsBody;
    applyDeleteEvents();
    applyUpdateEvents();
}

//Go through all the elements in the table that have the deleteDog tag, give them the event to delete themselves.
function applyDeleteEvents() {
    //find all elements that have the classname "deleteDog" and give them onclick events to delete them.
    const deleteLinks = document.getElementsByClassName("deleteDog");
    Array.from(deleteLinks, (link) => {
        link.onclick = deleteDogFromTableAndDB;
    });
}

function applyUpdateEvents() {
    const updateLinks = document.getElementsByClassName("updateDog");
    Array.from(updateLinks, (link) => {
        link.onclick = updateDogFromTable;
    })
}

//Given a dog object, create HTML for it in the table.
function createTableDataFromDog({ _id, name, age, species }) {
    return `
    <tr>
        <td> <a href = "#" data-id="${_id}" class="deleteDog"> X </a> </td>
        <td id="${_id}name">${name}</td>
        <td id="${_id}age">${age}</td>
        <td id="${_id}species">${species}</td>
        <td> <a href = "#" data-id="${_id}" class="updateDog"> U </a> </td>
    </tr>`
}

//Get dog inputs from text boxes, then clear the text boxes, check if the inputs were all filled, submit a post request, get the result, append result to page.
function createAndAppendDog() {
    const dogInput = getDogFromInputs();
    clearInputs();
    if (isValidDog(dogInput)) {
        Promise.resolve(createDog(dogInput)).then((newDog) => {
            document.getElementById("dogDetails").innerHTML += createTableDataFromDog(newDog);
            applyDeleteEvents();
            applyUpdateEvents();
        });
    }
}

function updateAndAppendDog() {
    const dogInput = getDogFromInputs();
    const dogID = document.getElementById("idStore").value;
    clearInputs();
    if (isValidDog(dogInput)) {
        Promise.resolve(updateDog(dogInput, dogID)).then((updatedDog) => {
            document.getElementById("dogDetails").innerHTML += createTableDataFromDog(updatedDog);
            applyDeleteEvents();
            applyUpdateEvents();
        })
    }
}

function getDogByID(_id) {
    let dogName = document.getElementById(`${_id}name`).innerHTML;
    let dogAge = document.getElementById(`${_id}age`).innerHTML;
    let dogSpecies = document.getElementById(`${_id}species`).innerHTML;
    return {
        id: _id,
        name: dogName,
        age: dogAge,
        species: dogSpecies
    }
}

function addToInput(dog) {
    document.getElementById("inputDogName").value = dog.name;
    document.getElementById("inputDogAge").value = dog.age;
    document.getElementById("inputDogSpecies").value = dog.species;
}

//Checks if a dog has all the valid fields
function isValidDog(dog) {
    return dog.name && dog.age && dog.species;
}

//Clears the textboxes
function clearInputs() {
    document.getElementById("inputDogName").value = "";
    document.getElementById("inputDogAge").value = "";
    document.getElementById("inputDogSpecies").value = "";
}

//Returns an object comprised of the data from the textboxes
function getDogFromInputs() {
    return {
        name: document.getElementById("inputDogName").value,
        age: document.getElementById("inputDogAge").value,
        species: document.getElementById("inputDogSpecies").value
    }
}

//Expose the createAndAppendDog function for the button, otherwise it's stuck in here because of modules.
window.createAndAppendDog = createAndAppendDog;
window.updateAndAppendDog = updateAndAppendDog;

//On page load, load all dogs.
window.onload = function () {
    //load dogs into table, including delete events set to each element.
    const dogList = getDogs().then(loadDogsToScreen);
}



