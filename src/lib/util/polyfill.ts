/** Purely writing this because older versions of Node don't support .at() */
export const getLastArrayItem = <T>(arr: Array<T>): T | undefined => arr[arr.length - 1];
