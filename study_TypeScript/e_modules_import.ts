import { count } from 'node:console';
import {add, PI, subtract, User, Calculator, VERSION, AUTHOR, multiply} from './e_modules_export';
// 重命名导入
import {divide as divide_as} from './e_modules_export';


let result_d = divide_as(10, 2);
console.log(`10 / 2 = ${result_d}`);

// 所有导出的内容放在eme对象里(避免命名冲突)
import * as eme from './e_modules_export';
let add_r = eme.add(5, 7);
let sub_r = eme.subtract(10, 3);
let div_r = eme.divide(20, 4);
console.log(sub_r, add_r, div_r, eme.PI);

const user: User = {
    id: 1,
    name: "张三",
    email: "test@example.com"
}; // 直接可用

const id: UserId = 123;