const version = APP_VERSION; // 自动可用

const msg = log("hello");

const user: User = {
    id: 1,
    name: "张三",
    email: "test@example.com"
};

const id: UserId = 123;

import { helper, Calculator } from 'my-library'; // 需通过import导入
const message = helper("TypeScript");

// ******************************************************************

import { APP_VERSION_m, DEBUG_MODE_m, User_m } from './f_types_modules'

const version_m = APP_VERSION_m; // 需通过import导入

const user_m: User_m = {
    id: 1,
    name: "张三",
    email: "test@example.com"
};

const id_m: UserId_m = 123; // 也可以自动可用