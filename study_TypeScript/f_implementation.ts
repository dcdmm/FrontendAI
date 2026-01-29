/**
 * 实现文件 - 为 f_types_global.d.ts 中声明的全局变量和函数提供实际实现
 * .d.ts 文件只声明类型，这个文件提供实际的值和逻辑
 */

// ============================================
// 1. 实现全局变量
// ============================================
(globalThis as any).APP_VERSION = "1.0.0";
(globalThis as any).API_BASE_URL = "https://api.example.com";
(globalThis as any).DEBUG_MODE = true;

// ============================================
// 2. 实现全局函数
// ============================================
(globalThis as any).log = function(message: string): string {
    console.log(`[LOG] ${message}`);
    return message;
};

(globalThis as any).formatDate = function(date: Date): string {
    return date.toLocaleDateString('zh-CN');
};

// ============================================
// 3. 实现全局命名空间 MyApp
// ============================================
(globalThis as any).MyApp = {
    initialize(config: { timeout: number; retries: number }): void {
        console.log(`MyApp 初始化完成，配置:`, config);
    },
    
    destroy(): void {
        console.log('MyApp 已销毁');
    },
    
    Storage: class {
        private storage: Map<string, string> = new Map();
        
        get(key: string): string | null {
            return this.storage.get(key) || null;
        }
        
        set(key: string, value: string): void {
            this.storage.set(key, value);
        }
        
        remove(key: string): void {
            this.storage.delete(key);
        }
    }
};

// ============================================
// 4. 实现 my-library 模块（模拟第三方库）
// ============================================
// 注意：在实际项目中，这应该是一个真实的 npm 包
// 这里为了演示，我们创建一个简单的实现

export function helper(input: string): string {
    return `处理后的结果: ${input.toUpperCase()}`;
}

export class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }
    
    subtract(a: number, b: number): number {
        return a - b;
    }
}

console.log('✅ 全局变量和函数已初始化');
