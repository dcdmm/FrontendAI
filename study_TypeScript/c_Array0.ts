let numbers: number[] = [1, 2, 3, 4, 5]; // 数组
let flags: boolean[] = [true, false, true];

let fruits: string[] = ["苹果", "香蕉", "橙子"];
console.log(fruits[0]); // 索引
fruits[0] = "葡萄"; // 修改元素
console.log(fruits[0]);


let items: string[] = ["A", "B", "C"];
items.forEach((item, index) => {
    console.log(`索引 ${index}: ${item}`);
});
items.forEach((element) => console.log(element));

let arr: number[] = [1, 2, 3];
let new_len_push = arr.push(4, 5); // 添加到数组末尾
console.log("push后:", arr, "长度:", new_len_push);
let lastItem = arr.pop(); // 删除最后一个元素
console.log("pop后:", arr, "移除的元素为:", lastItem);
let new_len_unshift = arr.unshift(20);
console.log("unshift后:", arr, "长度:", new_len_unshift);
let firstItem = arr.shift(); // 删除第一个元素
console.log("shift后:", arr, "移除的元素:", firstItem);

let testArr: number[] = [1, 2, 3, 4, 5];
console.log("includes(3):", testArr.includes(3)); // 判断数组是否包含某元素
console.log("includes(10):", testArr.includes(10));
// The indexOf() method of Array instances returns the first index at which a given element can be found in the array, or -1 if it is not present.
console.log("indexOf(3):", testArr.indexOf(3)); //
console.log("indexOf(10):", testArr.indexOf(10));
