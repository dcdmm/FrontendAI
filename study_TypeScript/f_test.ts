const version = APP_VERSION; // 自动可用

const msg = log("hello");

const user: User = {
    id: 1,
    name: "张三",
    email: "test@example.com"
};

const id: UserId = 123;

import { helper, Calculator } from 'my-library';
const message = helper("TypeScript");


// ******************************************************************

import APP_VERSION_m, { DEBUG_MODE_m } from './f_types_modules'

const version_m = APP_VERSION_m; // 需import导入

const user_m: User_m = {
    id: 1,
    name: "张三",
    email: "test@example.com"
}; // 也可以自动可用(通过declare global添加到全局作用域)

const id_m: UserId_m = 123;