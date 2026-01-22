class Point {
    x: number;
    y: number;
    readonly z: number;  // 只读属性(初始化后不能被修改)

    // 构造函数
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z
    }

    // 方法
    print(): void {
        console.log(`(${this.x}, ${this.y})`);
    }

    scale(n: number): void {
        this.x *= n;
        this.y *= n;
    }

    static x = 0; // 静态属性

    // 静态方法
    static printX() {
        console.log(Point.x);
    }
}

const pt = new Point();
pt.print();
pt.x = 10;
pt.print();
pt.scale(2);
pt.print();
// 可以通过类名直接访问静态属性和方法
console.log(Point.x);
Point.printX();

class Animal {
    move() {
        console.log("Moving along!");
    }

    print() {
        console.log("Hello, world!");
    }
}

class Dog extends Animal {
    woof(times: number) {
        for (let i = 0; i < times; i++) {
            console.log("woof!");
        }
    }

    // 方法重写(Override)
    print(name?: string) {
        if (name === undefined) {
            super.print();
        } else {
            console.log(`Hello, ${name.toUpperCase()}`);
        }
    }
}

const d = new Dog();
d.move();
d.woof(2);
d.print();
d.print("reader");