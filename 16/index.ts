import * as fs from 'fs';
import { dance1, danceMove, parseDanceMoves, program, shortCircuitDanceNTimes } from './lib';

async function main() {

    const rawData = fs.readFileSync('./16/input.txt', 'utf8');

    const d: program[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'];
    const ms: danceMove[] = parseDanceMoves(rawData.trim());
    const d2 = ms.reduce((lineup,move) => dance1(lineup)(move),d);
    console.log(`Ans to A: ${d2.join('')}`);

    const d3 = shortCircuitDanceNTimes(ms)(d)(10**9);
    console.log(`Ans to B: ${d3.join('')}`);

}
exports.main = main;
