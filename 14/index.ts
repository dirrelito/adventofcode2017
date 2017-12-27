import * as fs from 'fs';
import { generateHashDisk, sumFromDiskState, getUnlabelledCoords, labelNewRegion, regionMaxNo } from './lib';

async function main() {

    const input = 'hwlqcszp';
    const disk = generateHashDisk(input);
    const val = sumFromDiskState(disk);

    console.log(`Ans to A:${val}`);

    const coords = getUnlabelledCoords(disk);
    const state2 = coords.reduce((ds,coord) => labelNewRegion(ds)(coord), disk);
    const nRegions = regionMaxNo(state2);

    console.log(`Ans to B:${nRegions}`);
}

exports.main = main;
