function log(x) {
    console.log(x);
}

//----

const array = [0, 1, 2, 3];

for (let i = 0; i < array.length; ++i) {
    log(i);
};

//----

let arr1 = [0, 1, 2];

const arr2 = [3, 4, 5];

arr1 = [...arr2, ...arr1];

log(arr1);

//----

function sum(x, y, z) {
    return x + y + z;
}

const numbers = [1, 2, 3, 4, 5];

log(sum(...numbers));