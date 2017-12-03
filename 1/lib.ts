export function process(input: string) {
    const b = strToNumArr(input);
    const b1 = shiftN(1)(b);
    const c = zip(b)(b1);
    const val = c.reduce(myReducer, 0);
    // console.log(input,b,b1);
    return val;
}

export function processB(input: string) {
    const b = strToNumArr(input);
    const n = b.length / 2;
    const b1 = shiftN(n)(b);
    const c = zip(b)(b1);
    const val = c.reduce(myReducer, 0);
    return val;
}

const strToNumArr = xs => xs.split('').map(i => parseInt(i, 10));
const shiftN = n => xs => {
    const ys1 = xs.slice(n);
    const ys2 = xs.slice(0, n);
    const ys = ys1.concat(ys2);
    // console.log(xs, n, ys1, ys2, ys);
    return ys;
};
const zip = as => bs => as.map((e, i) => [e, bs[i]]);

const myReducer = (acc, currVal) => {
    // console.log(acc, currVal);
    if (currVal[0] === currVal[1]) { return acc + currVal[0]; } else { return acc; }
};
