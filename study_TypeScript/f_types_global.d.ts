// 全局类型声明文件(可直接使用,无需导入): 无任何import/export语句

// 全局接口
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
}

// 全局类型定义
type UserId = number | string;