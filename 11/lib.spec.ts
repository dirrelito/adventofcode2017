import { axialCoordinate, cubicCoordinate, direction, hexNorm, stepAxial, toCubic } from './lib';

describe('Day 11', () => {
    it('Distance', () => {
        expect(hexNorm({kind: 'cubic', x: 0, y: 5, z: -5})).toBe(5);
    });
    it('Step', () => {
        const c0 = stepAxial({kind: 'axial', x: 2, y: 0})('ne');
        const c1: cubicCoordinate = toCubic(c0);
        expect(hexNorm(c1)).toBe(3);
    });
    it('Reduces well', () => {
        const dirs: direction[] = ['n', 'ne', 'nw', 'nw', 'sw', 'sw'];
        const startHex: axialCoordinate = {kind: 'axial', x: 0, y: 0};
        const endHex = dirs.reduce((hex, dir) => stepAxial(hex)(dir), startHex);
        expect(endHex).toEqual({kind: 'axial', x: -3, y: 0});
    });
});
