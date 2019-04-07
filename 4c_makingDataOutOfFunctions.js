// To Mock a Mockingbird

// Kestrel, Idiot Bird, Vireo

// Makes constant functions. i.e. functions that always return the same thing
const K = (x) => (y) => x;
// Identity function that evaluates what you pass it
const I = (x) => (x);
// 
const V = (x) => (y) => (z) => z(x)(y);

const fortyTwo = K(42);

console.log(fortyTwo('abc'));

console.log(K(6)(7));

console.log(K(I)(4)(5));

const first = K;
const second = K(I);
const rest = K(I);
const pair = V;
const EMPTY = (() => { });

console.log(first('primus')('secondus'));
console.log(second('primus')('secondus'));

const latin = (selector) => selector('primus')('secondus');

console.log(latin(second));

(first, second) => (selector) => selector(first)(second);

// OR with currying

(first) => (second) => (selector) => selector(first)(second);

// OR use the vireo combinator

const latin2 = pair('first')('second');

console.log(latin2(first));

const l123 = pair(1)(pair(2)(pair(3)(EMPTY)));

console.log(l123(first));
console.log(l123(rest)(first));
console.log(l123(rest)(rest)(first));

const aLength = (aPair) =>
    aPair === EMPTY ?
        0 :
        1 + aLength(aPair(rest));

console.log(aLength(l123));