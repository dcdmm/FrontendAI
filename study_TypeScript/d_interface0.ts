// 定义对象结构
interface User {
    username: string; // 必须属性
    readonly email: string; // 只读属性(初始化后不能被修改)
    phone?: string; // 可选属性
    address?: string;
}

const user1: User = {
    username: "john_doe",
    email: "john@example.com"
};
console.log(user1)
const user2: User = {
    username: "jane_doe",
    email: "jane@example.com",
    phone: "13800138000"
};
console.log(user2)

// ========================================================================================

// 定义函数结构
interface Calculator {
    (a: number, b: number): number;
}

const add: Calculator = (a, b) => a + b;
const subtract: Calculator = (a, b) => a - b;
console.log(add(1, 2))
console.log(subtract(5, 3))


// ========================================================================================

// 接口中定义方法
interface Animal {
    name: string;
    age: number;

    speak(): void; // 必须方法

    move(distance: number): string;

    fly?(height: number): string;  // 可选方法
}

const dog: Animal = {
    name: "小黑",
    age: 3,
    speak() {
        console.log("汪汪汪!");
    }, // 必须实现
    move(distance) {
        return `${this.name}跑了${distance} 米`;
    },
    fly(height) {
        return `${this.name}飞到了${height} 米高`;
    } // 可选,可以不实现
};

dog.speak();
console.log(dog.move(100));
console.log(dog.fly?.(100))

// ========================================================================================

interface Vehicle {
    id: number;
    brand: string;
    speed: number;
    price?: string;

    accelerate(amount: number): void;

    brake?(): void;
}

// 类实现接口(可以实现多个接口)
class Car implements Vehicle {
    id: number;
    brand: string;
    speed: number = 0; // 直接初始化(必须)属性

    constructor(id: number, brand: string) {
        this.id = id; // 在构造函数中(必须)初始化属性
        this.brand = brand;
    }


    accelerate(amount: number): void {
        this.speed += amount;
        console.log(`${this.brand}加速到 ${this.speed} km/h`);
    }

    brake(): void {
        this.speed = 0;
        console.log(`${this.brand}已刹车`);
    }
}

const myCar = new Car(1, "特斯拉");
myCar.accelerate(60);
myCar.brake?.();

