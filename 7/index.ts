import * as fs from 'fs';
import {buildTree, findWrongVal, getRoot, parseProgram} from './lib';

async function main() {

    const data = fs.readFileSync('./7/input.txt', 'utf8').trim().split(/\r?\n/);
    const rawProgs = data.map(parseProgram);
    const r = getRoot(rawProgs);
    const t = buildTree(rawProgs)(r);
    const f = findWrongVal(t);

    console.log('Ans to A: ' + r.name);
    console.log('Ans to B: ' + f);
}

exports.main = main;
