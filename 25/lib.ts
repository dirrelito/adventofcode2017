import { assertNever, sum } from '../util/lib';

export type state = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type value = 1 | 0;
export type direction = 'right' | 'left';
export type singleInstruction = [value,direction,state];
export type stateInstruction = [singleInstruction,singleInstruction];
export type instructionSet = Map<state,stateInstruction>;

export class TuringMachine {
    private tape: value[] = [];
    private cursor: number = 0;

    constructor(private rules: instructionSet,
                private currentState: state) {}

    public getChecksum = (): number => {
        return this.tape.reduce(sum, 0);
    }

    public stepN = (n: number) => {
        let m = n;
        while (m > 0) {
            this.step();
            m--;
        }
    }

    private getValue = () => {
        const i = cursorToIndex(this.cursor);
        const v = this.tape[i] || 0;
        return v;
    }

    private writeValue = (v: value) => {
        const i = cursorToIndex(this.cursor);
        this.tape[i] = v;
    }

    private move = (d: direction) => {
        if (d === 'right') {
            this.cursor++;
        } else if (d === 'left') {
            this.cursor--;
        } else {
            assertNever(d);
        }
    }

    private setState = (s: state) => {
        this.currentState = s;
    }

    private step = () => {
        const v = this.getValue();
        const r2 = this.rules.get(this.currentState);
        const [newVal,dir,newState] = r2[v];
        this.writeValue(newVal);
        this.move(dir);
        this.setState(newState);
    }
}

export const cursorToIndex = (c: number) => {
    if (c >= 0) {
        return c * 2;
    } else {
        return (-c * 2 - 1);
    }
};

export const indexToCursor = (i: number) => {
    if (i % 2 === 0) {
        return i / 2;
    } else {
        return -((i+1)/2);
    }
};
