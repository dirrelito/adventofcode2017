
export const parseRow = (row: string) => {
    const [instr, crit] = row.split(' if ');
    const [target, rawChange, strNumChange] = instr.split(' ');
    const operation = i => (rawChange === 'inc') ? i + parseInt(strNumChange, 10) : i - parseInt(strNumChange, 10);
    const [compareAddress, compareOp, compareLevelStr] = crit.split(' ');
    const compareLevel = parseInt(compareLevelStr, 10);
    if (isOp(compareOp)) {
    const res: instruction = {
        target,
        operation,
        comparison: {
            target: compareAddress,
            op: compareOp,
            level: compareLevel},
        };

    return res;
    } else {
        throw new Error(`${compareOp} is not a valid operator.`);
    }
};

export type state = {[key: string]: number};
type op = '==' | '>' | '<' | '<=' | '>=' | '!=';
type compare = { target: string, op: op, level: number};
export type instruction = {target: string, operation: (i: number) => number, comparison: compare};

export const safeObjectAccess = (obj: state) => (addr: keyof state) => {
    const tmp = obj[addr];
    return tmp ? tmp : 0;
};

function isOp(raw: string): raw is op {
    return ['==', '>', '<', '<=', '>=', '!='].indexOf(raw) !== -1;
}

export const applyInstr = (obj: state) => (instr: instruction) => {
    const compVal = safeObjectAccess(obj)(instr.comparison.target);
    const nowVal = safeObjectAccess(obj)(instr.target);
    const returnObj = {...obj};
    let shouldApply;
    switch (instr.comparison.op) {
        case '==':
            shouldApply = compVal === instr.comparison.level; break;
        case '<':
            shouldApply = compVal < instr.comparison.level; break;
        case '>':
            shouldApply = compVal > instr.comparison.level; break;
        case '>=':
            shouldApply = compVal >= instr.comparison.level; break;
        case '<=':
            shouldApply = compVal <= instr.comparison.level; break;
        case '!=':
           shouldApply = compVal !== instr.comparison.level; break;
        default:
            const exhaustiveCheck: never = instr.comparison.op;
    }

    if (shouldApply) {
        returnObj[instr.target] = instr.operation(nowVal);
    }

    return returnObj;
};
