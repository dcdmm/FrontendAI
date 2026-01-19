let b: boolean = false; // 布尔值
let n: number = 6; // 数字
let s: string = "dmm"; // 字符串

console.log(b, n, s);

let list: number[] = [1, 2, 3]; // 数组
console.log(list)

/**
 * 加法函数
 * @param x 第一个加数
 * @param y 第二个加数
 * @returns 两个加数的和
 */
function add(x: number, y: number): number {
    return x + y
}

console.log(add(1, 2))