// 为"my-custom"模块提供类型声明(假装存在,避免导入时编译报错,并获得类型检查)
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

