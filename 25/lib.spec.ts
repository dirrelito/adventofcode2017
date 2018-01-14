import { cursorToIndex, indexToCursor } from './lib';

describe('Day 25', () => {
    describe('Convert index/cursor', () => {
        const is = [-3,-2,-1,0,1,2,3];
        const ns = [5,3,1,0,2,4,6];
        it('c2i', () => {
            const ns2 = is.map(i => cursorToIndex(i));
            expect(ns2).toEqual(ns);
        });
        it('i2c', () => {
            const is2 = ns.map(i => indexToCursor(i));
            expect(is2).toEqual(is);
        });
    });
});
