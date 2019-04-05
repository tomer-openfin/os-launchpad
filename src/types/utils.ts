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
