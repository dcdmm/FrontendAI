// A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.


let arr1: [string, number] // 第一个元素必须是string类型,第二个元素必须是number类型
let arr2: [number, boolean?] // 第一个元素必须是number类型,第二个元素可选(如果存在必须是boolean类型)
let arr3: [number, ...string[]] // 第一个元素必须是number类型,后面是任意数量的string类型

arr1 = ["hello", 123]
arr2 = [100, false]
arr2 = [200]
arr3 = [100, "hello", "world"]
arr3 = [100, "hello", 'world', 'typescript']
console.log(arr3[0], arr3[1], arr3[2], arr3[3], arr3[4])
console.log(arr3)