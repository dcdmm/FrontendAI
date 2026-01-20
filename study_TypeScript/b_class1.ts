// ============================================
// TypeScript 类（Class）完整教程 - 由浅入深
// ============================================

// ============================================
// 第一部分：类的基础
// ============================================

// 1.1 最简单的类
class Animal {
    name: string;  // 属性

    constructor(name: string) {  // 构造函数
        this.name = name;
    }

    speak(): void {  // 方法
        console.log(`${this.name} 发出了声音`);
    }
}

const dog = new Animal("小狗");
dog.speak();  // 输出: 小狗 发出了声音


// ============================================
// 第二部分：访问修饰符
// ============================================

// 2.1 public（公开的）- 默认，任何地方都可以访问
// 2.2 private（私有的）- 只能在类内部访问
// 2.3 protected（受保护的）- 只能在类内部和子类中访问

class Person {
    public name: string;        // 公开属性
    private age: number;        // 私有属性
    protected id: string;       // 受保护属性

    constructor(name: string, age: number, id: string) {
        this.name = name;
        this.age = age;
        this.id = id;
    }

    // 通过公开方法访问私有属性
    public getAge(): number {
        return this.age;
    }

    private secretMethod(): void {
        console.log("这是私有方法");
    }
}

const person = new Person("张三", 25, "001");
console.log(person.name);     // ✅ 可以访问
console.log(person.getAge()); // ✅ 通过方法访问私有属性
// console.log(person.age);   // ❌ 错误：私有属性不能在类外访问
// console.log(person.id);    // ❌ 错误：受保护属性不能在类外访问


// ============================================
// 第三部分：构造函数简写
// ============================================

// 3.1 参数属性简写 - 在构造函数参数前加修饰符，自动创建并初始化属性
class Student {
    // 这种写法等同于在类中声明属性并在构造函数中赋值
    constructor(
        public name: string,
        private score: number,
        readonly studentId: string  // readonly 只读属性
    ) {}

    getScore(): number {
        return this.score;
    }
}

const student = new Student("李四", 95, "S001");
console.log(student.name);       // ✅ 李四
console.log(student.studentId);  // ✅ S001
// student.studentId = "S002";   // ❌ 错误：只读属性不能修改


// ============================================
// 第四部分：类的继承
// ============================================

// 4.1 使用 extends 继承父类
class Cat extends Animal {
    breed: string;

    constructor(name: string, breed: string) {
        super(name);  // 必须调用父类构造函数
        this.breed = breed;
    }

    // 重写父类方法
    speak(): void {
        console.log(`${this.name} 喵喵叫`);
    }

    // 子类特有方法
    scratch(): void {
        console.log(`${this.name} 在挠东西`);
    }
}

const cat = new Cat("咪咪", "橘猫");
cat.speak();    // 输出: 咪咪 喵喵叫
cat.scratch();  // 输出: 咪咪 在挠东西


// 4.2 protected 的作用 - 可以在子类中访问
class Employee extends Person {
    department: string;

    constructor(name: string, age: number, id: string, department: string) {
        super(name, age, id);
        this.department = department;
    }

    showId(): void {
        console.log(`员工ID: ${this.id}`);  // ✅ 可以访问 protected 属性
    }
}


// ============================================
// 第五部分：Getter 和 Setter
// ============================================

class Circle {
    private _radius: number;  // 私有属性通常用下划线开头

    constructor(radius: number) {
        this._radius = radius;
    }

    // Getter - 获取属性时自动调用
    get radius(): number {
        return this._radius;
    }

    // Setter - 设置属性时自动调用
    set radius(value: number) {
        if (value <= 0) {
            throw new Error("半径必须大于0");
        }
        this._radius = value;
    }

    // 只有 getter 的计算属性
    get area(): number {
        return Math.PI * this._radius ** 2;
    }
}

const circle = new Circle(5);
console.log(circle.radius);  // 5 (调用 getter)
circle.radius = 10;          // 调用 setter
console.log(circle.area);    // 314.159... (计算属性)


// ============================================
// 第六部分：静态成员
// ============================================

// 6.1 静态属性和方法属于类本身，不属于实例
class MathHelper {
    static PI: number = 3.14159;  // 静态属性

    static square(x: number): number {  // 静态方法
        return x * x;
    }

    static circleArea(radius: number): number {
        return MathHelper.PI * radius * radius;
    }
}

// 通过类名直接访问，不需要创建实例
console.log(MathHelper.PI);           // 3.14159
console.log(MathHelper.square(5));    // 25
console.log(MathHelper.circleArea(3)); // 28.274...


// ============================================
// 第七部分：抽象类
// ============================================

// 7.1 抽象类不能被实例化，只能被继承
abstract class Shape {
    abstract name: string;  // 抽象属性

    abstract getArea(): number;  // 抽象方法（没有实现）

    // 抽象类可以有具体实现的方法
    describe(): void {
        console.log(`这是一个 ${this.name}，面积是 ${this.getArea()}`);
    }
}

