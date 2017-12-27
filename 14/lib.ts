import { knotHash, take } from '../10/lib';
import { range } from '../util/lib';

export const hexCharToBinArray = (char: string) => ('0000' + parseInt(char,16).toString(2)).substr(-4).split('');

export const generateHashDisk = (input: string) => {
    const seeds = range(0)(127).map(n => input + '-' + n);
    const hashes = seeds.map(knotHash);
    const reRepresentHexStringAsBinArray = (hash: string) => {
        const hexChars = hash.split('');
        const hashAsBits = concatMap(hexCharToBinArray)(hexChars);
        // console.log(hexChars.length)
        // console.log(hashAsBits.length)
        return hashAsBits;
    };
    const dsBits: string[][] = hashes.map(reRepresentHexStringAsBinArray);

    const dsState: diskState = dsBits.map(row => row.map(elem => {
        if(elem === '1') { return '#';} else {return '.';}
    }));
    return dsState;
};

const concat = <T>(xs: T[],ys: T[]) => xs.concat (ys);
export const concatMap: <T,S>(f: (t: T) => S[]) => (ts: T[]) => S[]
                        = f => ts => ts.map(f).reduce(concat, []);

const sum = (a,b) => a+b;
export const sumFromDiskState = (dS: diskState) =>
        dS.map(row =>
            row.map(elem => {
                if (elem === '.') {
                    return 0;
                } else {
                    return 1;
                }
            }).reduce(sum),
        ).reduce(sum);

// n.b. coordinates are chosen so that x denotes row starting at 0 at the top.
// y coordinate is column number, starting at 0 to the left.
// proper access is val = diskState[x][y];
// . = empty cells
// # = filled cell, missing region label
// 7 = filled cell, with region label 7
type diskStateRow = Array< '.' | '#' | number >;
export type diskState = diskStateRow[];
type coord = {x,y};

export const getUnlabelledCoords = (ds: diskState) => {
    const ret: coord[] = [];
    ds.forEach((row,x) =>
        row.forEach((state,y) => {
            if(state === '#') { ret.push({x,y});}
        }),
    );
    return ret;
};

export const labelNewRegion = (ds: diskState) => ({x,y}: coord) => {
    if (ds[x][y] !== '#') {
        return ds;
    }

    const newRegion = regionMaxNo(ds) + 1;

    const ds2 = labelRegion(ds)({x,y})(newRegion);
    return ds2;
};

export const labelRegion = (ds: diskState) => ({x,y}: coord) => (label: number) => {

    const xMax = ds.length - 1;
    if (x > xMax) { return ds; }
    const yMax = ds[x].length -1;
    if (y > yMax) { return ds;}
    if (ds[x][y] !== '#') { return ds; }

    let ds2: diskState = arrayClone(ds);
    ds2[x][y] = label;
    if (x - 1 >= 0) {ds2 = labelRegion(ds2)({x:x-1,y    })(label);}
    if (x + 1 <= xMax) {ds2 = labelRegion(ds2)({x:x+1,y    })(label);}
    if (y - 1 >= 0) {ds2 = labelRegion(ds2)({x,y:y-1    })(label);}
    if (y +1 <= yMax) {ds2 = labelRegion(ds2)({x,y:y+1    })(label);}
    return ds2;
};

export const regionMaxNo = (ds: diskState) => {
    const onlyNumberElems = (row: diskStateRow) => {
        const getNumbers = (elem): elem is number => typeof elem === 'number';
        const row2: number[] = row.filter(getNumbers);
        return row2;
    };
    const onlyNumbersInRows = ds.map(onlyNumberElems);
    const flattenedNumbers: number[] = [].concat.apply([], onlyNumbersInRows);
    if (flattenedNumbers.length >= 1) {
        return Math.max(...flattenedNumbers);
    } else {
        return 0;
    }
};

export const arrayClone = arr => {
    let i;
    let copy;
    if(Array.isArray(arr)) {
        copy = arr.slice(0);
        for(i = 0; i < copy.length; i++) {
            copy[ i ] = arrayClone(copy[ i ]);
        }
        return copy;
    } else if(typeof arr === 'object') {
        throw new Error('Cannot clone array containing an object!');
    } else {
        return arr;
    }
};
