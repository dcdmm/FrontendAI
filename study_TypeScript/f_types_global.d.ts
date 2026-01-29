// 声明全局变量
declare const APP_VERSION: string;
declare let DEBUG_MODE: boolean;

// 声明全局函数
declare function log(message: string): void;

// 声明全局接口
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
}

// 声明全局类型别名
type UserId = number | string;

// 声明全局命名空间
declare namespace MyApp {
    interface Config {
        timeout: number;
        retries: number;
    }

    function initialize(config: Config): void;
    function destroy(): void;

    class Storage {
        get(key: string): string | null;
        set(key: string, value: string): void;
        remove(key: string): void;
    }
}

// 声明模块
declare module 'my-library' {
    export function helper(input: string): string;
    export class Calculator {
        add(a: number, b: number): number;
        subtract(a: number, b: number): number;
    }
}

