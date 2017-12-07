import * as fs from 'fs';
import { buildTree, findOdd, findWrongVal, getDiscHolder, getRoot, parseProgram } from './lib';

describe('Day 7', () => {

    it('parses simple line', () => {
        const input = 'asdf (10) -> wqerty, abba1';
        const prog = parseProgram(input);
        expect(prog).toEqual(
            {name: 'asdf', weight: 10, discNames: ['wqerty', 'abba1']},
        );
    });
    it('parses simple line 2', () => {
        const input = 'asdf (10)';
        const prog = parseProgram(input);
        expect(prog).toEqual(
            {name: 'asdf', weight: 10, discNames: []},
        );
    });

    it('Test A', () => {
        const data = fs.readFileSync('./7/testInputA.txt', 'utf8').trim().split(/\r?\n/);
        const rawProgs = data.map(parseProgram);
        // console.log(rawProgs)
        const p1 = rawProgs.find(p => p.name === 'fwft');
        expect(p1.weight).toBe(72);
        expect(p1.name).toBe('fwft');
        expect(p1.discNames).toEqual([ 'ktlj', 'cntj', 'xhth']);

        const f = getDiscHolder(rawProgs);
        expect(f(p1).name).toBe('tknk');

        const r = getRoot(rawProgs);
        expect(r.name).toBe('tknk');

    });

    it('Build trees and test B', () => {
        const data = fs.readFileSync('./7/testInputA.txt', 'utf8').trim().split(/\r?\n/);
        const rawProgs = data.map(parseProgram);
        const r = getRoot(rawProgs);
        const t = buildTree(rawProgs)(r);
        const f = findWrongVal(t);
        expect(f).toBe(60);

    });

    it('findOdd', () => {
        expect(findOdd([1, 1, 1, 4, 1, 1])).toEqual({
            badI: 3,
            expectedVal: 1,
        });
        expect(findOdd([4, 2, 2, 2, 2])).toEqual({
            badI: 0,
            expectedVal: 2,
        });
        expect(findOdd([1, 2, 1, 1, 1])).toEqual({
            badI: 1,
            expectedVal: 1,
        });
        expect(findOdd([ 114292, 114292, 114292, 114292, 114292, 114292, 114299 ])).toEqual({
            badI: 6,
            expectedVal: 114292,
        });
        expect(findOdd([ 8278, 8278, 8285 ])).toEqual({
            badI: 2,
            expectedVal: 8278,
        });
    });

});
