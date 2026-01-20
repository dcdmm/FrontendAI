let nums: number[] = [1, 2, 3, 4, 5];
// The map() method of Array instances creates a new array populated with the results of calling a provided function on every element in the calling array.
let doubled = nums.map(n => n * 2);
console.log(doubled); // print->[2, 4, 6, 8, 10]

let evens = nums.filter(n => n % 2 === 0);
console.log(evens); // print->[2, 4]

// The filter() method of Array instances creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.
let sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log("reduce (求和):", sum); // 15

// he reduce() method of Array instances executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.
let max = nums.reduce((a, b) => a > b ? a : b);
console.log(max); // 5

// The find() method of Array instances returns the first element in the provided array that satisfies the provided testing function.
let found = nums.find(n => n > 3);
console.log(found);

