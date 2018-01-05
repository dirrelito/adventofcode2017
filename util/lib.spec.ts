import { chunk, map2, range } from './lib';

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
});
