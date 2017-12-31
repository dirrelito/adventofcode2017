import { readFileSync } from 'fs';
import { isNull } from 'util';
import { assertNever } from '../util/lib';
import { aContext, findStartY, getNewDir, move1, parseRoutingDiagram, routingDiagram, solve, logType } from './lib';

const testMapA = [
    [ null,null,null,null,null,'|', null, null, null, null, null, null, null, null, null, null ],
    [ null,null,null,null,null,'|',null,null,'+','-','-','+',null,null,null,null ],
    [ null,null,null,null,null,'A',null,null,'|',null,null,'C',null,null,null,null ],
    [ null,'F','-','-','-','|','-','-','-','-','E','|','-','-','+',null ],
    [ null,null,null,null,null,'|',null,null,'|',null,null,'|',null,null,'D',null ],
    [ null,null,null,null,null,'+','B','-','+',null,null,'+','-','-','+',null ],
    ];

describe('day 19', () => {
    const raw = readFileSync('./19/testA.txt','utf8');

    it('Parse Map', () => {
        const m: routingDiagram = parseRoutingDiagram(raw);
        expect(m).toEqual(testMapA);
    });

    it('new dirs', () => {
        const d = getNewDir(5,5,testMapA,'down');
        expect(d).toBe('right');
        const d2 = getNewDir(5,5,testMapA,'down');
        expect(d).toBe('right');
    });

    it('finds start spot', () => {
        const n = findStartY(testMapA);
        expect(n).toBe(5);
    });

    it('move 1 normal', () => {
        const o = move1(testMapA)({x:0,y:5,dir:'down',log:{message:'',distance:1}}) as aContext;
        expect(o.x).toBe(5);
        expect(o.y).toBe(5);
        expect(o.dir).toBe('right');
        expect(o.log.message).toBe('A');
        expect(o.log.distance).toBe(6);
    });
    it('move 1 end', () => {
        const s = move1(testMapA)({x:3,y:14,dir:'left',log:{message:'',distance:1}}) as logType;
        expect(s.message).toBe('EF');
        expect(s.distance).toBe(14);
    });
    it('case a', () => {
        const s = solve(raw);
        expect(s.message).toBe('ABCDEF');
        expect(s.distance).toBe(38);
    });

});
