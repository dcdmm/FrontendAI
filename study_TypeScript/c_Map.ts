const userMap = new Map<string, any>();

// The set() method of Map instances adds a new entry with a specified key and value to this Map, or updates an existing entry if the key already exists.
userMap.set('id', 1001); // 添加
userMap.set('name', '李四');
userMap.set('email', 'lisi@example.com');
console.log(userMap);
userMap.set('name', '李四（已修改）'); // 更新
console.log(userMap);

console.log('Map大小:', userMap.size);

console.log(userMap.keys())
console.log(userMap.values())
// The entries() method of Map instances returns a new map iterator object that contains the [key, value] pairs for each element in this map in insertion order.
console.log(userMap.entries())

console.log('获取name:', userMap.get('name'));
console.log('获取age:', userMap.get('age'));
console.log('获取不存在的键:', userMap.get('notExist')); // print->undefined

console.log('是否有name键:', userMap.has('name'));
console.log('是否有password键:', userMap.has('password'));

console.log('删除存在的键:', userMap.delete('role'));
console.log('删除不存在的键:', userMap.delete('notExist')); // false

// The clear() method of Map instances removes all elements from this map.
userMap.clear();
console.log(userMap);

const productMap = new Map([
    ['P001', {name: '笔记本电脑', price: 5999}],
    ['P002', {name: '鼠标', price: 99}],
    ['P003', {name: '键盘', price: 299}]
]);
// foreach遍历
productMap.forEach((value, key) => {
    console.log(`  ${key}: ${value.name} - ¥${value.price}`);
});
