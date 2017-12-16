import * as fs from 'fs';
import {buildTower, findRoot, findWrongVal, parseProgram} from './lib';

async function main() {

    const data = fs.readFileSync('./7/input.txt', 'utf8').trim().split(/\r?\n/);
    const programsWithStringReferences = data.map(parseProgram);
    const towerRoot = findRoot(programsWithStringReferences);
    const towerOfPrograms = buildTower(programsWithStringReferences)(towerRoot);
    const correctedValue = findWrongVal(towerOfPrograms);

    console.log('Ans to A: ' + towerRoot.name);
    console.log('Ans to B: ' + correctedValue);
}

exports.main = main;
