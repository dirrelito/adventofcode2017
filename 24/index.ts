import { readFileSync } from 'fs';
import { keepBestPaths, longestPath, parseComponents, pathLength, pathWeight } from './lib';

async function main() {

    const raw = readFileSync('./24/input.txt','utf8');
    const componentGraph = parseComponents(raw);
    const path = longestPath(componentGraph,'pinCount0', pathWeight);
    const strength = pathWeight(path[0]);
    console.log(`Ans for part A: ${strength}`);

    const longestPaths = longestPath(componentGraph,'pinCount0',pathLength);
    // console.log(longestPaths);
    const strongestLongest = keepBestPaths(longestPaths,pathWeight);
    // console.log(strongestLongest);
    const ansB = pathWeight(strongestLongest[0]);
    console.log(`Ans for part B: ${ansB}`);

}
exports.main = main;
