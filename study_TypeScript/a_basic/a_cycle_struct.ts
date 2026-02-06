// for循环
for (let i = 0; i < 3; i++) {
    console.log(`第 ${i} 次循环`);
}

// while循环
let count: number = 0;
while (count < 3) {
    console.log(`count = ${count}`);
    count++;
}

// do-while循环
let num: number = 0;
do {
    console.log(`num = ${num}`);
    num++;
} while (num < 3);


// The for...in statement iterates a specified variable over all the enumerable properties of an object.
let fruits: string[] = ['苹果', '香蕉', '橙子'];
for (let i in fruits) {
    console.log(`${i}: ${fruits[i]}`);
}
let person = {name: '张三', age: 25, city: '北京'};
for (let key in person) {
    console.log(`${key}: ${person[key as keyof typeof person]}`);
}

// The for...of statement executes a loop that operates on a sequence of values sourced from an iterable object(Array, String, Map, Set等).
for (let fruit of fruits) {
    console.log(fruit);
}
const iterable: string = "boo";
for (const value of iterable) {
    console.log(value);
}

let a: number[] = [10, 20, 30, 40];
for (let i = 0; i < a.length; i++) {
    if (a[i] == 20) {
        console.log(a[i])
        break;  // break语句
    }
}

let i = 0;
let n = 0;
while (i < 5) {
    i++;
    if (i == 3) {
        continue; // continue语句
    }
    n += i;
    console.log(n);
}