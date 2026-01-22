// 创建对象
let person = {
    name: "张三",
    age: 25,
    city: "北京", // 属性

    print(): void {
        console.log(`${this.name}, ${this.age}岁, 来自${this.city}`);
    } // 方法
};
console.log(person);
person.print()
console.log(typeof person) // print->object

// 访问对象属性
console.log(person.name); // 点号(.)访问
console.log(person['name']) // 方括号访问(属性名是变量时,只能通过方括号访问对象属性)

type Point = {
    x: number;
    y: number;

    area(): number;
    print?(): void;
};
let p: Point = {
    x: 10,
    y: 20,
    area(): number {
        return this.x * this.y;
    }
};
// The optional chaining (?.) operator accesses an object's property or calls a function.
// If the object accessed or function called using this operator is undefined or null, the expression short circuits and evaluates to undefined instead of throwing an error.
console.log(p?.x); // ?.:可选链操作符
console.log(p.print?.())


// // ===================== 3. 修改和添加属性 =====================
//
// // 3.1 修改已有属性
// person.age = 26;
// console.log("3.1 修改属性:", person);
//
// // 3.2 添加新属性（需要使用索引签名或类型断言）
// interface FlexibleObject {
//     [key: string]: any;  // 索引签名，允许任意属性
// }
//
// let flexible: FlexibleObject = { name: "test" };
// flexible.newProp = "新属性";
// console.log("3.2 添加属性:", flexible);
//
//
// // ===================== 4. 对象常用方法 =====================
//
// let sampleObj = { a: 1, b: 2, c: 3 };
//
// // 4.1 Object.keys() - 获取所有键
// let keys = Object.keys(sampleObj);
// console.log("4.1 Object.keys():", keys);  // ["a", "b", "c"]
//
// // 4.2 Object.values() - 获取所有值
// let values = Object.values(sampleObj);
// console.log("4.2 Object.values():", values);  // [1, 2, 3]
//
// // 4.3 Object.entries() - 获取键值对数组
// let entries = Object.entries(sampleObj);
// console.log("4.3 Object.entries():", entries);  // [["a", 1], ["b", 2], ["c", 3]]
//
// // 4.4 Object.assign() - 合并对象
// let target = { x: 1 };
// let source = { y: 2, z: 3 };
// let merged = Object.assign({}, target, source);
// console.log("4.4 Object.assign():", merged);  // { x: 1, y: 2, z: 3 }
//
// // 4.5 展开运算符合并（更推荐）
// let merged2 = { ...target, ...source };
// console.log("4.5 展开运算符合并:", merged2);
//
// // 4.6 Object.freeze() - 冻结对象（不可修改）
// let frozen = Object.freeze({ name: "冻结对象" });
// // frozen.name = "新名字";  // 报错：无法修改
// console.log("4.6 Object.freeze():", Object.isFrozen(frozen));  // true
//
// // 4.7 Object.seal() - 密封对象（可修改值，不可添加/删除属性）
// let sealed = Object.seal({ count: 10 });
// sealed.count = 20;  // 可以修改
// // sealed.newProp = "xxx";  // 报错：无法添加
// console.log("4.7 Object.seal():", Object.isSealed(sealed));  // true
//
//
// // ===================== 5. 遍历对象 =====================
//
// let animal = { type: "狗", name: "旺财", age: 3 };
//
// // 5.1 for...in 遍历
// console.log("5.1 for...in 遍历:");
// for (let key in animal) {
//     console.log(`  ${key}: ${animal[key as keyof typeof animal]}`);
// }
//
// // 5.2 Object.keys() + forEach
// console.log("5.2 Object.keys() + forEach:");
// Object.keys(animal).forEach(key => {
//     console.log(`  ${key}: ${animal[key as keyof typeof animal]}`);
// });
//
// // 5.3 Object.entries() + forEach（推荐）
// console.log("5.3 Object.entries() + forEach:");
// Object.entries(animal).forEach(([key, value]) => {
//     console.log(`  ${key}: ${value}`);
// });
//
//
// // ===================== 6. 对象解构 =====================
//
// let book = { title: "TypeScript入门", author: "王五", year: 2024, pages: 300 };
//
// // 6.1 基本解构
// let { title, author } = book;
// console.log("6.1 基本解构:", title, author);
//
// // 6.2 解构并重命名
// let { title: bookTitle, author: bookAuthor } = book;
// console.log("6.2 重命名解构:", bookTitle, bookAuthor);
//
// // 6.3 解构带默认值
// let { pages, publisher = "未知出版社" } = book as any;
// console.log("6.3 默认值解构:", pages, publisher);
//
// // 6.4 嵌套对象解构
// let nested = {
//     outer: {
//         inner: {
//             value: 42
//         }
//     }
// };
// let { outer: { inner: { value } } } = nested;
// console.log("6.4 嵌套解构:", value);
//
// // 6.5 剩余属性解构
// let { title: t, ...rest } = book;
// console.log("6.5 剩余属性:", rest);
//
//
// // ===================== 7. 类型相关操作 =====================
//
// // 7.1 keyof - 获取对象类型的所有键
// interface Car {
//     brand: string;
//     model: string;
//     year: number;
// }
//
// type CarKeys = keyof Car;  // "brand" | "model" | "year"
//
// // 7.2 typeof - 从对象推断类型
// const config = {
//     host: "localhost",
//     port: 8080,
//     debug: true
// };
// type ConfigType = typeof config;
// // ConfigType = { host: string; port: number; debug: boolean }
//
// // 7.3 Partial - 将所有属性变为可选
// type PartialCar = Partial<Car>;
// let partialCar: PartialCar = { brand: "Toyota" };  // 只需部分属性
// console.log("7.3 Partial:", partialCar);
//
// // 7.4 Required - 将所有属性变为必需
// interface OptionalUser {
//     name?: string;
//     age?: number;
// }
//
// type RequiredUser = Required<OptionalUser>;
// // let requiredUser: RequiredUser = { name: "test" };  // 报错，缺少 age
//
// // 7.5 Pick - 选择部分属性
// type CarBrandModel = Pick<Car, "brand" | "model">;
// let carInfo: CarBrandModel = { brand: "Honda", model: "Civic" };
// console.log("7.5 Pick:", carInfo);
//
// // 7.6 Omit - 排除部分属性
// type CarWithoutYear = Omit<Car, "year">;
// let carNoYear: CarWithoutYear = { brand: "Ford", model: "Focus" };
// console.log("7.6 Omit:", carNoYear);
//
// // 7.7 Record - 创建键值对类型
// type StringToNumber = Record<string, number>;
// let scores: StringToNumber = { math: 90, english: 85 };
// console.log("7.7 Record:", scores);
//
//
// // ===================== 8. 只读对象 =====================
//
// // 8.1 Readonly 类型
// interface MutablePerson {
//     name: string;
//     age: number;
// }
//
// type ReadonlyPerson = Readonly<MutablePerson>;
//
// let readonlyPerson: ReadonlyPerson = { name: "赵六", age: 30 };
// // readonlyPerson.name = "新名字";  // 报错：无法修改
//
// // 8.2 as const 断言（深度只读）
// const deepReadonly = {
//     level1: {
//         level2: {
//             value: "不可变"
//         }
//     }
// } as const;
// // deepReadonly.level1.level2.value = "新值";  // 报错
// console.log("8.2 as const:", deepReadonly);
//
//
// // ===================== 9. 实用技巧 =====================
//
// // 9.1 检查属性是否存在
// let checkObj = { a: 1, b: undefined };
// console.log("9.1 in 操作符:", "a" in checkObj);  // true
// console.log("9.1 hasOwnProperty:", checkObj.hasOwnProperty("b"));  // true
//
// // 9.2 删除属性
// let deletable: { [key: string]: any } = { x: 1, y: 2, z: 3 };
// delete deletable.z;
// console.log("9.2 删除属性:", deletable);
//
// // 9.3 对象浅拷贝
// let original = { a: 1, nested: { b: 2 } };
// let shallowCopy = { ...original };
// shallowCopy.a = 100;
// shallowCopy.nested.b = 200;  // 注意：会影响原对象！
// console.log("9.3 浅拷贝影响:", original.nested.b);  // 200
//
// // 9.4 对象深拷贝
// let originalDeep = { a: 1, nested: { b: 2 } };
// let deepCopy = JSON.parse(JSON.stringify(originalDeep));
// deepCopy.nested.b = 999;
// console.log("9.4 深拷贝不影响:", originalDeep.nested.b);  // 2
//
// // 9.5 对象比较（引用比较 vs 值比较）
// let obj1 = { a: 1 };
// let obj2 = { a: 1 };
// let obj3 = obj1;
// console.log("9.5 引用比较 obj1 === obj2:", obj1 === obj2);  // false
// console.log("9.5 引用比较 obj1 === obj3:", obj1 === obj3);  // true
// console.log("9.5 值比较:", JSON.stringify(obj1) === JSON.stringify(obj2));  // true
//
//
// // ===================== 10. 综合示例 =====================
//
// // 实现一个简单的用户管理
// interface UserProfile {
//     id: number;
//     name: string;
//     email: string;
//     createdAt: Date;
//     settings: {
//         theme: "light" | "dark";
//         notifications: boolean;
//     };
// }
//
// // 创建用户
// function createUser(name: string, email: string): UserProfile {
//     return {
//         id: Date.now(),
//         name,
//         email,
//         createdAt: new Date(),
//         settings: {
//             theme: "light",
//             notifications: true
//         }
//     };
// }
//
// // 更新用户（使用 Partial）
// function updateUser(user: UserProfile, updates: Partial<UserProfile>): UserProfile {
//     return { ...user, ...updates };
// }
//
// // 测试
// let newUser = createUser("测试用户", "test@example.com");
// console.log("10. 创建用户:", newUser);
//
// let updatedUser = updateUser(newUser, { name: "更新后的名字" });
// console.log("10. 更新用户:", updatedUser);
//
// console.log("\n==================== 教程结束 ====================");
