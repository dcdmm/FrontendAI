// 为"my-custom"模块提供类型声明
// * 使TS识别该模块(仅编译时生效,运行时该模块不存在仍会报错)
// * 对模块导出内容提供类型约束与智能提示
declare module 'my-custom' {
    export function greet(name: string): string

    /**
     * 两数相加并返回结果
     * @param a 加数
     * @param b 加数
     * @returns 相加结果
     */
    export function add(a: number, b: number): number
}

// 为所有`.json`(`*`表示匹配任意文件名)文件的导入提供类型声明
declare module '*.json' {
    interface MyDataContent {
        name: string
        version: number
        tags: string[]
    }

    const content: MyDataContent
    export default content // 默认导出
}

