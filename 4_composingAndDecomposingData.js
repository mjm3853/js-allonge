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

const lengthNotOptimized = ([first, ...rest]) =>
    first === undefined ?
    0 :
    // hanging calculation
    1 + lengthNotOptimized(rest);

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
    numberToBeAdded :
    // calculation within parameter before recursive function is called
    lengthOptimized(rest, 1 + numberToBeAdded);


console.log(lengthNotOptimized([1, 2, 3]));
console.log(lengthOptimized([1, 2, 4], 0));

// Can use partial application to abstract away numberToBeAdded

const callLast = (fn, ...args) =>
    (...remainingArgs) =>
    fn(...remainingArgs, ...args);

const length = callLast(lengthOptimized, 0);

console.log(length([1, 3, 4, 5, 6, 7]));

const mapWithOptimized = (fn, [first, ...rest], prepend) =>
    first === undefined ?
    prepend :
    mapWithOptimized(fn, rest, [...prepend, fn(first)]);

const mapWithPartial = callLast(mapWithOptimized, []);

console.log(mapWithPartial((x) => x * x, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
    70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
    80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
    90, 91, 92, 93, 94, 95, 96, 97, 98, 99
]));

// factorials

const factorialOptimized = (n, work) =>
    n === 1 ?
    work :
    factorialOptimized(n - 1, n * work);

const factorial = callLast(factorialOptimized, 1);

console.log(factorial(5));

// default arguments

const factorialDefault = (n, work = 1) =>
    n === 1 ?
    work :
    factorialDefault(n - 1, n * work);

console.log(factorialDefault(6));

// default destructuring arguments

const [firstTwo, secondTwo = "two"] = ["primus", "secundus"];

console.log(`${firstTwo} . ${secondTwo}`);

// LISP cons cells

const cons = (a, d) => [a, d];
const car = ([a, d]) => a;
const cdr = ([a, d]) => d;

const oneToFive = cons(1, (cons(2, cons(3, cons(4, cons(5, null))))));

console.log(oneToFive);

// actually a linked list

const node5 = [5, null],
    node4 = [4, node5],
    node3 = [3, node4],
    node2 = [2, node3],
    node1 = [1, node2];

console.log(node1);

console.log(car(oneToFive));
console.log(cdr(oneToFive));

// [first, ...rest] emulates semantics of car, cdr, but not the implementation
// - Lisp and others had lists operating in hardware
// - JS arrays are slower than making everything a linked list for some things
// - Linked list is perfect for first, ...rest
// - Arrays better for iterating over, changing values, and fetching if array is indexed

// Onto even better ways of doing things

// PLAIN OLD JAVASCRIPT OBJECTS

const SecretDecoderRing = {
    encode(plaintext) {
        return plaintext
            .split('')
            .map(char => char.charCodeAt())
            .map(code => code + 1)
            .map(code => String.fromCharCode(code))
            .join('')
    },
    decode(cyphertext) {
        return cyphertext
            .split('')
            .map(char => char.charCodeAt())
            .map(code => code - 1)
            .map(code => String.fromCharCode(code))
            .join('');
    }
}

const stringToEncode = 'Encode me';
const encoded = SecretDecoderRing.encode(stringToEncode);
const decoded = SecretDecoderRing.decode(encoded);

console.log(encoded);
console.log(decoded);

const EMPTY = {};

const OneTwoThree = {
    first: 1,
    rest: {
        first: 2,
        rest: {
            first: 3,
            rest: EMPTY
        }
    }
};

const reverse = (node, delayed = EMPTY) =>
    node === EMPTY ?
    delayed :
    reverse(node.rest, {
        first: node.first,
        rest: delayed
    });

console.log(reverse(OneTwoThree));

const reverseMapWith = (fn, node, delayed = EMPTY) =>
    node === EMPTY ?
    delayed :
    reverseMapWith(fn, node.rest, {
        first: fn(node.first),
        rest: delayed
    });

console.log(reverseMapWith((x) => x * x, OneTwoThree));

// MUTATION 
// - identity stays the same, but structure changes
// - makes some things shorter and maybe faster, but harder to reason about

// REASSIGNMENT

const evenStevens = (n) => {
    if (n === 0) {
        return true;
    } else if (n == 1) {
        return false;
    } else {
        // rebind a new value to the name n
        n = n - 2;
        return evenStevens(n);
    }
}

console.log(evenStevens(68));

// why CONST and LET
// - block scoped instead of function scoped

// COPY ON WRITE

const UTIL_EMPTY = {};

const utilCopy = (node, head = null, tail = null) => {
    if (node === UTIL_EMPTY) {
        return head;
    } else if (tail === null) {
        const {
            first,
            rest
        } = node;
        const newNode = {
            first,
            rest
        };
        return utilCopy(rest, newNode, newNode);
    } else {
        const {
            first,
            rest
        } = node;
        const newNode = {
            first,
            rest
        };
        tail.rest = newNode;
        return utilCopy(node.rest, head, newNode);
    }
}

const utilFirst = ({
    first,
    rest
}) => first;
const utilRest = ({
    first,
    rest
}) => rest;

const utilReverse = (node, delayed = UTIL_EMPTY) =>
    node === UTIL_EMPTY ?
    delayed :
    utilReverse(utilRest(node), {
        first: utilFirst(node),
        rest: delayed
    });

const utilMapWith = (fn, node, delayed = UTIL_EMPTY) =>
    node === UTIL_EMPTY ?
    utilReverse(delayed) :
    utilMapWith(fn, utilRest(node), {
        utilFirst: fn(utilFirst(node)),
        rest: delayed
    });

const utilAt = (index, list) =>
    index === 0 ?
    utilFirst(list) :
    utilAt(index - 1, utilRest(list));

const utilSet = (index, value, list, originalList = list) =>
    index === 0 ?
    (list.first = value, originalList) :
    utilSet(index - 1, value, utilRest(list), originalList);

const parentList = {
    first: 1,
    rest: {
        first: 2,
        rest: {
            first: 3,
            rest: UTIL_EMPTY
        }
    }
}

const childList = utilRest(parentList);

utilSet(2, "three", parentList);
utilSet(0, "two", childList);

console.log(parentList);
console.log(childList);
