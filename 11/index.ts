import * as fs from 'fs';
import { axialCoordinate, direction, hexDistance, hexNorm, stepAxial, toCubic } from './lib';

async function main() {
    const data = fs.readFileSync('./11/input.txt', 'utf8').trim();

    const dirs: direction[] = data.split(',').map(d => d as direction); // unsafe casts!! :O
    const startHex: axialCoordinate = {kind: 'axial', x: 0, y: 0};
    const endHex = dirs.reduce((hex, dir) => stepAxial(hex)(dir), startHex);
    const endDist = hexNorm(toCubic(endHex));

    const startState = {hex: startHex, maxDist: 0};
    const endState = dirs.reduce((state, dir) => {
        const hex = stepAxial(state.hex)(dir);
        const maxDist = Math.max(state.maxDist, hexNorm(toCubic(hex)));
        return {hex, maxDist};
    }, startState);

    console.log(`Ans to A: ${endDist}`);
    console.log(`Ans to B: ${endState.maxDist}`);
}

exports.main = main;
