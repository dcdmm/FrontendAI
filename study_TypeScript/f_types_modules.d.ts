// 模块.d.ts(有import/export语句)(需import导入)

export declare const APP_VERSION_m: string;
export declare let DEBUG_MODE_m: boolean;

declare function log_m(message: string): string;

// 将声明添加到全局作用域
declare global {
    interface User_m {
        id: number;
        name: string;
        email: string;
        age?: number;
    }

    type UserId_m = number | string;
}