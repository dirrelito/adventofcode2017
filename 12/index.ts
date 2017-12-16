import * as fs from 'fs';
import { parseFile, travelGraph } from './lib';

async function main() {

    const rawData = fs.readFileSync('./12/inputA.txt', 'utf8');
    const allEdgesInGraph = parseFile(rawData);
    const nodesConnectedToNodeZero = travelGraph(allEdgesInGraph)(new Set())(['0']);

    console.log('Ans to A: ' + nodesConnectedToNodeZero.size);

    // just an array of number 0...1999 as string
    const nrOfNodes = 2000;
    const nodesToStartAt = [...Array(nrOfNodes).keys()].map(x => x.toString());

    const groupsOfNodes: Array<Set<string>> = nodesToStartAt
        .map(startingNode => travelGraph(allEdgesInGraph)(new Set())([startingNode]));
    const distinctGroupsAsStringArray = groupsOfNodes
            .map(s => [...s].sort().toString())
            .filter((v, i, a) => a.indexOf(v) === i);
    const numberOfDistinctGroups = distinctGroupsAsStringArray.length;

    console.log('Ans to B: ' + numberOfDistinctGroups);
}

exports.main = main;
