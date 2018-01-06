type map2Callback<T,U> = (val: T,rowI,colI) => U;

export const range = (from: number) => (to: number) => [...Array((to-from +1)).keys()].map(t => t+from);

export const assertNever = (x: never): never => {
    throw new Error('Unexpected object: ' + x);
};

export const sum = (a,b) => a + b;

export const map2 = <T,U>(callbak: map2Callback<T,U>) => (ts: T[][]) =>
        ts.map((row, rowI) => row.map((val,colI) => callbak(val,rowI,colI)));

export const chunk = (size: number) => arr => {
    const res = arr.reduce((acc, curr, i) => {
        if (!(i % size)) {
            acc.push(arr.slice(i, i + size));
        }
        return acc;
        }, []);
    return res;
};

export const flatten = <T>(arrs: T[][]): T[] => [].concat(...arrs);

export const applyNTimes = <T>(f: (a: T) => T) => (n: number) => (t: T): T => {
    if (n <= 0) {
        return t;
    } else {
        let tmp = t;
        for (let i = 0; i < n; i++) {
            tmp = f(tmp);
        }
        return tmp;
    }
};
