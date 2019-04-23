/**
 * Remove keys of one interface from another
 */
export type Subtract<T1, T2> = Pick<T1, Exclude<keyof T1, keyof T2>>;

/**
 * Get resolved promise value
 *
 * UnPromisfy<Promise<string>> => string
 */
export type UnPromisfy<T> = T extends Promise<infer U> ? U : T;

type DeepReadonlyObject<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

export type DeepReadonly<T> = T extends Array<infer E> ? ReadonlyArray<DeepReadonlyObject<E>> : T extends object ? DeepReadonlyObject<T> : T;
