// 单行注释

/*
 * 多行注释
 * 多行注释
 */

let x: number; // 声明
x = 10; // 初始化
console.log(x)
x = 11; // 重新赋值
console.log(x)
let y: string = "hello";  // 声明并初始化

const MY_FAV: number = 7; // 常量(声明时必须初始化)
// 报错: TypeError: Assignment to constant variable.
// MY_FAV = 20; // 不能重新赋值
const MY_OBJECT = {key: "值"};
console.log(MY_OBJECT)
MY_OBJECT.key = "其他值"; // const only prevents re-assignments, but doesn't prevent mutations.
console.log(MY_OBJECT)

// 基础数据类型
let b: boolean = false; // 布尔值(true or false)
let n: number = 6; // 数字
let s: string = "dmm"; // 字符串
let none: null = null // 空值