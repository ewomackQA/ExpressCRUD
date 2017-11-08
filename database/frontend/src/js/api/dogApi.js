const baseUrl = "http://localhost:3000/api/";

let onSuccess = (response) => {
    return response.json();
};
let onError = (error) => {
    console.log(error);
};

function get(url) {
    return fetch(baseUrl + url).then(onSuccess, onError);
}
function del(url) {
    const request = new Request(baseUrl + url, {
        method: "DELETE"
    });
    return fetch(request).then(onSuccess, onError);
}
function create(dog, url) {
    const request = new Request(baseUrl + url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dog)
    });
    return fetch(request).then(onSuccess, onError);
}

export function createDog(dog) {
    return create(dog, "dog");
}
export function getDogs() {
    return get("dog");
}
export function deleteDog(id) {
    return del(`dog/${id}`);
}
