export const parseProgram = (line: string) => {
    const [a, b] = line.split(' -> ');
    const regex1 = /(\w+)\s\((\d+)\)/;
    const m = a.match(regex1);
    const discNames = b ? b.split(', ') : [];
    return {name: m[1], weight: parseInt(m[2]), discNames} as program;
};

export const getDiscHolder = (allProgs: program[]) => (prog: program) => {
    return allProgs.find(p => p.discNames.indexOf(prog.name) !== -1);
};

export const getRoot = (allProgs: program[]) => {
    let p = allProgs[0];
    const f = getDiscHolder(allProgs);
    while (true) {
        const q = f(p);
        if (q) {
            p = q;
        } else {
            return p;
        }
    }
};

export const buildTree = (progs: program[]) => (root: program) => {
    const getTreeForName = name => buildTree(progs)(progs.find(p => p.name === name));
    const disc: programNode[] = root.discNames.map(getTreeForName);
    const n: programNode = {name: root.name, weight: root.weight, disc };
    return n;
};

export const findWrongVal: (t: programNode, expectedVal?: number) => number =
    (t: programNode, expectedVal?: number) => {
        if (t.disc.length >= 3) {
            const totVals = t.disc.map(n => getTotVal(n));
            const oRes = findOdd(totVals);
            if (oRes) {
                return findWrongVal(t.disc[oRes.badI], oRes.expectedVal);
            } else {
                const discWeight = totVals.reduce((a, b) => a + b);
                return expectedVal - discWeight;
            }
        } else {
            throw new Error('either bad input or programming mis/logic...');
        }
};

/**
 *
 * @param arr an array of 3 or more numbers
 * @returns an object holding information on what the 'normal' value is, and the
 * index of the value that is not like the others
 */
export const findOdd = (arr: number[]) => {
    let badI: number;
    let expectedVal: number;
    let cand1;
    let cand2;

    const l = arr.length;
    for (let i = 0; i < l; i++) {
        const v = arr[i];
        if (i === 0) {
            cand1 = v;
        } else if (i === 1 && cand1 !== v) {
            cand2 = v;
        } else if (i === 2 && cand2) {
            if (v === cand1) {
                badI = 1; expectedVal = cand1;
                return {badI, expectedVal};
            } else {
                badI = 0; expectedVal = cand2;
                return {badI, expectedVal};
            }
        } else if (i >= 2 && v !== cand1) {
            badI = i; expectedVal = cand1;
            return {badI, expectedVal};
        }
    }
    return null;

};

const getTotVal = (n: programNode) => {
    const childrenW: number[] = n.disc.map(p => getTotVal(p));
    const subW = childrenW.reduce((prev, curr) => prev + curr, 0);
    return n.weight + subW;
};

type program = {name, weight, discNames: string[]};
type programNode = {name: string, weight: number, disc: programNode[]}; // this is a rose tree! :)
