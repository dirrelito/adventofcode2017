/*
see https://www.redblobgames.com/grids/hexagons/ for guides on hexagonal geometry and coordinate systems
N.B. flat topped hexagonal grid is used!
one should scrap the cubic grid altogether and only work in axial grid.
conversions are not good for anything. it simply bloats the code.
*/
const abs = Math.abs;

export const hexDistance = (a: cubicCoordinate) => (b: cubicCoordinate) => {
    return (abs(a.x - b.x) + abs(a.y - b.y) + abs(a.z - b.z)) / 2;
};

export const hexNorm = (a: cubicCoordinate) => {
    return hexDistance({kind: 'cubic', x: 0, y: 0, z: 0})(a);
};

type vector = cubicCoordinate | axialCoordinate;
export type cubicCoordinate = {kind: 'cubic', x: number, y: number, z: number};
export type axialCoordinate = {kind: 'axial', x: number, y: number};
export type direction = 'n' | 'ne' | 'se' | 's' | 'sw' | 'nw';

export const stepAxial = (a: axialCoordinate) => (d: direction) => {
    const b: axialCoordinate = {kind: 'axial', x: 0, y: 0};
    if (d === 'n') {
        b.y--;
    } else if (d === 's') {
        b.y++;
    } else if (d === 'ne') {
        b.x++;
        b.y--;
    } else if (d === 'se') {
        b.x++;
    } else if (d === 'sw') {
        b.x--;
        b.y++;
    } else if (d === 'nw') {
        b.x--;
    } else {
        const exhaustivenessCheck: never = d;
        throw new Error(`Bad input: ${d} is not a direction.`);
    }
    const c: axialCoordinate = vectorAdd(a)(b);
    return c;
};

const vectorAdd = (a: axialCoordinate) => (b: axialCoordinate) => {
    const c: axialCoordinate = {
        kind: 'axial',
        x: a.x + b.x,
        y: a.y + b.y,
    };
    return c;
};

export const toCubic = (c: axialCoordinate) => {
    const d: cubicCoordinate = {kind: 'cubic', x: c.x, y: c.y, z: -c.x - c.y};
    return d;
};
