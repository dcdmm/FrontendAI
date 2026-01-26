function identity<T>(arg: T): T {
    return arg;
}

// 泛型函数
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const p1 = pair("name", 25);
const p2 = pair<string, boolean>("active", true);
console.log(p1, p2);


// 泛型接口
interface Container<T> {
    value: T;
    getValue(): T;
}

const numberContainer: Container<number> = {
    value: 100,
    getValue() {
        return this.value;
    }
};
const stringContainer: Container<string> = {
    value: "Hello Generics",
    getValue() {
        return this.value;
    }
};
console.log(numberContainer.getValue());
console.log(stringContainer.getValue());


// 泛型类
class Box<T> {
    private content: T;

    constructor(value: T) {
        this.content = value;
    }

    getContent(): T {
        return this.content;
    }

    setContent(value: T): void {
        this.content = value;
    }
}

const numberBox = new Box<number>(42);
console.log(numberBox.getContent());
const stringBox = new Box("TypeScript");
console.log(stringBox.getContent());


interface HasLength {
    length: number;
}


// 泛型约束(T必须有length属性(鸭子类型))
function logLength<T extends HasLength>(arg: T): number {
    console.log(arg.length);
    return arg.length;
}

logLength("hello"); // 字符串具有length属性
logLength([1, 2, 3]); // 数组具有length属性
logLength({ length: 10 }); // 这个对象具有length属性
// logLength(123); // number没有length属性

// 泛型约束(T必须是string或number类型)
function processValue<T extends string | number>(value: T): T {
    console.log(value);
    return value;
}

processValue("hello");
processValue(42);
// processValue(true);
