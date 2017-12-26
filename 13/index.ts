import * as fs from 'fs';
import { delayForSafePassage, getSeverity, parseFirewall } from './lib';

async function main() {

    const rawData = fs.readFileSync('./13/input.txt', 'utf8');
    const fw = parseFirewall(rawData);
    const severityByDelay = getSeverity(fw);
    const s0 = severityByDelay(0);
    console.log(`Ans to A:${s0}`);

    const delay = delayForSafePassage(fw);
    console.log(`Ans to B:${delay}`); // not 79. Not 80.
}

exports.main = main;
