export const parseIntList = (raw: string) => raw.split(',').map(n => parseInt(n, 10));
export const take = <T>(arr: T[]) => (n: number) => arr.slice(0, n);
export const makeLoop = nrOfItems => [...Array(nrOfItems).keys()];
type knotHashString = { list: number[], currentPosition: number, skipSize: number};

export const shiftLoop = (arr: number[]) => (rawShift: number) => {
    const shift = rawShift % arr.length;
    const head = arr.slice(0, shift);
    const tail = arr.slice(shift);
    return tail.concat(head);
};

export const twistSubLoop = (arr: number[]) => len => {
    const subLoop = arr.slice(0, len);
    subLoop.reverse(); // makes this in place! side effect! X-(
    const tail = arr.slice(len);
    return subLoop.concat(tail);
    };

export const stepOne = (kHS: knotHashString) => twistLen => {
        const a = shiftLoop(kHS.list)(kHS.currentPosition);
        const b = twistSubLoop(a)(twistLen);
        const list = shiftLoop(b)(-kHS.currentPosition);
        const skipSize = kHS.skipSize + 1;
        const currentPosition = (kHS.currentPosition + twistLen + skipSize - 1) % list.length;
        const ret: knotHashString = {list, currentPosition, skipSize};
        return ret;
    };

export const knotHashRound = (lens: number[]) => (kSH: knotHashString) => {
        const myReducer = (kHS: knotHashString, currentLen: number) => {
            const c: knotHashString = stepOne(kHS)(currentLen);
            return c;
        };
        const b: knotHashString = lens.reduce(myReducer, kSH);
        return b;
};

export const parseAsciiInput = (s: string) => s.split('').map(v => v.charCodeAt(0)).concat([17, 31, 73, 47, 23]);

export const repeat = <T>(f: (a: T)=>T) => (t: number) => (a: T) => {
    const ret: T = t > 0 ? repeat(f)(t - 1)(f(a)) : a;
    return ret;
};

export const chunk = (size: number) => arr => {
    const res = arr.reduce((acc, curr, i) => {
        if (!(i % size)) {
          acc.push(arr.slice(i, i + size));
        }
        return acc;
      }, []);
    return res;
};

export const bitXorReduce = (nums: number[]) => nums.reduce((acc,curr) => acc ^ curr);

export const knotHash = (input: string) => {
    const data = parseAsciiInput(input);
    const kHS = {list: makeLoop(256), currentPosition: 0, skipSize: 0};
    const b = repeat(knotHashRound(data))(64)(kHS);
    const sparseHash = b.list;
    const c = chunk(16)(b.list);
    const denseHash = c.map(bitXorReduce).map(dec => ('00' + dec.toString(16)).substr(-2)).join('');
    return denseHash;
};
