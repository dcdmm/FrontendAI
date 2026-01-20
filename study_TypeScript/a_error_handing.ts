function divide(a: number, b: number): number {
    if (b === 0) {
        throw new Error('不能除以0'); // Use the throw statement to throw an exception.
    }
    return a / b;
}

try {
    const result = divide(10, 0);
    console.log(result);
} catch (error) {
    if (error instanceof Error) {
        console.log('出错了:', error.message);
    } else {
        console.log('出错了:', String(error));
    }
}