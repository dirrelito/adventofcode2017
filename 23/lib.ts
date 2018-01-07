import { readFileSync } from 'fs';
import { isUndefined } from 'util';
export type memType = {[keys: string]: number};

export const getSafe = (memory: memType) => name => {
    if(Object.keys(memory).indexOf(name) === -1) {
        return 0;
    } else {
        return memory[name];
    }
};


export const solveA = () => {
    const memory: memType = {a:0};
    let instructionPointer = 0;
    let mulCounter = 0;

    const set = (x,y: number | string) => {
        memory[x] = (typeof y === 'number')
            ? y
            : getSafe(memory)(y);
        instructionPointer++;
    };
    const sub = (x,y: number | string) => {
        const xVal = getSafe(memory)(x);
        memory[x] = (typeof y === 'number')
            ? xVal - y
            : xVal - getSafe(memory)(y);
        instructionPointer++;
    };
    const mul = (x,y: number | string) => {
        const xVal = getSafe(memory)(x);
        memory[x] = (typeof y === 'number')
            ? xVal * y
            : xVal * getSafe(memory)(y);
        instructionPointer++;
        mulCounter++;
    };
    const jnz = (x: number |string,y: number | string) => {
        const valX = (typeof x === 'number')
            ? x
            : getSafe(memory)(x);
        const valY = (typeof y === 'number')
            ? y
            : getSafe(memory)(y);
        instructionPointer += valX !== 0
            ? valY
            : 1;
    };

    const input = readFileSync('./23/input.txt','utf8');

    const instructions = input.trim().split(/\r?\n/).map(row => {
        const tmp = row.split(' ');
        const instr = tmp[0];
        const x = isNaN(Number(tmp[1])) ? tmp[1] : Number(tmp[1]);
        const y = isNaN(Number(tmp[2])) ? tmp[2] : Number(tmp[2]);
        return [instr,x,y];
    });

    while (instructionPointer >= 0 && instructionPointer < instructions.length -1) {
        const [instrText,x,y] = instructions[instructionPointer];
        if (instrText === 'set') {
            set(x,y);
        } else if (instrText === 'sub') {
            sub(x,y);
        } else if (instrText === 'mul') {
            mul(x,y);
        } else if (instrText === 'jnz') {
            jnz(x,y);
        }
    }

    return mulCounter;
};

export const isPrime = maybePrime => {
    const root = Math.sqrt(maybePrime);
    if (maybePrime === 2) { return true;}
    if (maybePrime % 2 === 0) { return false;}
    for(let r = 3; r <= root; r+= 2) {
        if(maybePrime % r === 0) { return false; }
    }
    return true;
};
