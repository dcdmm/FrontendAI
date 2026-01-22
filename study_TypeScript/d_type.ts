type num = number; // 类型别名
let price: num
price = 100
console.log(typeof price) // print->number
console.log(price)

// 对象类型
type User = {
    id: number;
    name: string;
    email: string; // 必须属性
    age?: number; // 可选属性
    readonly createdAt: Date; // 只读属性(初始化后不能被修改)

    greet(): void;

    print?(): void; // 可选方法
};
const user1: User = {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com",
    createdAt: new Date(),

    greet() {
        console.log('Hello');
    }, // 必须实现

    print() {
        console.log('TypeScript');
    } // 可选,可以不实现
};
console.log(user1);

// 函数类型
type MathOperation = (a: number, b: number) => number;
const add: MathOperation = (a, b) => a + b;
console.log("5 + 3 =", add(5, 3));

// 联合类型
type ID = string | number;
type Status = "pending" | "success" | "error"; // 字面量联合类型(只能是指定的几个具体值之一)
type Level = 1 | 2 | 3 | 4 | 5 | 6;
let productId: ID = 123;
let customerId: ID = "cust_456";
let orderStatus: Status = "pending";
let Level = 4;
console.log({ orderStatus, productId, customerId, Level });

type Person = {
    name: string;
    age: number;
};
type Employee = {
    employeeId: string;
    department: string;
};
// 交叉类型
type Staff = Person & Employee; // Staff类型同时包含Person和Employee的所有属性
const staff: Staff = {
    name: "李四",
    age: 30,
    employeeId: "EMP001",
    department: "技术部"
};
console.log(staff);
