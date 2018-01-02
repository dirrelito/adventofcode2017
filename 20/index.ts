import { readFileSync } from 'fs';
import {stream} from 'parser-combinator';
import { fullInputParser, indexOfMinAcceleration, vecNorm, particle, applyNTimes, tick } from './lib';

async function main() {

    const raw = readFileSync('./20/input.txt', 'utf8');
    const ps: particle[] = fullInputParser.parse(stream.ofString(raw)).value;
    const j = indexOfMinAcceleration(ps);
    console.log(`Ans to A: ${j}`);
    const n = 1000; // hope that all collisions are resolved after 1000 ticks
    const psAfterNTicks = applyNTimes(tick)(n)(ps);
    console.log(`Ans to B: ${psAfterNTicks.length}`);

}
exports.main = main;
