import { copyBoard, fillBBoard, getCoords, getNeighbors, getNum, manhattanDistance, setNum } from './lib';

describe(' Day 3' , () => {

    it('A part test suite', () => {
        const f = x => manhattanDistance(getCoords(x));
        expect(f(1)).toBe(0);
        expect(f(12)).toBe(3);
        expect(f(23)).toBe(2);
        expect(f(1024)).toBe(31);
    });

    it('B part test suite', () => {
        const b = fillBBoard(setNum(new Map())({x: 0, y: 0})(1))(5);
        const f = x => getNum(b)(getCoords(x));
        // console.log(b)
        expect(f(1)).toBe(1);
        expect(f(2)).toBe(1);
        expect(f(3)).toBe(2);
        expect(f(4)).toBe(4);
        expect(f(5)).toBe(5);
    });

    it('Neighbors', () => {
        expect(getNeighbors({x: 3, y: 3})).toEqual([
            {x: 4, y: 2},
            {x: 4, y: 3},
            {x: 4, y: 4},
            {x: 3, y: 2},
            {x: 3, y: 4},
            {x: 2, y: 2},
            {x: 2, y: 3},
            {x: 2, y: 4},
        ]);
    });

    it('manhattan', () => {
        expect(manhattanDistance({x: 3, y: -10})).toBe(13);
    });

    it('copyBoard', () => {
        const b1 = new Map();
        b1.set(1, new Map([[1, 11]]));
        b1.set(1, new Map([[2, 12]]));
        b1.set(2, new Map([[1, 21]]));
        b1.set(2, new Map([[2, 22]]));
        const b2 = copyBoard(b1);
        expect(b2).toEqual(b1);
        expect(b1 === b2).toBeFalsy();
    });

    describe('fillBBoard', () => {
        it('fillBBoard rejects crap', () => {
            const f = () => fillBBoard(setNum(new Map())({x: 0, y: 0})(0))(5);
            expect(f).toThrow();
        });

        it('can refill on existing board', () => {
            const b1 = fillBBoard(setNum(new Map())({x: 0, y: 0})(1))(5);
            let t = process.hrtime();
            const b2 = fillBBoard(b1)(30);
            const t1 = process.hrtime(t);
            t = process.hrtime();
            const b3 = fillBBoard(setNum(new Map())({x: 0, y: 0})(1))(31);
            const t2 = process.hrtime(t);
            const time1 = t1[0] * 1000000000 + t1[1];
            const time2 = t2[0] * 1000000000 + t2[1];
            expect(time1).toBeGreaterThan(time2 * 0.6); // one should save 30% min
        });
    });

    describe('getCoords', () => {
        it('inner 9', () => {
            const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 26, 27, 119];
            expect(points.map(getCoords)).toEqual([
                {x: 0, y: 0},
                {x: 1, y: 0},
                {x: 1, y: 1},
                {x: -0, y: 1},
                {x: -1, y: 1},
                {x: -1, y: -0},
                {x: -1, y: -1},
                {x: 0, y: -1},
                {x: 1, y: -1},
                {x: 2, y: -1},
                {x: 2, y: -2},
                {x: 3, y: -2},
                {x: 3, y: -1},
                {x: 3, y: -5},
            ]);
        });
        it('selected', () => {
            const points = [10, 25, 26, 27, 119];
            expect(points.map(getCoords)).toEqual([
                {x: 2, y: -1},
                {x: 2, y: -2},
                {x: 3, y: -2},
                {x: 3, y: -1},
                {x: 3, y: -5},
            ]);
        });
    });
});
