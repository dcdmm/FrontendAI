// 声明时直接导出
export const PI = 3.14159;

export function add(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }
}

const VERSION = "1.0.0";
const AUTHOR = "TypeScript学习者";

function multiply(a: number, b: number): number {
    return a * b;
}

function divide(a: number, b: number): number {
    if (b === 0) throw new Error("不能除以零！");
    return a / b;
}

// 先声明,后统一导出
export { VERSION, AUTHOR, multiply, divide };