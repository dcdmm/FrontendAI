const fruitSet: Set<string> = new Set(['apple', 'banana', 'apple']);
console.log(fruitSet);

console.log(fruitSet.size);

fruitSet.add('apple').add('banana').add('orange');
console.log(fruitSet);

console.log('是否有apple:', fruitSet.has('apple'));
console.log('是否有grape:', fruitSet.has('grape'));

const deleted = fruitSet.delete('banana');
console.log('删除banana成功:', deleted);
console.log('删除后的Set:', fruitSet);
const deleteFailed = fruitSet.delete('grape');
console.log('删除graph(不存在的元素):', deleteFailed);

fruitSet.clear();
console.log('清空后:', fruitSet);

let colorSet = new Set<string>(['red', 'green', 'blue']);
// foreach遍历
colorSet.forEach((value) => {
    console.log(value);
});
