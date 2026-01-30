// 全局.d.ts(无import/export语句)(全局作用域,自动可用)

declare const APP_VERSION: string;
declare let DEBUG_MODE: boolean;

declare function log(message: string): string;

interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
}

type UserId = number | string;

// 模块声明
declare module 'my-library' {
    export function helper(input: string): string;

    export class Calculator {
        add(a: number, b: number): number;

        subtract(a: number, b: number): number;
    }
}

declare module 'express' {
    interface Request {
        user?: User;
    }
}
