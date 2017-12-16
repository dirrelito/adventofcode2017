export const step: (m: Memory) => Memory = (m: Memory) => {
    let blocks = m.memoryState[m.indexOfMax];
    const memoryState = m.memoryState.slice(0);
    memoryState[m.indexOfMax] = 0;
    let pointer = m.indexOfMax;
    for (; blocks > 0; blocks--) {
        pointer = (pointer + 1) % m.memorySize ;
        memoryState[pointer] += 1;
    }
    const max = Math.max(...memoryState);
    const indexOfMax = memoryState.indexOf(max);
    return {memorySize: m.memorySize, indexOfMax, memoryState};
};

export const processA = (dataA: number[]) => {
    const maxValueInMemory = Math.max(...dataA);
    const indexOfMax = dataA.indexOf(maxValueInMemory);
    const memorySize = dataA.length;
    let m: Memory = {memorySize, indexOfMax, memoryState: dataA};
    const s = new Set();
    let i = 0;
    s.add(m.memoryState.toString());
    while (i < 10000) {
        i++;
        m = step(m);
        if (s.has(m.memoryState.toString())) {
            return i;
        } else {
            s.add(m.memoryState.toString());
        }
    }
    return -1;
};
export const processB = (dataA: number[]) => {
    const maxValueInMemory = Math.max(...dataA);
    const indexOfMax = dataA.indexOf(maxValueInMemory);
    const memorySize = dataA.length;
    let m: Memory = {memorySize, indexOfMax, memoryState: dataA};

    const history = [];
    let i = 0;
    history.push(m.memoryState.toString());
    while (i < 10000) {
        i++;
        m = step(m);
        const j = history.indexOf(m.memoryState.toString());
        if (j !== -1) {
            return i - j;
        } else {
            history.push(m.memoryState.toString());
        }
    }
    return -1;
};

export class Memory {
    public memorySize: number;
    public indexOfMax: number;
    public memoryState: number[];
}
