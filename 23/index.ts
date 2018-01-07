import { readFileSync } from 'fs';
import { isPrime, solveA } from './lib';

async function main() {

    const ansA = solveA();
    console.log(`Ans for part A: ${ansA}`);

    let ansB = 0;
    const c = 81 * 100 + 100000 + 17000;
    for (let b = 81 * 100 + 100000; b <= c; b += 17) {
        // console.log(b,isPrime(b))
        ansB += isPrime(b) ? 0 : 1;
    }
    console.log(`Ans for part B: ${ansB}`);

}
exports.main = main;
