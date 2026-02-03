import {greet, add} from 'my-custom'

console.log(greet('TypeScript'))
console.log(add(1, 2))
// 编译器报错:TS2345: Argument of type string is not assignable to parameter of type numbe
// console.log(add("1", 2) )

import data from './test.json'

console.log(data.name)
console.log(data.version)
console.log(data.tags)
// 编译器报错:TS2339: Property age does not exist on type MyDataContent
// console.log(data.age)