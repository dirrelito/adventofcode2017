import * as fs from 'fs';
import { getNeighbors, parseFile, processLine, travelGraph } from './lib';

describe('Day 12', () => {
    const rawData = fs.readFileSync('./12/testA.txt', 'utf8');

    it('process single line', () => {
        const a = processLine('6 <-> 4, 5');
        const b = [{ from: '6', to: '4' }, { from: '6', to: '5' } ];
        expect(a).toEqual(b);
    });

    it('Find neighbors', () => {
        const b = [{ from: '6', to: '4' }, { from: '6', to: '5' } ];
        const c = getNeighbors(b)('6');
        expect(c).toEqual(['4', '5']);
    });

    it('Parse many lines', () => {
        const raw = '5 <-> 6\n6 <-> 4, 5\n';
        const a = parseFile(raw);
        const b = [{ from: '5', to: '6' }, { from: '6', to: '4' }, { from: '6', to: '5' } ];
        expect(a).toEqual(b);
    });
    
    describe('travelGraph', () => {
        it('has base case', () => {
            const a = travelGraph([])(new Set())([]);
            expect(a.size).toBe(0);
        });

        it('Can take 0 steps', () => {
            const a = travelGraph([])(new Set())(['1']);
            expect(a.size).toBe(1);
        });

        it('Can take 1 steps', () => {
            const a = travelGraph([{from: '1', to: '2'}])(new Set())(['1']);
            expect(a.size).toBe(2);
        });

        it('Size of visited parts of a directed graph', () => {
            const edges = [{ from: '5', to: '6' }, { from: '6', to: '4' }, { from: '6', to: '5' } ];
            const a = travelGraph(edges)(new Set())(['5']);
            expect(a.size).toBe(3);
        });
    });

    it('test case a', () => {
        const edges = parseFile(rawData);
        const a = travelGraph(edges)(new Set())(['0']);
        expect(a.size).toEqual(6);
    });

    it('case b', () => {
        const starts = [...Array(6).keys()].map(x => x.toString()); // inspection says there are 2000 lines of data
        const edges = parseFile(rawData);
        const groups: Array<Set<string>> = starts.map(start => travelGraph(edges)(new Set())([start]));
        const grps = groups.map(s => [...s].sort().toString());
        const distincts = grps.filter((v, i, a) => a.indexOf(v) === i);

        console.log(distincts);
        expect(distincts.length).toEqual(2);
    });

});
