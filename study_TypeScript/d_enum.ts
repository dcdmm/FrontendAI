// Enums allow a developer to define a set of named constants.

// 数值枚举
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

console.log(Direction.Up);
console.log(Direction.Down);
console.log(Direction.Left);
console.log(Direction.Right);
console.log(Direction);

// 字符串枚举
enum Direction1 {
    Up = "u",
    Down = "p",
    Left = "l",
    Right = "r",
}

console.log(Direction1.Up);
console.log(Direction1.Down);
console.log(Direction1.Left);
console.log(Direction1.Right);
console.log(Direction1);