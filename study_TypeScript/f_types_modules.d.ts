// 模块.d.ts(有import/export语句)(需通过import导入)

export declare const APP_VERSION_m: string;
export declare let DEBUG_MODE_m: boolean;

export declare function log_m(message: string): string;

export interface User_m {
    id: number;
    name: string;
    email: string;
    age?: number;
}

// 将声明添加到全局作用域(也可以自动可用)
declare global {
    type UserId_m = number | string;
}