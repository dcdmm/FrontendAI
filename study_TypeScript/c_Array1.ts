
let nums: number[] = [1, 2, 3, 4, 5];

let doubled = nums.map(n => n * 2);
console.log(doubled); // print->[2, 4, 6, 8, 10]

let evens = nums.filter(n => n % 2 === 0);
console.log( evens); // print->[2, 4]

// // reduce - 归约：将数组归约为单个值
// let sum = nums.reduce((acc, curr) => acc + curr, 0);
// console.log("reduce (求和):", sum); // 15
//
// // reduce 求最大值
// let max = nums.reduce((a, b) => a > b ? a : b);
// console.log("reduce (最大值):", max); // 5
//
// // find - 查找：返回第一个满足条件的元素
// let found = nums.find(n => n > 3);
// console.log("find (>3的第一个):", found); // 4
//
// // findIndex - 查找索引：返回第一个满足条件的元素的索引
// let foundIndex = nums.findIndex(n => n > 3);
// console.log("findIndex (>3的索引):", foundIndex); // 3