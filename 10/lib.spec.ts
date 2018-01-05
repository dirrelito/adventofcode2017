import { bitXorReduce, knotHash, knotHashRound, makeLoop, parseAsciiInput, parseIntList, repeat,
     shiftLoop, stepOne, take, twistSubLoop } from './lib';

describe('Day 10', () => {
    const inputA = '3,4,1,5';
    const dataA = parseIntList(inputA);

    it('parse input', () => {
        expect(dataA).toEqual([3, 4, 1, 5]);
    });
    it('can create a loop', () => {
        expect(makeLoop(5)).toEqual([0, 1, 2, 3, 4]);
    });

    it('can shift', () => {
        const a = makeLoop(5);
        const b = shiftLoop(a)(2);
        expect(b).toEqual([2, 3, 4, 0, 1]);
    });
    it('can shift long', () => {
        const a = makeLoop(5);
        const b = shiftLoop(a)(13);
        expect(b).toEqual([3, 4, 0, 1, 2]);
    });
    it('can shift longer still', () => {
        const a = makeLoop(10);
        const b = shiftLoop(a)(12);
        expect(b).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 0, 1]);
    });

    it('can twist', () => {
        const a = makeLoop(5);
        const b = twistSubLoop(a)(3);
        expect(b).toEqual([2, 1, 0, 3, 4]);
    });

    it('can take', () => {
        const z = [1, 2, 3, 4, 5];
        expect(take(z)(2)).toEqual([1, 2]);
        const w = ['a', 'b', 'c', 'd'];
        expect(take(w)(3)).toEqual(['a', 'b', 'c']);
    });

    it('parse ascii input', ()=> {
        const s = '1,2,3';
        const t = parseAsciiInput(s);
        expect(t).toEqual([49,44,50,44,51,17,31,73,47,23]);
    });

    it('repeat function calls', ()=> {
        const f = (i: number) => i+1;
        const a = repeat(f)(10)(0);
        expect(a).toBe(10);
    });

    describe('Test cases in A input', () => {
        it('Test step 1', () => {
            const a = { list:makeLoop(5), skipSize: 0, currentPosition: 0};
            const b = stepOne(a)(3);
            expect(b).toEqual({list: [2,1,0,3,4], skipSize: 1, currentPosition: 3});
        });

        it('Test step 2', () => {
            const a = { list:makeLoop(5), skipSize: 0, currentPosition: 0};
            const lengths = take(dataA)(2);
            const b = knotHashRound(lengths)(a);
            expect(b).toEqual({list: [4,3,0,1,2], skipSize: 2, currentPosition: 3});
        });

        it('Test step 3', () => {
            const a = { list:makeLoop(5), skipSize: 0, currentPosition: 0};
            const lengths = take(dataA)(3);
            const b = knotHashRound(lengths)(a);
            expect(b).toEqual({list: [4,3,0,1,2], skipSize: 3, currentPosition: 1});
        });

        it('Test step 4', () => {
            const a = { list:makeLoop(5), skipSize: 0, currentPosition: 0};
            const lengths = take(dataA)(4);
            const b = knotHashRound(lengths)(a);
            expect(b).toEqual({list: [3,4,2,1,0], skipSize: 4, currentPosition: 4});
        });

        it('Full test A', () => {
            const a = { list:makeLoop(5), skipSize: 0, currentPosition: 0};
            const {list} = knotHashRound(dataA)(a);
            expect(list[0] * list[1]).toEqual(12);
        });
    });

    it('bit XOR reduce', () => {
        const a = [65,27,9,1,4,3,40,50,91,7,6,0,2,5,68,22];
        const b = bitXorReduce(a);
        expect(b).toBe(64);
    });

    describe('Test cases for B', () => {
        it('Empty string', () => {expect(knotHash('')).toBe('a2582a3a0e66e6e86e3812dcb672a272'); });
        it('AoC 2017', () => {expect(knotHash('AoC 2017')).toBe('33efeb34ea91902bb2f59c9920caa6cd'); });
        it('1,2,3', () => {expect(knotHash('1,2,3')).toBe('3efbe78a8d82f29979031a4aa0b16a9d'); });
        it('1,2,4', () => {expect(knotHash('1,2,4')).toBe('63960835bcdc130f0b66d7ff4f6a5a8e'); });
    });
});
