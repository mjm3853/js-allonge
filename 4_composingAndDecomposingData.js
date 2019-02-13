// @ts-nocheck
// Recursion is the root of computation since it trades description for time.
// —Alan Perlis

// Ordered collections are a fundamental abstraction for
// making sense of reality

const wrap = (something) => [something];

console.log(wrap('sandwich'));

// the array can be destructured with the template on the left
// and value on the right
const unwrap = (wrapped) => {
    const [something] = wrapped;

    return something;
}

console.log(unwrap(['present']));

// destructuring is code that resembles the data it consumes

const surname = (name) => {
    const [first, last] = name;

    return last;
}

console.log(surname(['Reginald', 'Braithwaite']));

// gathering extracts arrays from arrays

const [first, ...butFirst] = [1, 2, 3, 4, 5];

console.log(first, butFirst);

// gathering works with parameters

const numbers = (...nums) => nums;

console.log(numbers(1, 2, 3, 4, 5));

// Self-similarity

// A list is:
// - Empty; or
// - Consists of an element concatenated with a list

const list1 = [];
const list2 = ['baz', ...[]];
const list3 = ['foo', ...['bar', 'baz']];

console.log(list3);

const [firstOne, ...rest] = ['foo', 'bar', 'baz'];

console.log(firstOne);
console.log(...rest);

// finding the length of an array, in a cool way

const lengthOfArray = ([first, ...rest]) =>
    first === undefined ?
    0 :
    1 + lengthOfArray(rest);

console.log(lengthOfArray([1, 2, 3]))
console.log(lengthOfArray([1]));

// recursion party trick.

// recursion problem solving
// - 1 - divide the problem into smaller problems
// - 2 - if the smaller problem is solvable, solve
// - 3 - if the smaller problem is not solvable, divide and conquer that problem
// - 4 - when all small problems have been solved, compose into one big solution

// term = linear recursion

// test for the terminal case

// example: flatten an array - turn array of arrays into one array of elements that are not arrays
// problems to solve:
// - is something an array
// - extract element from array
// - add element to new array
// - go through array in order

// terminal case:
// - do nothing with empty array
// - if element is not an array, add to new array
// - if element is an array, flatten by checking the inner arrays elements

const flatten = ([first, ...rest]) => {
    if (first === undefined) {
        return [];
    } else if (!Array.isArray(first)) {
        return [first, ...flatten(rest)];
    } else {
        return [...flatten(first), ...flatten(rest)]
    }
}

console.log(flatten(['foo', [1, 2, 'bar'],
    ['3', 5]
]));

// map - apply a function to all elements of an array
// terminal cases:
// - do nothing with empty array
// - apply function to first element
// - continue to next element

const mapWith = (fn, [first, ...rest]) =>
    first === undefined ? [] : [fn(first), ...mapWith(fn, rest)];

const makeSquare = (x) => x * x;
const makeNonNumberNull = (x) => isNaN(x) ? null : x;

const compose = (a, b) => (c) => a(b(c));

console.log(mapWith(compose(makeNonNumberNull, makeSquare), [1, 2, 4, 'a']));

// folding - generalization of mapping

const foldWith = (fn, terminalValue, [first, ...rest]) =>
    first === undefined ?
    terminalValue :
    fn(first, foldWith(fn, terminalValue, rest));


const squareAll = (array) => foldWith((first, rest) => [first * first, ...rest], [], array);

console.log(squareAll([1, 3, 7]));

// tail-call optimization
// - 'tail-call' occurs when a functions last act is to invoke another function
// -- and then return whatever the other function returns
// - allows JS to throw away current stack frame once arguments are figured
// - when 'non-tail-call' optimized, the function must keep track of all the steps/data to complete the function

// from stack overflow

// - without optimization
/* 

(fact 3)
(* 3 (fact 2))
(* 3 (* 2 (fact 1)))
(* 3 (* 2 (* 1 (fact 0))))
(* 3 (* 2 (* 1 1)))
(* 3 (* 2 1))
(* 3 2)
6 

*/

const length = ([first, ...rest]) =>
    first === undefined ?
    0 :
    // hanging calculation
    1 + length(rest);

// - with optimization
/*

(fact 3)
(fact-tail 3 1)
(fact-tail 2 3)
(fact-tail 1 6)
(fact-tail 0 6)
6 

*/

const lengthOptimized = ([first, ...rest], numberToBeAdded) =>
    first === undefined ?
    0 + numberToBeAdded :
    // calculation within parameter
    lengthOptimized(rest, 1 + numberToBeAdded);


console.log(length([1, 2, 3]));
console.log(lengthOptimized([1, 2, 4], 0));