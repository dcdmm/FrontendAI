// void represents the return value of functions which don’t return a value. 
function logMessage(msg: string): void {
    console.log(msg)
}

logMessage('你好')

type voidFunc = () => void;

// Contextual typing with a return type of void does not force functions to not return something.
// Another way to say this is a contextual function type with a void return type (type voidFunc = () => void), when implemented, can return any other value, but it will be ignored.
const f1: voidFunc = () => {
    return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function () {
    return true;
};

// And when the return value of one of these functions is assigned to another variable, it will retain the type of void:
const v1 = f1();
const v2 = f2();
const v3 = f3();

const src = [1, 2, 3];
const dst = [0];
// This behavior exists so that the following code is valid even though Array.prototype.push returns a number and the Array.prototype.forEach method expects a function with a return type of void.
src.forEach((el) => dst.push(el));

// **********************************************************************************************************************

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

// **********************************************************************************************************************

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

// **********************************************************************************************************************

let x; // 变量声明时没有初始化(隐式初始化为undefined)

console.log(typeof x) // print->undefined
// The Undefined type is inhabited by exactly one value: undefined.
console.log(`x 的值是 ${x}`);
if (!x) {
    console.log("undefined是假值")
}

let obj = { name: '张三' };
// 访问对象不存的属性(返回undefined)
console.log(obj.age); // print->undefined

// **********************************************************************************************************************

let nn: null = null
console.log(typeof nn) // print->object(不能通过typeof判别是否为null)
console.log(nn == null) // print->true(只能通过`== null`判别是否为null)
if (!nn) {
    console.log("null是假值")
}


