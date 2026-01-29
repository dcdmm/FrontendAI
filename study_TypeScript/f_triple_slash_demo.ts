/**
 * 三重斜杠指令使用示例
 * 
 * 重要说明：
 * 1. .d.ts 文件只声明类型，不提供实际值
 * 2. 运行代码前需要先导入实现文件
 * 3. 三重斜杠指令告诉 TypeScript 类型在哪里
 */

/// <reference path="f_types_global.d.ts" />

// ============================================
// 步骤1: 导入实现文件（提供实际的值和函数）
// ============================================
import './f_implementation';

// ============================================
// 步骤2: 现在可以使用全局变量了
// ============================================
console.log(`应用版本: ${APP_VERSION}`);
console.log(`调试模式: ${DEBUG_MODE}`);

// ============================================
// 使用全局函数
// ============================================
const today = log("今天是个好日子!");
console.log(`返回值: ${today}`);

// ============================================
// 使用全局接口和类型
// ============================================
const user: User = {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com",
    age: 25
};
console.log(`用户:`, user);

const userId: UserId = "user-123";
console.log(`用户ID: ${userId}`);

// ============================================
// 使用全局命名空间
// ============================================
MyApp.initialize({
    timeout: 5000,
    retries: 3
});

const storage = new MyApp.Storage();
storage.set("username", "张三");
const username = storage.get("username");
console.log(`从存储中获取: ${username}`);

// ============================================
// 使用 my-library 模块（从实现文件导入）
// ============================================
import { helper, Calculator } from './f_implementation';

const result = helper("Hello TypeScript");
console.log(result);

const calc = new Calculator();
console.log(`10 + 20 = ${calc.add(10, 20)}`);
console.log(`30 - 15 = ${calc.subtract(30, 15)}`);

console.log('\n✅ 所有示例执行完成！');