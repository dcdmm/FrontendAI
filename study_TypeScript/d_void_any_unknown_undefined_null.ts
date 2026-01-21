function logMessage(msg: string): void {
    // 函数无返回值
    console.log(msg)
}
logMessage('你好')


let a: any
a = 100
a = '你好'
a = false
// any可以赋值给任意类型
let b: string;
b = a;
let c: number;
c = a;

let list: any[] = [1, true, "free"];


let an: unknown
an = 100
an = false
an = '你好'
let bn: string;
let cn: string;
// bn = an; // unknown除了any不能赋值给其他类型
if (typeof an === 'string') { // 类型收窄
    bn = an;
}
cn = an as string; // 类型断言

