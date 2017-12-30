import { readFileSync } from 'fs';
import { solveA, solveB } from './lib';

async function main() {

    const raw = readFileSync('./18/input.txt', 'utf8');
    const cmds: string[] = raw.trim().split(/\r?\n/);
    const r = solveA(cmds);
    console.log(`Ans to A: ${r}`);
    const d2 = solveB(cmds);
    console.log(`Ans to B: ${d2}`);

}
exports.main = main;
