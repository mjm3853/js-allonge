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