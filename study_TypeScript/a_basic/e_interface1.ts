interface Shape {
    color: string;
}

interface Size {
    width: number;
    height: number;
}

// 接口继承
interface Square extends Shape {
    sideLength: number;
}

interface Rectangle extends Shape, Size {
    // 自动拥有color, width, height属性
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

// 接口合并(同名接口会自动合并)
interface Box {
    width: number;
}

interface Box {
    height: number;
}

interface Box {
    depth: number;
}

const box: Box = {
    width: 10,
    height: 20,
    depth: 30
};
console.log(box);