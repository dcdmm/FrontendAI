// ============================================
// 6. 接口继承 (extends)
// ============================================
// 接口可以继承其他接口，实现复用

interface Shape {
    color: string;
}

interface Size {
    width: number;
    height: number;
}

// 继承单个接口
interface Square extends Shape {
    sideLength: number;
}

// 继承多个接口
interface Rectangle extends Shape, Size {
    // 自动拥有 color, width, height
}

const square: Square = {
    color: "red",
    sideLength: 10
};

const rectangle: Rectangle = {
    color: "blue",
    width: 20,
    height: 10
};

console.log("6. 接口继承:", square, rectangle);


// ============================================
// 7. 索引签名（动态属性）
// ============================================
// 当你不确定对象会有哪些属性名时使用

interface StringDictionary {
    [key: string]: string;   // 任意字符串键，值为字符串
}

const dict: StringDictionary = {
    hello: "你好",
    world: "世界",
    typescript: "类型脚本"
};

interface NumberArray {
    [index: number]: string;  // 数字索引，值为字符串
}

const arr: NumberArray = ["苹果", "香蕉", "橙子"];

console.log("7. 索引签名:", dict, arr[0]);


// ============================================
// 8. 混合类型
// ============================================
// 同时具备属性和可调用

interface Counter {
    (start: number): void;    // 可调用
    count: number;            // 属性
    increment(): void;        // 方法
    reset(): void;
}

function createCounter(): Counter {
    const counter = function (start: number) {
        counter.count = start;
    } as Counter;

    counter.count = 0;
    counter.increment = function () {
        counter.count++;
    };
    counter.reset = function () {
        counter.count = 0;
    };

    return counter;
}

const myCounter = createCounter();
myCounter(10);                    // 调用，设置初始值
myCounter.increment();            // 方法调用
console.log("8. 混合类型:", myCounter.count);


// ============================================
// 9. 接口 vs 类
// ============================================
// 类可以实现(implements)接口

interface Vehicle {
    brand: string;
    speed: number;

    accelerate(amount: number): void;

    brake(): void;
}

class Car implements Vehicle {
    brand: string;
    speed: number = 0;

    constructor(brand: string) {
        this.brand = brand;
    }

    accelerate(amount: number): void {
        this.speed += amount;
        console.log(`${this.brand} 加速到 ${this.speed} km/h`);
    }

    brake(): void {
        this.speed = 0;
        console.log(`${this.brand} 已刹车`);
    }
}

const myCar = new Car("特斯拉");
myCar.accelerate(60);
myCar.brake();


// ============================================
// 10. 泛型接口
// ============================================
// 接口可以使用泛型，使其更加灵活

interface Response<T> {
    code: number;
    message: string;
    data: T;
}

// 不同类型的响应
const userResponse: Response<User> = {
    code: 200,
    message: "success",
    data: {
        username: "test",
        email: "test@test.com"
    }
};

const numberResponse: Response<number[]> = {
    code: 200,
    message: "success",
    data: [1, 2, 3, 4, 5]
};

console.log("10. 泛型接口:", userResponse, numberResponse);


// ============================================
// 11. 接口合并（声明合并）
// ============================================
// 同名接口会自动合并

interface Box {
    width: number;
}

interface Box {
    height: number;
}

interface Box {
    depth: number;
}

// 三个 Box 接口合并为一个
const box: Box = {
    width: 10,
    height: 20,
    depth: 30
};

console.log("11. 接口合并:", box);


// ============================================
// 12. 实际应用示例：API 响应处理
// ============================================

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: number;
        message: string;
    };
    timestamp: Date;
}

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}

// 模拟 API 调用
function fetchProduct(id: number): ApiResponse<Product> {
    // 模拟成功响应
    return {
        success: true,
        data: {
            id: id,
            name: "MacBook Pro",
            price: 12999,
            category: "电子产品"
        },
        timestamp: new Date()
    };
}

const productResponse = fetchProduct(1);
if (productResponse.success && productResponse.data) {
    console.log("12. API 示例 - 产品:", productResponse.data.name);
}

