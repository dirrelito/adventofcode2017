import { Memory, step, processA, processB } from './lib';

const dataA = [0, 2, 7, 0];

describe('Day 6', () => {
    it('Test case A - step by step', () => {
        const max = Math.max(...dataA);
        const maxIndex = dataA.indexOf(max);
        const size = dataA.length;
        let m: Memory = {size, maxIndex, memState: dataA};
        expect(m).toEqual({
            size: 4,
            maxIndex: 2,
            memState: [0, 2, 7, 0],
        });
        m = step(m);
        expect(m).toEqual({
            size: 4,
            maxIndex: 1,
            memState: [2, 4, 1, 2],
        });
        m = step(m);
        expect(m).toEqual({
            size: 4,
            maxIndex: 0,
            memState: [3, 1, 2, 3],
        });
        m = step(m);
        expect(m).toEqual({
            size: 4,
            maxIndex: 3,
            memState: [0, 2, 3, 4],
        });
        m = step(m);
        expect(m).toEqual({
            size: 4,
            maxIndex: 2,
            memState: [1, 3, 4, 1],
        });
        m = step(m);
        expect(m).toEqual({
            size: 4,
            maxIndex: 1,
            memState: [2, 4, 1, 2],
        });
    });

    it('Test case A - total', () => {
        const i = processA(dataA);
        expect(i).toBe(5);
    });

    it('Test B', () => {
        const i = processB(dataA);
        expect(i).toBe(4);
    });
});
