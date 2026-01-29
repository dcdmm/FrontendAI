/**
 * 三重斜杠指令（Triple-Slash Directives）使用示例
 * 
 * 三重斜杠指令是包含单个 XML 标签的单行注释
 * 必须放在文件的最顶部，之前只能有注释
 */

// ============================================
// 1. /// <reference path="..." />
//    引用另一个 .d.ts 文件，建立文件之间的依赖关系
// ============================================
/// <reference path="f_types_global.d.ts" />

// ============================================
// 2. /// <reference types="..." />
//    声明对某个包的依赖（通常用于 @types/* 包）
// ============================================
/// <reference types="node" />

// ============================================
// 3. /// <reference lib="..." />
//    引用内置的库定义文件
// ============================================
/// <reference lib="es2015" />
/// <reference lib="dom" />

// ============================================
// 现在可以使用引用的类型了
// ============================================

// 使用 f_types_global.d.ts 中声明的全局变量
console.log(`应用版本: ${APP_VERSION}`);
console.log(`API 地址: ${API_BASE_URL}`);
DEBUG_MODE = true;

// 使用全局函数
log("这是一条日志消息");
const today = formatDate(new Date());

// 使用全局接口
const user: User = {
  id: 1,
  name: "张三",
  email: "zhangsan@example.com",
  age: 25
};

const product: Product = {
  id: "P001",
  title: "笔记本电脑",
  price: 5999.99,
  inStock: true
};

// 使用全局类型别名
const userId: UserId = "user-123";
const status: Status = "success";

// 使用全局命名空间
MyApp.initialize({
  timeout: 5000,
  retries: 3
});

const storage = new MyApp.Storage();
storage.set("username", "张三");
const username = storage.get("username");

// 使用导入的类型（来自 f_types_utils.d.ts）
import { request, HttpClient, type RequestOptions, type ApiResponse } from './f_types_utils';

// 使用导入的接口
const options: RequestOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

// 使用导入的函数类型
async function fetchUser(id: number): Promise<ApiResponse<User>> {
  return request<User>(`/api/users/${id}`, options);
}

// 使用导入的类
const client = new HttpClient('https://api.example.com');

// ============================================
// 其他三重斜杠指令（较少使用）
// ============================================

// /// <reference no-default-lib="true"/>
// 指示此文件不使用默认库（如 lib.d.ts）

// /// <amd-module name="..." />
// 指定 AMD 模块的名称

// /// <amd-dependency path="..." />
// 声明 AMD 模块的依赖

console.log("三重斜杠指令示例执行完成");

export { user, product, userId, status };
