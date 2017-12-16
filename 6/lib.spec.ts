import { Memory, step, processA, processB } from './lib';

const dataA = [0, 2, 7, 0];

describe('Day 6', () => {
    it('Test case A - step by step', () => {
        const max = Math.max(...dataA);
        const indexOfMax = dataA.indexOf(max);
        const memorySize = dataA.length;
        let m: Memory = {memorySize, indexOfMax, memoryState: dataA};
        expect(m).toEqual({
            memorySize: 4,
            indexOfMax: 2,
            memoryState: [0, 2, 7, 0],
        });
        m = step(m);
        expect(m).toEqual({
            memorySize: 4,
            indexOfMax: 1,
            memoryState: [2, 4, 1, 2],
        });
        m = step(m);
        expect(m).toEqual({
            memorySize: 4,
            indexOfMax: 0,
            memoryState: [3, 1, 2, 3],
        });
        m = step(m);
        expect(m).toEqual({
            memorySize: 4,
            indexOfMax: 3,
            memoryState: [0, 2, 3, 4],
        });
        m = step(m);
        expect(m).toEqual({
            memorySize: 4,
            indexOfMax: 2,
            memoryState: [1, 3, 4, 1],
        });
        m = step(m);
        expect(m).toEqual({
            memorySize: 4,
            indexOfMax: 1,
            memoryState: [2, 4, 1, 2],
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
