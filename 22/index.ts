import { readFileSync } from 'fs';
import { applyNTimes } from '../util/lib';
import { makePrimitiveVirusBurst, parseMap, solveA, solveB, stateBetweenBursts } from './lib';

async function main() {

    const raw = readFileSync('./22/input.txt','utf8');
    const ansA = solveA(raw)(1e4);
    console.log(`Ans for part A: ${ansA}`);

    const ansB = solveB(raw)(10000000);
    console.log(`Ans for part A: ${ansB}`);

}
exports.main = main;
