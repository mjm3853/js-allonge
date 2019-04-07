// Separate traversing an array with summing the bits

// @ts-nocheck


const callLeft = (fn, ...args) =>
    (...remainingArgs) =>
        fn(...args, ...remainingArgs);

const callRight = (fn, ...args) =>
    (...remainingArgs) =>
        fn(...remainingArgs, ...args);

const foldArrayWith = (fn, terminalValue, [first, ...rest]) =>
    first === undefined ?
        terminalValue :
        fn(first, foldArrayWith(fn, terminalValue, rest));

const foldArray = (array) => callRight(foldArrayWith, array);

const arraySum = callLeft(foldArrayWith, (a, b) => a + b, 0);

const arrayToFold = [1, 4, 9, 16, 25];

console.log(arraySum(arrayToFold));

const sumFoldable = (folder) => folder((a, b) => a + b, 0);

console.log(sumFoldable(foldArray(arrayToFold)));

// Unfold with an iterator

const NumberIterator = (number = 0) =>
    () => ({ done: false, value: number++ });

const mapIteratorWith = (fn, iterator) =>
    () => {
        const { done, value } = iterator();

        return ({ done, value: done ? undefined : fn(value) });
    }

const squares = mapIteratorWith((x) => x * x, NumberIterator(1));

const take = (iterator, numberToTake) => {
    let count = 0;

    return () => {
        if (++count <= numberToTake) {
            return iterator();
        } else {
            return { done: true };
        }
    };
};

const toArray = (iterator) => {
    let eachIteration, array = [];

    while ((eachIteration = iterator(), !eachIteration.done)) {
        array.push(eachIteration.value);
    }
    return array;
}

console.log(toArray(take(squares, 5)));

const odds = () => {
    let number = 1;

    return () => {
        const value = number;

        number += 2;
        return { done: false, value };
    }
}

const squareOf = callLeft(mapIteratorWith, (x) => x * x);

console.log(toArray(take(squareOf(odds()), 5)));

const filterIteratorWith = (fn, iterator) =>
    () => {
        const { done, value } = iterator();
        do {
            const { done, value } = iterator();
        } while (!done && !fn(value));
        return { done, value };
    }

const oddsOf = callLeft(filterIteratorWith, (n) => n % 2 === 1);

console.log(toArray(take(squareOf(oddsOf(NumberIterator(1))), 5)));