import { getCoords, getNeighbors, manhattanDistance } from './lib';

describe(' Day 3' , () => {

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
