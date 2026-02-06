let foo = ["one", "two", "three"];
// 解构数组
const [red, yellow, green] = foo;

let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // print->1
console.log(rest); // print->[2, 3, 4]

const [a, b, ...[c, d, ...e]] = [1, 2, 3, 4, 5, 6];
console.log(a, b, c, d, e); // print->1 2 3 4 [ 5, 6 ]

// ************************************************************************************************

let tuple: [number, string, boolean] = [7, "hello", true];
// 解构元组
let [a1, b1, c1] = tuple;
console.log(a1, b1, c1); // print->7 hello true

// ************************************************************************************************

let person = {name: "Alice", age: 25, city: "Beijing"};
// 解构对象
let {name, age, city} = person;
console.log(name, age, city); // print->Alice 25 Beijing

let {city: c2, ...restProps} = person;
console.log(c2); // print->Beijing
console.log(restProps); // print->{ name: 'Alice', age: 25 }

function greet({name, age}: { name: string; age: number }): string {
    return `Hello, ${name}! You are ${age} years old.`;
}

console.log(greet({name: "Dave", age: 30})); // print->Hello, Dave! You are 30 years old.
