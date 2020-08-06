export type Lazy<T extends unknown> = Promise<T> | T;
