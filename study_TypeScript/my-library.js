function helper(input) {
    return `已处理: ${input}`;
}

class Calculator {
    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }
}

export { helper, Calculator };
