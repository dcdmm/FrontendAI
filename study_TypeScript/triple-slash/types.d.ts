interface User {
    id: number;
    name: string;
    email: string;
}

declare module '*.png' {
    const src: string
    export default src
}
