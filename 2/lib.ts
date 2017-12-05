import { EOL } from 'os';

export const processA = (rawSheet: string) => {
    const numSheet: number[][] = strToNumSheet(rawSheet);
    const diffs: number[] = numSheet.map(rowDiff);
    const sum = diffs.reduce(summer);
    // console.log('raw:', rawSheet)
    // console.log('nums:', numSheet)
    // console.log('diffs:', diffs)
    // console.log('sum:', sum)
    return sum;
};

export const processB = (rawSheet: string) => {
    const numSheet = strToNumSheet(rawSheet);
    const sumContributions = numSheet.map(findEvenDivision);
    const sum = sumContributions.reduce(summer);
    // console.log('raw:', rawSheet)
    // console.log('nums:', numSheet)
    // console.log('sumC:', sumContributions)
    // console.log('sum:', sum)
    return sum;
};

export const map2 = fun => arr => {
    return arr.map(row => row.map(cell => fun(cell)));
};

export const rowDiff = (row: number[]) => {
    const max = Math.max(...row);
    const min = Math.min(...row);
    return max - min;
};

export const summer = (acc, currCal) => acc + currCal;

export const strToNumSheet = (str: string) => {
    const strSheet1 = str.split(/\r?\n/);
    const strSheet2 = strSheet1.map(row => row.split(/\s+/));
    const strSheet3: number[][] = map2(s => parseInt(s, 10))(strSheet2);
    // console.log("== str==\n", str, "== 111 ==\n  ", strSheet1,"== 222 ==\n", strSheet2, "== 333 ==\n  ",strSheet3);
    return strSheet3;
};

export const findEvenDivision: (nums: number[]) => (number | void) = nums => {
    for (let i = 0; i < nums.length; i++) {
        const e1 = nums[i];
        for (let j = i + 1; j < nums.length; j++) {
            const e2 = nums[j];
            const m1 = e1 % e2;
            if (m1 === 0) { return e1 / e2 ; }
            const m2 = e2 % e1;
            if (m2 === 0) { return e2 / e1 ; }
        }
    }
};
