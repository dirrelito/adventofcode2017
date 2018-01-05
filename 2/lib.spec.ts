import * as fs from 'fs';
import {findEvenDivision, processA, processB, rowDiff, strToNumSheet} from './lib';

describe('Day 2', () => {

    it('A', () => {
        const data = fs.readFileSync('./2/testA.txt', 'utf8').trim();
        const res = processA(data);
        expect(res).toBe(18);
    });
    it('B', () => {
        const data = fs.readFileSync('./2/testB.txt', 'utf8').trim();
        const res = processB(data);
        expect(res).toBe(9);
    });

    it('rowDiff happy path', () => {
        expect(rowDiff([1, 2, 3, 4, 5])).toBe(5 - 1);
        expect(rowDiff([9, 2, 3, 4, 5])).toBe(9 - 2);
        expect(rowDiff([9, 7, 3])).toBe(9 - 3);
    });

    it('parseSheet happy', () => {
        const input =
`12 13  99
91 1`;
        const output = [[12, 13, 99], [91, 1]];
        expect(strToNumSheet(input)).toEqual(output);
    });

    it('finds even dividing nums in array', () => {
        expect(findEvenDivision([2,4])).toBe(2);
        expect(findEvenDivision([2,3,4,7])).toBe(2);
        expect(findEvenDivision([21,2,5,7])).toBe(3);
    });
});
