let numbers: number[] = [1, 2, 3, 4, 5]; // 数组
let flags: boolean[] = [true, false, true];
let fruits: string[] = ["苹果", "香蕉", "橙子"];


console.log(fruits[0]); // 索引

fruits[0] = "葡萄"; // 修改元素
console.log(fruits[0]);


let arr: number[] = [1, 2, 3];
let new_len_push = arr.push(4, 5); // 添加到数组末尾
console.log("push后:", arr, "长度:", new_len_push);
let lastItem = arr.pop(); // 删除最后一个元素
console.log("pop后:", arr, "移除的元素为:", lastItem);
let new_len_unshift = arr.unshift(20);
console.log("unshift后:", arr, "长度:", new_len_unshift);

let firstItem = arr.shift(); // 删除第一个元素
console.log("shift后:", arr, "移除的元素:", firstItem);



let items: string[] = ["A", "B", "C"];

// forEach - 遍历每个元素（无返回值）
console.log("forEach遍历:");
items.forEach((item, index) => {
    console.log(`  索引 ${index}: ${item}`);
});
//
// // for...of 循环（推荐用于简单遍历）
// console.log("for...of遍历:");
// for (const item of items) {
//     console.log(`  ${item}`);
// }
//
// // for...in 循环（遍历索引）
// console.log("for...in遍历:");
// for (const index in items) {
//     console.log(`  索引 ${index}: ${items[index]}`);
// }
//
// // 传统for循环
// console.log("传统for循环:");
// for (let i = 0; i < items.length; i++) {
//     console.log(`  索引 ${i}: ${items[i]}`);
// }
//
// // ============================================
// // 5. 数组转换方法（超级常用！）
// // ============================================
//
// console.log("\n=== 数组转换方法 ===");
//
// let nums: number[] = [1, 2, 3, 4, 5];
//
// // map - 映射：对每个元素执行操作，返回新数组
// let doubled = nums.map(n => n * 2);
// console.log("map (翻倍):", doubled); // [2, 4, 6, 8, 10]
//
// // filter - 过滤：返回满足条件的元素组成的新数组
// let evens = nums.filter(n => n % 2 === 0);
// console.log("filter (偶数):", evens); // [2, 4]
//
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
//
// // ============================================
// // 6. 数组判断方法
// // ============================================
//
// console.log("\n=== 数组判断方法 ===");
//
// let testArr: number[] = [1, 2, 3, 4, 5];
//
// // includes - 是否包含某个元素
// console.log("includes(3):", testArr.includes(3)); // true
// console.log("includes(10):", testArr.includes(10)); // false
//
// // indexOf - 返回元素的索引（不存在返回-1）
// console.log("indexOf(3):", testArr.indexOf(3)); // 2
// console.log("indexOf(10):", testArr.indexOf(10)); // -1
//
// // some - 是否有至少一个元素满足条件
// let hasEven = testArr.some(n => n % 2 === 0);
// console.log("some (有偶数?):", hasEven); // true
//
// // every - 是否所有元素都满足条件
// let allPositive = testArr.every(n => n > 0);
// console.log("every (全为正?):", allPositive); // true
//
// // Array.isArray - 判断是否为数组
// console.log("Array.isArray([]):", Array.isArray([])); // true
// console.log("Array.isArray({}):", Array.isArray({})); // false
//
// // ============================================
// // 7. 数组排序与反转
// // ============================================
//
// console.log("\n=== 排序与反转 ===");
//
// // sort - 排序（会修改原数组！）
// let unsorted: number[] = [3, 1, 4, 1, 5, 9, 2, 6];
//
// // 默认按字符串排序（对数字不准确！）
// let defaultSort = [...unsorted].sort();
// console.log("默认sort:", defaultSort); // 可能不对
//
// // 数字升序排序
// let ascending = [...unsorted].sort((a, b) => a - b);
// console.log("升序:", ascending); // [1, 1, 2, 3, 4, 5, 6, 9]
//
// // 数字降序排序
// let descending = [...unsorted].sort((a, b) => b - a);
// console.log("降序:", descending); // [9, 6, 5, 4, 3, 2, 1, 1]
//
// // 对象数组排序
// interface Person {
//     name: string;
//     age: number;
// }
//
// let people: Person[] = [
//     { name: "Alice", age: 30 },
//     { name: "Bob", age: 25 },
//     { name: "Charlie", age: 35 }
// ];
//
// let sortedByAge = [...people].sort((a, b) => a.age - b.age);
// console.log("按年龄排序:", sortedByAge);
//
// // reverse - 反转数组（会修改原数组！）
// let toReverse: number[] = [1, 2, 3];
// let reversed = [...toReverse].reverse();
// console.log("反转:", reversed); // [3, 2, 1]
//
// // ============================================
// // 8. 数组合并与切割
// // ============================================
//
// console.log("\n=== 合并与切割 ===");
//
// let arr1: number[] = [1, 2, 3];
// let arr2: number[] = [4, 5, 6];
//
// // concat - 合并数组（返回新数组）
// let merged = arr1.concat(arr2);
// console.log("concat:", merged); // [1, 2, 3, 4, 5, 6]
//
// // 扩展运算符合并（推荐）
// let spreadMerged = [...arr1, ...arr2];
// console.log("spread合并:", spreadMerged); // [1, 2, 3, 4, 5, 6]
//
// // slice - 切片（返回新数组，不修改原数组）
// let original: number[] = [0, 1, 2, 3, 4, 5];
// let sliced = original.slice(1, 4); // 从索引1到4（不包含4）
// console.log("slice(1,4):", sliced); // [1, 2, 3]
//
// let sliceFromEnd = original.slice(-2); // 最后2个元素
// console.log("slice(-2):", sliceFromEnd); // [4, 5]
//
// // 复制数组
// let copy = original.slice();
// console.log("复制数组:", copy);
//
// // join - 将数组转为字符串
// let words: string[] = ["Hello", "World"];
// console.log("join:", words.join(" ")); // "Hello World"
// console.log("join('-'):", words.join("-")); // "Hello-World"
//
// // ============================================
// // 9. 数组扁平化
// // ============================================
//
// console.log("\n=== 数组扁平化 ===");
//
// // flat - 扁平化嵌套数组
// let nested: number[][] = [[1, 2], [3, 4], [5, 6]];
// let flattened = nested.flat();
// console.log("flat:", flattened); // [1, 2, 3, 4, 5, 6]
//
// // 深度扁平化
// let deepNested: any[] = [1, [2, [3, [4]]]];
// let deepFlat = deepNested.flat(Infinity);
// console.log("flat(Infinity):", deepFlat); // [1, 2, 3, 4]
//
// // flatMap - map + flat
// let sentences: string[] = ["Hello World", "Foo Bar"];
// let allWords = sentences.flatMap(s => s.split(" "));
// console.log("flatMap:", allWords); // ["Hello", "World", "Foo", "Bar"]
//
// // ============================================
// // 10. 类型化数组与元组
// // ============================================
//
// console.log("\n=== 类型化数组与元组 ===");
//
// // 联合类型数组
// let mixed: (string | number)[] = [1, "two", 3, "four"];
// console.log("联合类型数组:", mixed);
//
// // 元组 - 固定长度和类型的数组
// let tuple: [string, number, boolean] = ["Alice", 25, true];
// console.log("元组:", tuple);
// console.log("元组解构: 名字 =", tuple[0], ", 年龄 =", tuple[1]);
//
// // 元组解构赋值
// let [name, age, isActive] = tuple;
// console.log("解构:", name, age, isActive);
//
// // 只读数组
// let readonlyArr: readonly number[] = [1, 2, 3];
// // readonlyArr.push(4); // 错误！不能修改只读数组
// console.log("只读数组:", readonlyArr);
//
// // ============================================
// // 11. 实用技巧与模式
// // ============================================
//
// console.log("\n=== 实用技巧 ===");
//
// // 去重
// let duplicates: number[] = [1, 2, 2, 3, 3, 3, 4];
// let unique = [...new Set(duplicates)];
// console.log("去重:", unique); // [1, 2, 3, 4]
//
// // 取最后N个元素
// let data: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let lastThree = data.slice(-3);
// console.log("最后3个:", lastThree); // [8, 9, 10]
//
// // 分组（使用reduce）
// let students = [
//     { name: "Alice", grade: "A" },
//     { name: "Bob", grade: "B" },
//     { name: "Charlie", grade: "A" },
//     { name: "David", grade: "B" }
// ];
//
// let grouped = students.reduce((acc, student) => {
//     const key = student.grade;
//     if (!acc[key]) acc[key] = [];
//     acc[key].push(student);
//     return acc;
// }, {} as { [key: string]: typeof students });
// console.log("分组结果:", grouped);
//
// // 数组转对象
// let keyValuePairs: [string, number][] = [["a", 1], ["b", 2], ["c", 3]];
// let obj = Object.fromEntries(keyValuePairs);
// console.log("数组转对象:", obj); // { a: 1, b: 2, c: 3 }
//
// // 对象转数组
// let entries = Object.entries(obj);
// console.log("对象转数组:", entries); // [["a", 1], ["b", 2], ["c", 3]]
//
// // 生成数字序列
// let sequence = Array.from({ length: 5 }, (_, i) => i + 1);
// console.log("生成序列:", sequence); // [1, 2, 3, 4, 5]
//
// // 随机打乱数组
// let toShuffle = [1, 2, 3, 4, 5];
// let shuffled = [...toShuffle].sort(() => Math.random() - 0.5);
// console.log("打乱:", shuffled);
//
// // ============================================
// // 12. 链式调用（实际开发中超常用）
// // ============================================
//
// console.log("\n=== 链式调用示例 ===");
//
// interface Product {
//     name: string;
//     price: number;
//     category: string;
//     inStock: boolean;
// }
//
// let products: Product[] = [
//     { name: "手机", price: 5000, category: "电子", inStock: true },
//     { name: "电脑", price: 8000, category: "电子", inStock: false },
//     { name: "耳机", price: 500, category: "电子", inStock: true },
//     { name: "书籍", price: 50, category: "图书", inStock: true },
//     { name: "背包", price: 200, category: "服饰", inStock: true }
// ];
//
// // 链式调用: 筛选电子类且有库存 -> 按价格排序 -> 取出名称和价格
// let result = products
//     .filter(p => p.category === "电子" && p.inStock)
//     .sort((a, b) => a.price - b.price)
//     .map(p => ({ name: p.name, price: p.price }));
//
// console.log("链式调用结果:", result);
// // [{ name: "耳机", price: 500 }, { name: "手机", price: 5000 }]
//
// // 计算有库存商品的总价
// let totalPrice = products
//     .filter(p => p.inStock)
//     .reduce((sum, p) => sum + p.price, 0);
// console.log("有库存商品总价:", totalPrice);
//
// console.log("\n✅ TypeScript Array 教程完成！");
