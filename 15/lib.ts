
export const countCollisions = genASeed => genBSeed => pairsToTry => {
    let pairsTried = 0;
    let genAVal = genASeed;
    let genBVal = genBSeed;
    const genAFactor = 16807;
    const genBFactor = 48271;
    const modFactor = 2147483647;
    let collisions = 0;

    while (pairsTried < pairsToTry) {
        genAVal = (genAVal * genAFactor) % modFactor;
        genBVal = (genBVal * genBFactor) % modFactor;
        const judgeVal = (genAVal - genBVal) % (2**16);
        // console.log(genAVal,genBVal,judgeVal)
        if (judgeVal === 0) {
            collisions++;
        }
        pairsTried++;
    }
    return collisions;
};

export const countCollisionsB = genASeed => genBSeed => pairsToTry => {
    let pairsTried = 0;
    let genAVal = genASeed;
    let genBVal = genBSeed;
    const genAFactor = 16807;
    const genBFactor = 48271;
    const genAFilter = 4;
    const genBFilter = 8;
    const modFactor = 2147483647;
    let collisions = 0;

    while (pairsTried < pairsToTry) {
        genAVal = (genAVal * genAFactor) % modFactor;
        while (genAVal % genAFilter !== 0) {
            genAVal = (genAVal * genAFactor) % modFactor;
        }
        genBVal = (genBVal * genBFactor) % modFactor;
        while (genBVal % genBFilter !== 0) {
            genBVal = (genBVal * genBFactor) % modFactor;
        }

        const judgeVal = (genAVal - genBVal) % (2**16);
        //console.log(genAVal,genBVal,judgeVal)
        if (judgeVal === 0) {
            collisions++;
        }
        pairsTried++;
    }
    return collisions;
};
