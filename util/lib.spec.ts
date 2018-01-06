import { applyNTimes, chunk, flatten, map2, range } from './lib';

describe('Util', ()=> {
    describe('range', () => {
        it('Happy1', () => {
            expect(range(1)(3)).toEqual([1,2,3]);
        });
    });
    describe('map2',()=> {
        it('map2 happy path', () => {
            expect(map2<number,number>(x => x + 1)([[1, 4, 5], [9, 2]])).toEqual([[2, 5, 6], [10, 3]]);
        });
    });
    describe('chunk',()=> {
        it('chunks', () => {
            expect(chunk(3)([1,2,3,4,5,6,7])).toEqual([[1,2,3],[4,5,6],[7]]);
        });
    });
    describe('flatten', ()=> {
        it('flatten', () => {
            const raw = [[1,2,3],[1,2]];
            expect(flatten(raw)).toEqual([1,2,3,1,2]);
        });
    });
    describe('applyNTimes', () => {
        it('Can repeat an action many times', () => {
            const five = applyNTimes((n: number) => n + 1)(5)(0);
            expect(five).toBe(5);
        });
        it('Can repeat an action many many times', () => {
            const five = applyNTimes((n: number) => n + 1)(1e6)(0);
            expect(five).toBe(1e6);
        });
    });
});
