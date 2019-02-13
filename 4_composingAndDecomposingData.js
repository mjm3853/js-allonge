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
    // @ts-ignore
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
        // @ts-ignore
        return [first, ...flatten(rest)];
    } else {
        // @ts-ignore
        return [...flatten(first), ...flatten(rest)]
    }
}

console.log(flatten(['foo', [1, 2, 'bar'],
    ['3', 5]
]));