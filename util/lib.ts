export const range = (from: number) => (to: number) => [...Array((to-from +1)).keys()].map(t => t+from);

export const assertNever = (x: never): never => {
    throw new Error('Unexpected object: ' + x);
};

export const sum = (a,b) => a + b;
