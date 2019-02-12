// !!! RECIPES !!!
// Search `Recipe =` to go to each one

// Recipe = PARTIAL APPLICATION
// - takes a function with multiple params and returns a function with fewer params

// Calls the given function with last arg first
const callFirst = (fn, leftArg) =>
    function (...rest) {
        return fn.call(this, leftArg, ...rest);
    };

// Calls the given function with the first arg first
const callLast = (fn, rightArg) =>
    function (...rest) {
        return fn.call(this, ...rest, rightArg);
    };

const greet = (me, you) => `Hello, ${you}, my name is ${me}`;

const heliosSaysHello = callFirst(greet, 'Helios');

// Calls greet() with outer arg first, then inner 
// so outer arg, me, is greeted by inner arg, you
console.log(heliosSaysHello('Eartha'));

const sayHelloToCeline = callLast(greet, 'Celine');

// Calls greet() with inner arg first, then outer arg
// so outer arg, me, greets inner arg, you
console.log(sayHelloToCeline('Eartha'));

//---

/**
 * callLeft is a partial application that binds arguments
 * starting on the left side of a given function
 * @param {*} fn 
 * @param  {...any} args 
 */
const callLeft = (fn, ...args) =>
    (...remainingArgs) => {
        fn(...args, ...remainingArgs);
    };

/**
 * callRight is a partial application function that binds arguments
 * starting from the right side of a given function
 * @param {*} fn 
 * @param  {...any} args 
 */
const callRight = (fn, ...args) =>
    (...remainingArgs) => {
        fn(...remainingArgs, ...args);
    };

//---

// Recipe = UNARY
// - decorator modifying the number of arguments of a function
// - turns any function into one that takes only 1 argument

// Example where JS functions like map actually take many args

[1, 2, 3].map(function (element, index, arr) {
    console.log({
        element: element,
        index: index,
        arr: arr
    });
});

// parseInt has a 2nd arg, and interprets the map index as that 2nd arg
console.log(['1', '2', '3'].map(parseInt));

//---

/**
 * Unary is a decorator that turns any function into a function
 * that only takes 1 argument
 * @param {*} fn 
 */
const unary = (fn) =>
    fn.length === 1 ? fn : function (something) {
        return fn.call(this, something);
    };

//---

console.log(['1', '2', '3'].map(unary(parseInt)));

//---

// Recipe = TAP
// - K Combinator

const K = (x) => (y) => x;

// do something with a value for side effects but keep the value around

/**
 * Tap takes a value and returns a function that always
 * returns that value unless you pass in a function, then
 * it executes the function for side effects.
 * Useful for debugging
 * @param {*} value 
 */
const tap = (value) =>
    (fn) => (
        typeof (fn) === 'function' && fn(value),
        value
    );

const espressoExample = tap('espresso')((it) => {
    console.log(`Our drink is '${it}'`)
});

console.log(espressoExample);

const espressoExample2 = tap('espresso')();

console.log(espressoExample2);

const tap2 = (value, fn) => {
    const curried = (fn) => (
        typeof (fn) === 'function' && fn(value),
        value
    );

    return fn === undefined ? curried : curried(fn);
}

let espresso2Example = tap2('espresso')((it) => {
    console.log(`The drink is '${it}'`);
});

console.log(espresso2Example);

let espresso2Example2 = tap2('espresso', (it) => {
    console.log(`The drink really is '${it}'`)
});

console.log(espresso2Example2);

// Recipe = MAYBE
// - Do nothing if a parameter is nothing
// - Nothing could be null or undefined

const isSomething = (value) =>
    value !== null && value !== void 0;

const checksForSomething = (value) => {
    if (isSomething(value)) {
        // function logic
    }
};

/**
 * Maybe is a decorator that does nothing when a parameter is nothing
 * Nothing is defined as null or undefined
 * @param {*} fn 
 */
const maybe = (fn) =>
    function (...args) {
        if (args.length === 0) {
            return
        } else {
            for (let arg of args) {
                if (arg == null) return;
            }
        }
        return fn.apply(this, args)
    };

const maybe1 = maybe((a, b, c) => a + b + c)(1, 2, 3);

console.log(maybe1);

const maybe2 = maybe((a, b, c) => a + b + c)(1, null, 3);

console.log(maybe2);

const withoutMaybe = ((a, b, c) => a + b + c)(1, null, 3);

console.log(withoutMaybe);

//---

// Recipe = ONCE

const once = (fn) => {
    let done = false;

    return function () {
        return done ? void 0 : ((done = true), fn.apply(this, arguments))
    }
};

const askedOnABlindDate = once(
    () => "sure, why not?"
);

//---

const repeater = (num, fn) =>
    (num > 0) ? (repeater(num - 1, fn), fn(num)) :
    undefined;

repeater(5, () => console.log(askedOnABlindDate()));

//---
// Recipe = Left-Variadic Functions
// - Accepts variable number of parameters
// - Useful for certain destructuring algorithms

// Right-variadic comes out of the box with ...param
const abccc = (a, b, ...c) => {
    console.log(a);
    console.log(b);
    console.log(c);
}

abccc(1, 2, 3, 4, 5)

function team(coach, captain, ...players) {
    console.log(`${captain} (captain)`);
    for (let player of players) {
        console.log(player);
    }
    console.log(`squad coached by ${coach}`);
}

team('Luis Enrique', 'Xavi Hernández', 'Marc-André ter Stegen',
    'Martín Montoya', 'Gerard Piqué');

// Note - JS only lets you gather params from end of the param list

/**
 * leftVariadic is a decorator that turns any function into a function
 * that gathers parameters from the left instead of from the right
 * @param {*} fn 
 */
const leftVariadic = (fn) => {
    if (fn.length < 1) {
        return fn
    } else {
        return function (...args) {
            const gathered = args.slice(0, args.length - fn.length + 1),
                spread = args.slice(args.length - fn.length + 1);

            return fn.apply(this, [gathered].concat(spread));
        }
    }
}

const butLastAndLast = leftVariadic((butLast, last) => [butLast, last]);

console.log(butLastAndLast('why', 'hello', 'there', 'little', 'droid'));

const leftGather = (outputArrayLength) => {
    return function (inputArray) {
        return [inputArray.slice(0, inputArray.length - outputArrayLength + 1)].concat(
            inputArray.slice(inputArray.length - outputArrayLength + 1)
        )
    }
};

const [butLast, last] = leftGather(2)(['why', 'hello', 'there', 'little', 'droid'])

console.log([butLast, last]);

// Recipe = COMPOSE and PIPELINE

const compose = (a, b) => (c) => (a(b(c)));

const compose3 = (a, b, c) => (d) => a(b(c(d)));

// or

const compose3Again = (a, b, c) => compose(a(compose(b, c)));

// Implement variadic compose recursively

/**
 * superCompose composes a series of functions together, creating a new one
 * @param {*} a 
 * @param  {...any} rest 
 */
const superCompose = (a, ...rest) =>
    rest.length === 0 ?
    a :
    (c) => a(compose(...rest)(c))

// compose is helpful when defining a new function that combines the effects of existing functions

// Pipeline is similar to compose, but more explicit about order of operations

/**
 * Pipeline applies operations in order on a given value
 * @param  {...any} fns 
 */
const pipeline = (...fns) =>
    (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

const addOne = (value) => value + 1;
const doubleIt = (value) => value * 2;

console.log(pipeline(addOne, doubleIt)(2));
