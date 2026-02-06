type AddFunction = (a: number) => number;
type AddFunction2 = (a: number, b: number) => number;

// Traditional anonymous function
let x0: AddFunction = (function (a: number): number {
    return a + 100;
});

// 1. Remove the word "function" and place arrow between the argument and opening body brace
let x1: AddFunction = (a) => {
    return a + 100;
}; // 箭头函数(箭头函数总是匿名的)

// 2. Remove the body braces and word "return" — the return is implied.
let x2: AddFunction = (a) => a + 100;

// 3. Remove the parameter parentheses
let x3: AddFunction = a => a + 100;

let y0: AddFunction2 = (function (a, b) {
    return a + b + 100;
});

// The parentheses can only be omitted if the function has a single simple parameter.
let y1: AddFunction2 = (a, b) => a + b + 100;


let z0: AddFunction2 = (function (a, b) {
    const chuck = 42;
    return a + b + chuck;
});

// The braces can only be omitted if the function directly returns an expression. If the body has statements, the braces are required — and so is the return keyword.
let z1: AddFunction2 = (a, b) => {
    const chuck = 42;
    return a + b + chuck;
};