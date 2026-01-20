// Traditional anonymous function
(function (a: any): any {
    return a + 100;
});

// 1. Remove the word "function" and place arrow between the argument and opening body brace
(a) => {
    return a + 100;
}; // 箭头函数(箭头函数总是匿名的)

// 2. Remove the body braces and word "return" — the return is implied.
(a) => a + 100;

// 3. Remove the parameter parentheses
a => a + 100;

(function (a, b) {
    return a + b + 100;
});

// The parentheses can only be omitted if the function has a single simple parameter.
(a, b) => a + b + 100;


(function (a, b) {
    const chuck = 42;
    return a + b + chuck;
});

// The braces can only be omitted if the function directly returns an expression. If the body has statements, the braces are required — and so is the return keyword.
(a, b) => {
    const chuck = 42;
    return a + b + chuck;
};