class Rectangle extends Shape {
    name = "矩形";

    constructor(
        private width: number,
        private height: number
    ) {
        super();
    }

    // 必须实现抽象方法
    getArea(): number {
        return this.width * this.height;
    }
}

class Triangle extends Shape {
    name = "三角形";

    constructor(
        private base: number,
        private height: number
    ) {
        super();
    }

    getArea(): number {
        return (this.base * this.height) / 2;
    }
}

const rect = new Rectangle(10, 5);
rect.describe();  // 输出: 这是一个 矩形，面积是 50

const tri = new Triangle(10, 6);
tri.describe();   // 输出: 这是一个 三角形，面积是 30


// ============================================
// 第八部分：接口与类
// ============================================

// 8.1 类实现接口
interface Flyable {
    fly(): void;
    altitude: number;
}

interface Swimmable {
    swim(): void;
    depth: number;
}

// 类可以实现多个接口
class Duck implements Flyable, Swimmable {
    altitude: number = 0;
    depth: number = 0;

    fly(): void {
        this.altitude = 100;
        console.log(`鸭子飞到了 ${this.altitude} 米高`);
    }

    swim(): void {
        this.depth = 2;
        console.log(`鸭子潜到了 ${this.depth} 米深`);
    }
}

const duck = new Duck();
duck.fly();   // 鸭子飞到了 100 米高
duck.swim();  // 鸭子潜到了 2 米深


// ============================================
// 第九部分：泛型类
// ============================================

// 9.1 泛型类 - 让类适用于多种类型
class Container<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    get(index: number): T {
        return this.items[index];
    }

    getAll(): T[] {
        return [...this.items];
    }
}

// 使用不同类型
const numberContainer = new Container<number>();
numberContainer.add(1);
numberContainer.add(2);
console.log(numberContainer.getAll());  // [1, 2]

const stringContainer = new Container<string>();
stringContainer.add("hello");
stringContainer.add("world");
console.log(stringContainer.getAll());  // ["hello", "world"]


// 9.2 泛型约束
interface HasId {
    id: number;
}

class Database<T extends HasId> {
    private records: Map<number, T> = new Map();

    save(record: T): void {
        this.records.set(record.id, record);
    }

    findById(id: number): T | undefined {
        return this.records.get(id);
    }
}

interface User extends HasId {
    id: number;
    name: string;
    email: string;
}

const userDb = new Database<User>();
userDb.save({ id: 1, name: "张三", email: "zhang@example.com" });
console.log(userDb.findById(1));  // { id: 1, name: "张三", email: "zhang@example.com" }


// ============================================
// 第十部分：实际应用示例
// ============================================

// 10.1 一个完整的待办事项管理类
interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
}

class TodoManager {
    private todos: TodoItem[] = [];
    private nextId: number = 1;

    // 添加待办事项
    add(title: string): TodoItem {
        const todo: TodoItem = {
            id: this.nextId++,
            title,
            completed: false,
            createdAt: new Date()
        };
        this.todos.push(todo);
        return todo;
    }

    // 完成待办事项
    complete(id: number): boolean {
        const todo = this.findById(id);
        if (todo) {
            todo.completed = true;
            return true;
        }
        return false;
    }

    // 删除待办事项
    remove(id: number): boolean {
        const index = this.todos.findIndex(t => t.id === id);
        if (index !== -1) {
            this.todos.splice(index, 1);
            return true;
        }
        return false;
    }

    // 查找待办事项
    private findById(id: number): TodoItem | undefined {
        return this.todos.find(t => t.id === id);
    }

    // 获取所有待办事项
    getAll(): TodoItem[] {
        return [...this.todos];
    }

    // 获取未完成的待办事项
    getPending(): TodoItem[] {
        return this.todos.filter(t => !t.completed);
    }

    // 获取已完成的待办事项
    getCompleted(): TodoItem[] {
        return this.todos.filter(t => t.completed);
    }
}

// 使用示例
const todoManager = new TodoManager();
todoManager.add("学习 TypeScript 类");
todoManager.add("完成项目作业");
todoManager.add("锻炼身体");

todoManager.complete(1);

console.log("所有待办:", todoManager.getAll());
console.log("未完成:", todoManager.getPending());
console.log("已完成:", todoManager.getCompleted());


// ============================================
// 知识点总结
// ============================================
/*
1. 基础类：属性、构造函数、方法
2. 访问修饰符：public、private、protected、readonly
3. 构造函数简写：参数属性
4. 继承：extends、super、方法重写
5. Getter/Setter：属性访问控制
6. 静态成员：static 属性和方法
7. 抽象类：abstract 类和方法
8. 接口实现：implements 关键字
9. 泛型类：类型参数化
10. 实际应用：组合以上知识

提示：
- private 成员只能在类内部访问
- protected 成员可以在子类中访问
- readonly 成员只能在构造函数中赋值
- abstract 类不能被实例化
- 子类必须实现父类的所有 abstract 方法
*/
