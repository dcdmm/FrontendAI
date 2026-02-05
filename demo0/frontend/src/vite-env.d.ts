interface ImportMetaEnv {
    readonly VITE_API_URL?: string
} // 同名接口(node_modules\vite\types\importMeta.d.ts)自动合并

/**
 * The type of `import.meta`.
 *
 * If you need to declare that a given property exists on `import.meta`,
 * this type may be augmented via interface merging.
 */
// interface ImportMeta {
// }