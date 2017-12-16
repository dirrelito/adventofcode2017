import * as fs from 'fs';
import { state, parseRow, applyInstr } from './lib';

async function main() {
    const data = fs.readFileSync('./8/input.txt', 'utf8').trim().split(/\r?\n/);
    const s0: {s: state, m: number} = {
        s: {},
        m: 0,
    };
    const endStateAndMax = data.map(parseRow).reduce((sAndMax, i) => {
        const s = applyInstr(sAndMax.s)(i);
        const m = Math.max(sAndMax.m, ...(Object.values(s)));
        return {s, m};
    }, s0);
    const ansA = Math.max(...(Object.values(endStateAndMax.s))) ;
    console.log(`Ans to A: ${ansA}`);
    console.log(`Ans to B: ${endStateAndMax.m}`);
}

exports.main = main;
