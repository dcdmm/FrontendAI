const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
// The spread (...) syntax allows an iterable, such as an array or string, to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected.
const merged = [...arr1, ...arr2];
console.log(merged); // print->[1, 2, 3, 4, 5, 6]

const inserted = [0, ...arr1, ...[4], 5];
console.log(inserted); // print->[0, 1, 2, 3, 4, 5]

const original = [1, 2, 3];
const copy = [...original]; // 浅拷贝
copy.push(4);
console.log(original); // print->[1, 2, 3]
console.log(copy);     // print->[1, 2, 3, 4]

const original1 = [{name: "Alice"}, {name: "Bob"}]; // 数组内包含对象
const copy1 = [...original1]; // 浅拷贝
copy1[0].name = "Tom"
console.log(original1); // print->[ { name: 'Tom' }, { name: 'Bob' } ]
console.log(copy1); // print->[ { name: 'Tom' }, { name: 'Bob' } ]

const defaults = {theme: "light", lang: "zh", fontSize: 14};
const userConfig = {theme: "dark", fontSize: 16};
const finalConfig = {...defaults, ...userConfig}; // 对象合并(后面的属性会覆盖前面的同名属性)
console.log(finalConfig); // print->{ theme: "dark", lang: "zh", fontSize: 16 }

const user = {name: "Alice", age: 25};
const userCopy = {...user};
userCopy.name = "Bob";
console.log(user.name);     // print->"Alice"
console.log(userCopy.name); // print->"Bob"