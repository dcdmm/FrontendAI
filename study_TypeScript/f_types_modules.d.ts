declare const APP_VERSION_m: string;
declare let DEBUG_MODE_m: boolean;

declare function log_m(message: string): string;

interface User_m {
    id: number;
    name: string;
    email: string;
    age?: number;
}

type UserId_m = number | string;

declare namespace MyApp_m {
    interface Config {
        timeout: number;
        retries: number;
    }

    function initialize(config: Config): void;
    function destroy(): void;

    class Storage {
        get(key: string): string | null;
        set(key: string, value: string): void;
        remove(key: string): void;
    }
}

declare module 'my-library_m' {
    export function helper(input: string): string;
    export class Calculator {
        add(a: number, b: number): number;
        subtract(a: number, b: number): number;
    }
}

declare module 'express' {
    interface Request {
        user?: User;
    }
}

export { };
