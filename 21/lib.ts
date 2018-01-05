import { map2, sum, chunk } from '../util/lib';

export const parseStringMappings = (raw: string): Array<[string,string]> =>
    raw.trim()
        .split(/\r?\n/)
        .map(line => {
            const tmp: string[] = line.split(' => ');
            const ret: [string,string] = [tmp[0],tmp[1]];
            return ret;
        });

const processRow = (row: string): boolean[] => row.split('').map(processCell);

const processCell = cell => {
    if (cell === '#') {
        return true;
    } else {
        if (cell !== '.') {throw new Error('Bad image string');}
        return false;
    }
};

export class Ruleset {
    public readonly rules: FractalArtImageMapping[];
    constructor(rules: FractalArtImageMapping[]) {
        this.rules = flatten(rules.map(mapping => mapping.multiply()));
    }

}

export class FractalArtImage {
    public readonly size: number;
    public readonly id: string;
    public readonly data: boolean[][];
    constructor(input: string | boolean[][]) {
        this.data = (typeof input === 'string') ? input.split('/').map(processRow) : input;
        this.size = this.data.length;

        this.id = JSON.stringify(this.data); // super bad but still a unique val.... this could be some hash instead..

        this.data.forEach(row => {
            if (row.length !== this.size) { throw new Error('Bad shape - not square'); }
        });
    }

    public rotateCW(): FractalArtImage {
        const retData = rotate2DArrCW(this.data);
        const ret = new FractalArtImage(retData);
        return ret;
    }
    public flipRows(): FractalArtImage {
        const retData = flip2DArrRows(this.data);
        const ret = new FractalArtImage(retData);
        return ret;
    }
    public allSymmetries(): FractalArtImage[] {
        const ret = [
            this,
            this.rotateCW(),
            this.rotateCW().rotateCW(),
            this.rotateCW().rotateCW().rotateCW(),
            this.flipRows(),
            this.flipRows().rotateCW(),
            this.flipRows().rotateCW().rotateCW(),
            this.flipRows().rotateCW().rotateCW().rotateCW(),
        ];
        const retU = uniquesBy((f: FractalArtImage)=> f.data.toString())(ret);
        return retU;
    }

    public partition(): FractalArtImage[][] {
        const miniSize = this.size % 2 === 0  ? 2 : 3;
        const chunkedData = chunk2D(this.data,miniSize);
        return map2((bools: boolean[][]) => new FractalArtImage(bools))(chunkedData);
    }

    public enhance(rs: Ruleset, times: number = 1): FractalArtImage {
        let ret;
        if (this.size <= 3) {
            ret = rs.rules.find(mapping => mapping.from.id === this.id).to;
        } else {
            const imageArray = this.partition().map(row => row.map(image => image.enhance(rs)));
            ret = new FractalArtImage(unChunk2D(map2((i: FractalArtImage) => i.data)(imageArray)));
        }
        if (times > 1) {
            return ret.enhance(rs,times-1);
        } else {
            return ret;
        }
    }

    public pixelCount(): number {
        return flatten(this.data).reduce((prev,curr)=> prev + Number(curr),0);
    }
}

export class FractalArtImageMapping {
    public readonly from: FractalArtImage;
    public readonly to: FractalArtImage;
    constructor(mapping: [string,string] | [FractalArtImage,FractalArtImage]) {
        if (typeof mapping[0] === 'string') {
            this.from = new FractalArtImage(mapping[0] as string);
            this.to = new FractalArtImage(mapping[1] as string);
        }   else {
            this.from = mapping[0] as FractalArtImage;
            this.to = mapping[1] as FractalArtImage;
        }
    }
    public multiply(): FractalArtImageMapping[] {
         return this.from.allSymmetries().map(from => new FractalArtImageMapping([from,this.to]));
    }
}

export const rotate2DArrCW = <T>(arr: T[][]): T[][]  => {
    const colMax = arr.length -1;
    const rowMax = arr[0].length -1;
    const retData: T[][] = new Array(rowMax +1).fill(null).map(a => new Array(colMax +1).fill(null));
    retData.forEach(
        (row, rowI) => row.forEach(
            (col,colI) => {
                retData[rowI][colI] = arr[colMax-colI][rowI]; }),
    );
    return retData;
};
export const flip2DArrRows = <T>(arr: T[][]): T[][]  => {
    const rowMax = arr.length -1;
    const colMax = arr[0].length -1;
    const retData: T[][] = new Array(rowMax +1).fill(null).map(a => new Array(colMax +1).fill(null));
    retData.forEach(
        (row, rowI) => row.forEach(
            (col,colI) => {
                retData[rowI][colI] = arr[rowMax-rowI][colI]; }),
    );
    return retData;
};

export const uniquesBy = <T,S extends (number|boolean|string)>(identifier: (tmp: T)=>S) => (ts: T[]): T[] => {
    const uniques = ts.map(t=> ({s:identifier(t),t}))
                .filter(({t, s},i,a) =>
                    a.findIndex(o => o.s === s) === i)
                .map(o => o.t);
    return uniques;
};

export const zip = <T,S>(ts: T[], ss: S[]): Array<[T,S]> => {
    if(ts.length !== ss.length) { throw new Error(); }
    const ret = ts.map((_,i) => [ts[i],ss[i]] as [T,S]);
    return ret;
};

export const flatten = <T>(arrs: T[][]): T[] => [].concat(...arrs);

export const some = (arr: boolean[]) => arr.reduce((prev,curr) => prev || curr);

export const chunk2D = <T>(arrs: T[][], miniSize: number): T[][][][] => {
    const ret1 = arrs.map(row => chunk(miniSize)(row));
    const ret10 = chunk(miniSize)(ret1);
    const ret3 = ret10.map(row => transpose(row));
    return ret3;
};

export const unChunk2D = <T>(arrs: T[][][][]): T[][] => {
    const a = arrs.map(row => transpose(row));
    const b = flatten(a);
    const c = b.map(row => flatten(row));
    return c;
};

export const transpose = <T>(array: T[][]): T[][] => array[0].map((col, i) => array.map(row => row[i]));
