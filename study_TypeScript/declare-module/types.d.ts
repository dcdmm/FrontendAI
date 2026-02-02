declare module 'my-custom' {
    export function greet(name: string): string

    export function add(a: number, b: number): number
}

declare module '*.json' {
    interface MyDataContent {
        name: string
        version: number
        tags: string[]
    }

    const content: MyDataContent
    export default content
}

