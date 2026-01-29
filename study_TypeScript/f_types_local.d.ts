export declare const APP_VERSION: string;
export declare let DEBUG_MODE: boolean;

export declare function log(message: string): string;

export interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
}

export type UserId = number | string;

export declare namespace MyApp {
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

// ⚠️ 注意：declare module 'xxx' 无论在哪个文件，都是全局的！
// 与上面的 export 不同，这些不需要 import 就能生效
declare module 'my-library' {
    export function helper(input: string): string;
    export class Calculator {
        add(a: number, b: number): number;
        subtract(a: number, b: number): number;
    }
}

// 模块扩展（给已存在的模块添加类型）
declare module 'express' {
    interface Request {
        user?: User;  // 扩展 Express 的 Request 类型
    }
}

// 使用方式说明：
// 1. 本文件导出的内容（有 export 的）：需要 import
//    import { User, log, MyApp } from './f_types_local';
//
// 2. declare module 声明的内容：全局生效，不需要 import 本文件
//    import { helper } from 'my-library';  // 直接可用
//    import express from 'express';        // Request 已被扩展