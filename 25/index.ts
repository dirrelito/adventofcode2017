import { checksumAfterSteps, initialState, rules } from './input';
import { TuringMachine } from './lib';

async function main() {

    const tm = new TuringMachine(rules, initialState);
    tm.stepN(checksumAfterSteps);
    const ansA = tm.getChecksum();

    console.log(`Ans for part A: ${ansA}`);
    // console.log(`Ans for part B: ${ansB}`);

}
exports.main = main;
