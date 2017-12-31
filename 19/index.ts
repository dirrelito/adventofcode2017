import { readFileSync } from 'fs';
import { solve } from './lib';

async function main() {

    const raw = readFileSync('./19/input.txt', 'utf8');
    const a = solve(raw);
    console.log(`Ans to A: ${a.message}`);
    console.log(`Ans to B: ${a.distance}`);

}
exports.main = main;
