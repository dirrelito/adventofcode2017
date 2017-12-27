import { countCollisions, countCollisionsB } from "./lib";

async function main() {

    const n = countCollisions(679)(771)(40000000);
    console.log(`Ans to A: ${n}`);
    const m = countCollisionsB(679)(771)(5000000);
    console.log(`Ans to B: ${m}`);

}
exports.main = main;
