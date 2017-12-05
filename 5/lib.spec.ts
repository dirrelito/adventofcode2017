import { processA, processB, updateArr } from './lib';

describe('Day 5', () => {
    it('A test example', () => {
        expect(processA(input)).toBe(5);
    });
    it('B test example', () => {
        expect(processB(input)).toBe(10);
    });

    it('Array updater', () => {
        expect(updateArr([1, 4, 2, 3])(2)(10)).toEqual([1, 4, 10, 3]);
    });
});

const input =
`0
3
0
1
-3`;
