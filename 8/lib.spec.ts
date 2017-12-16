import * as fs from 'fs';
import { applyInstr, instruction, parseRow, safeObjectAccess, state } from './lib';

describe('day 8', () => {
    const data = fs.readFileSync('./8/test.txt', 'utf8').trim().split(/\r?\n/);
    const i1: instruction = { target: 'a', operation: k => k + 1, comparison: {
            target: 'l',
            op: '==',
            level: 0,
        },
    };
    const i2: instruction = {  target: 'b', operation: k => k - (-10), comparison: {
            target: 'a',
            op: '<',
            level: 5,
        },
    };

    it('parse 1 line', () => {
        const row = data[0];
        const instr = parseRow(row);

        expect(instr.target).toBe('b');
        expect(instr.operation(1)).toBe(6);
        expect(instr.comparison.target).toBe('a');
        expect(instr.comparison.op).toBe('>');
        expect(instr.comparison.level).toBe(1);
    });

    it('get stringed index', () => {
        expect(safeObjectAccess({a: 1})('a')).toBe(1);
        expect(safeObjectAccess({})('a')).toBe(0);
    });

    it('pushes on a fresh state', () => {
        const s0 = {};
        const s1 = applyInstr(s0)(i1);
        expect(s1).toEqual({a: 1});
    });

    it('pushes on a dirty state', () => {
        const s0 = {a: 1};
        const s1 = applyInstr(s0)(i2);
        expect(s1).toEqual({a: 1, b: 10});
    });

    it('pushes on a dirty state', () => {
        const s0 = {a: 1};
        const i: instruction = {
            target: 'b',
            operation: k => k - (-10),
            comparison: {
                target: 'a',
                op: '<',
                level: 5,
            },
        };
        const s1 = applyInstr(s0)(i);
        expect(s1).toEqual({a: 1, b: 10});
    });

    it('folds nicely', () => {
        const s0 = {};
        const is = [i1, i2];
        const s1 = is.reduce((s, i) => applyInstr(s)(i), s0);
        expect(s1).toEqual({a: 1, b: 10});
    });

    it('Case A', () => {
        const s0: state = {};
        const s = data.map(parseRow).reduce((ss, i) => applyInstr(ss)(i), s0);
        const v = Math.max(...(Object.values(s))) ;
        expect(v).toBe(1)
    })

    it('Case B', () => {
        const s0: {s: state, m: number} = {
            s: {},
            m: 0,
        };
        const endStateAndMax = data.map(parseRow).reduce((sAndMax, i) => {
            const s = applyInstr(sAndMax.s)(i);
            const m = Math.max(sAndMax.m, ...(Object.values(s)));
            return {s, m};
        }, s0);
        expect(endStateAndMax.m).toBe(10);
    });

});
