import {data } from './input';
import {processA, processB} from './lib';

async function main() {
    console.log('Ans to A: ' + processA(data));
    console.log('Ans to B: ' + processB(data));
}

exports.main = main;
