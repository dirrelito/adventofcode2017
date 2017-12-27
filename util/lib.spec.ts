import { range } from './lib';

describe('Util', ()=> {
    describe('range', () => {
        it('Happy1', () => {
            expect(range(1)(3)).toEqual([1,2,3]);
        });
    });
});
