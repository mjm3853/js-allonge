// Functions represent computations to be performed

// Using Node REPL

// Functions are applied to zero or more values called arguments

// When we want undefined
void 0;

// Function can return result of evaluating a block
// where a block is a list of JS statements escaped by semicolons

// JS uses the 'call by value' evaluation strategy

(value) => ((ref1, ref2) => ref1 === ref2)(value, value);

// Functions containing no free vars are pure functions

() => {};

(x) => x;

// -- A pure function can contain a closure

(x) => (y) => x;

// Functions containing one or more free variables are closures
let x;

(y) => x;

// -- Closures are harder to understand without knowing the free variable

// All functions are associated with an environment

(x) => (y) => (z) => x + y + z;

(x, y, z) => x + y + z;

// Currying - is a way of translating a function that takes
// multiple arguments into evaluating a sequence of functions
// each with a single argument

// Environments. JS has a global environment at the root.
// Devs can insert an empty enviroment with an iife:

(() => {})();

((PI) => (diameter) => diameter * PI)(3.14159265)(5);

((diameter) => ((PI) => diameter * PI)(3.14159265))(2);

((diameter) => {
    const PI = 3.14159264;
    return diameter * PI;
})(2);

((d) => {
    const calc = (diameter) => {
        const PI = 3.14159246;
        return diameter * PI;
    };

    return `The circumference is ${calc(d)}`;
})(2);

((d) => {
    const PI = 3.14159264,
        calc = (diameter) => diameter * PI;

    return `The circumference is ${calc(d)}`;
})(2);

//------------

console.log(((n) => {
    const even = (x) => {
        if (x === 0) {
            return true;

        } else {
            // returns the opposite of the final
            // recursive iteration.
            // true for even, false for odd
            return !even(x - 1);
        }
    }
    return even(n);
})(2));

//------------

// Start thinking from zero up
// For zero, returns true right away
// For 1, goes to odd(0) which is !even(0) which is false
// For 2 goes to odd(1) which is !even(1)
// - which goes to !odd(0) which is !!even(0)
// - which goes to true

console.log(((n) => {
    const even = (x) => {
        if (x === 0)
            return true;
        else {
            const odd = (y) => !even(y);
            return odd(x - 1);
        }
    }
    return even(n);
})(42));

//--------------

console.log(((diameter_fn) =>
    diameter_fn(2)
)(
    ((PI) =>
        (diameter) => diameter * PI
    )(3.14159265)
));

//---
// higher order functions
//---

const repeat = (num, fn) =>
    (num > 0) ? (repeat(num - 1, fn), fn(num)) :
    undefined;

console.log(repeat(5, (n) => console.log(`hello ${n}`)));

//--- combinators - take only functions as args and return a function

const compose = (a, b) => (c) => a(b(c));

const addOne = (number) => number + 1;
const doubleOf = (number) => number * 2;

const doubleOfAddOne = (number) => doubleOf(addOne(number));

// or

const doubleOfAddOneComposed = compose(doubleOf, addOne);

console.log(doubleOfAddOneComposed(2));

//--- function decorators - takes one function as an arg, returns a function that is variation of arg

const not = (fn) => (x) => !fn(x);
const something = (x) => x != null;
const nothing = x => !something(x);

// or

const nothingDecorated = (x) => !something(x);

// or

const nothing2 = not(something);

//---
// Building Blocks
//---

//--- composition

const cookAndEat = (food) => (eat(cook(food)));

const eat = (food) => !food;

const cook = (food) => food;

const cookAndEatCompose = compose(eat, cook);

// the trick - writing functions that can be composed

//--- partial application

// generally a function is applied to any arguments to produce a value
// if we do not supply all arguments, we cannot get the final value
// - but we can get a function to represent part of our application

const map = (a, fn) => a.map(fn);

// applies only the 2nd argument

const squareAll = (array) => map(array, (n) => n * n);

const mapWith = (fn) => (array) => map(array, fn);

const squareAllPartial = mapWith((n) => n * n);

console.log(squareAllPartial([1, 2, 3]));

//---
// Magic Names
//---

const plus = function (a, b) {
    return arguments[0] + arguments[1];
}

console.log(plus(4, 8));

const letSee = function () {
    return arguments.length;
}

console.log(letSee(5, 8));