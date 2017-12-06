export const step: (m: Memory) => Memory = (m: Memory) => {
    let blocks = m.memState[m.maxIndex];
    const memState = m.memState.slice(0);
    memState[m.maxIndex] = 0;
    let pointer = m.maxIndex;
    for (; blocks > 0; blocks--) {
        pointer = (pointer + 1) % m.size ;
        memState[pointer] += 1;
    }
    const max = Math.max(...memState);
    const maxIndex = memState.indexOf(max);
    return {size: m.size, maxIndex, memState};
};

export const processA = (dataA: number[]) => {
    const max = Math.max(...dataA);
    const maxIndex = dataA.indexOf(max);
    const size = dataA.length;
    let m: Memory = {size, maxIndex, memState: dataA};
    const s = new Set();
    let i = 0;
    s.add(m.memState.toString());
    while (i < 10000) {
        i++;
        m = step(m);
        if (s.has(m.memState.toString())) {
            return i;
        } else {
            s.add(m.memState.toString());
        }
    }
    return -1;
};
export const processB = (dataA: number[]) => {
    const max = Math.max(...dataA);
    const maxIndex = dataA.indexOf(max);
    const size = dataA.length;
    let m: Memory = {size, maxIndex, memState: dataA};
    const history = [];
    let i = 0;
    history.push(m.memState.toString());
    while (i < 10000) {
        i++;
        m = step(m);
        const j = history.indexOf(m.memState.toString());
        if (j !== -1) {
            return i - j;
        } else {
            history.push(m.memState.toString());
        }
    }
    return -1;
};

export class Memory {
    public size: number;
    public maxIndex: number;
    public memState: number[];
}
