import * as fs from 'fs';
import { chunk, knotHash, knotHashRound, makeLoop, parseAsciiInput, parseIntList, repeat, take } from './lib';

async function main() {

    const inputA = '183,0,31,146,254,240,223,150,2,206,161,1,255,232,199,88';
    const dataA = parseIntList(inputA);

    const kHS0 = {list: makeLoop(256), currentPosition: 0, skipSize: 0};
    const {list} = knotHashRound(dataA)(kHS0);
    console.log(`Ans to A: ${list[0] * list[1]}`);

    const ansB = knotHash(inputA);
    console.log(`Ans to B: ${ansB}`);
}

exports.main = main;
