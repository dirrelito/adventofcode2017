import { solveA, solveB } from "./lib";


async function main() {

    const inputA = 345;

    const d = solveA(345);
    console.log(`Ans to A: ${d}`);
    const d2 = solveB(345);
    console.log(`Ans to B: ${d2}`);


}
exports.main = main;
