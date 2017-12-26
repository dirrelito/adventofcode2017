type firewall = Array<{depth: number,range: number}>;

export const parseFirewall: (input: string) => firewall = input => input
    .trim()
    .split(/\r?\n/)
    .map(l => l.trim().split(': '))
    .map(p => ({depth:parseInt(p[0],10), range:parseInt(p[1],10)}));

export const getSeverity = (fw: firewall) => (delay: number) => {
    const maxDepth = fw.reduce((acc,curr) => Math.max(acc,curr.depth),0);
    const timings = [...Array(maxDepth + 1).keys()].map(t => t+delay);
    const severity = timings.map(time => {
        const layer = fw.find(o => o.depth === time - delay);
        if (!layer) { return 0;}
        const youAreCaught =  time %  (2 * (layer.range - 1)) === 0;
        if (youAreCaught) {
            return layer.depth * layer.range;
        } else {
            return 0;
        }
    }).reduce((acc,curr) => acc + curr);
    return severity;
};

export const gotCaughtByDelay = (fw: firewall) => (delay: number) => {
    const maxDepth = fw.reduce((acc,curr) => Math.max(acc,curr.depth),0);
    const timings = [...Array(maxDepth + 1).keys()].map(t => t+delay);
    const gotCaught = timings.map(time => {
        const layer = fw.find(o => o.depth === time - delay);
        if (!layer) { return false;}
        const youAreCaught =  time %  (2 * (layer.range - 1)) === 0;
        return youAreCaught;
    }).reduce((acc,curr) => acc || curr);
    return gotCaught;
};

export const delayForSafePassage = (fw: firewall) => {
    let delay = -1;
    let caught = true;
    while(caught) {
        delay++;
        caught = gotCaughtByDelay(fw)(delay);
    }
    return delay;
};
