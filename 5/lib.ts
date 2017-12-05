export const processA = (raw: string) => {
    const a = raw.trim().split(/\n/).map(s => s.trim()).map(n => parseInt(n, 10));
    const p0 = 0;
    let s = {pointer: p0, instructionSet: a, counter: 0};
    while (s.pointer < s.instructionSet.length) {
        // console.log(s);
        s = step(ruleA)(s);
    }
    return s.counter;
};

export const processB = (raw: string) => {
    const a = raw.trim().split(/\n/).map(s => s.trim()).map(n => parseInt(n, 10));
    const p0 = 0;
    let s = {pointer: p0, instructionSet: a, counter: 0};
    while (s.pointer < s.instructionSet.length) {
        // console.log(s);
        s = step(ruleB)(s);
    }
    return s.counter;
};

const ruleA = num => num + 1;
const ruleB = num => num >= 3 ? num - 1 : num + 1;

const step = rule => ({instructionSet, pointer, counter}: State) => {
    const newP = pointer + instructionSet[pointer];
    // console.log(newP)
    const newI = updateArr(instructionSet)(pointer)(rule(instructionSet[pointer]));
    // console.log(newI)
    return {instructionSet: newI, pointer: newP, counter: counter + 1};
};

export const updateArr = array => place => val => {
    const arr2 = array.splice(0); // only works for 1-level array (array of )
    // console.log("arr-copy",arr2)
    arr2[place] = val;
    return arr2;
};

class State {public instructionSet: number[]; public pointer: number; public counter: number; }
