// Some notes on the ternary operator
// - ternary operator has 3 values: first ? second : third
// - ternary is an 'expression', if is a 'statement'

const isTruthy = (fn) => !!fn;

console.log(isTruthy(true));

// control flow operators (not logical operators)
// ternary, &&, ||
// left side is always evaluated. right side is conditionally evaluated

// tail recursive for even
const even = (n) =>
    n === 0 || (n !== 1 && even(n - 2))

// function parameters are always eagerly evaluated
// can be problematic in recursive scenarios because the 
// parameters are evaluated before being used

const and = (a, b) => a && b;