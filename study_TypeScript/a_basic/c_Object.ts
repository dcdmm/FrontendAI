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
person.age = 26 // 修改对象属性
console.log(person.age)

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

// The Object.keys() static method returns an array of a given object's own enumerable string-keyed property names.
let keys = Object.keys(p)
console.log(keys)
// The Object.values() static method returns an array of a given object's own enumerable string-keyed property values.
let values = Object.values(p)
console.log(values)