function add(a: number, b: number): number {
    return a + b
}

console.log(add(3, 4))

// 默认参数
function sub(a: number, b: number = 10): number {
    return a - b
}

console.log(sub(0))

// 可选参数
function buildName(firstName: string, lastName?: string) {
    if (lastName != undefined)
        return firstName + " " + lastName;
    else
        console.log("###lastName is undefined###")
    return firstName;
}

console.log(buildName("tom"))
console.log(buildName("tom", "hanks"))

// 剩余参数(The rest parameter syntax allows us to represent an indefinite number of arguments as an array.)
function push(array: any[], ...items: any[]) {
    items.forEach(function (item) {
        array.push(item);
    });
}

let a: any[] = [];
push(a, 1, 2, 3);
console.log(a);

// 函数表达式(匿名)
const square = function (number: number) {
    return number * number;
};

console.log(square(4));

// 函数表达式(提供名称)
const factorial = function fac(n: number): number {
    return n < 2 ? 1 : n * fac(n - 1);
};

console.log(factorial(3));
