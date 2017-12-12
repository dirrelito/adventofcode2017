import * as fs from 'fs';
import { parseFile, travelGraph } from './lib';

async function main() {

    const rawData = fs.readFileSync('./12/inputA.txt', 'utf8');
    const edges = parseFile(rawData);
    const size = travelGraph(edges)(new Set())(['0']);

    console.log('Ans to A: ' + size.size);

    const nrOfLines = 2000; // inspection says there are 2000 lines of data
    const starts = [...Array(nrOfLines).keys()].map(x => x.toString());
    const groups: Array<Set<string>> = starts.map(start =>  travelGraph(edges)(new Set())([start]));
    const grps = groups.map(s => [...s].sort().toString());
    const distincts = grps.filter((v, i, a) => a.indexOf(v) === i);
    const groupNumber = distincts.length;

    console.log('Ans to B: ' + groupNumber);
}

exports.main = main;
