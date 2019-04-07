// RECIPE = mapWith
const mapWith = (fn) => (list) => list.map(fn);

const squaresOf = mapWith(n => n * n);
console.log(squaresOf([1, 3, 5, 7, 9]));

// RECIPE = flip
const flip = (fn) =>
    function (first, second) {
        if (arguments.length === 2) {
            return fn.call(this, second, first);
        } else {
            return function (second) {
                return fn.call(this, second, first);
            }
        }
    }