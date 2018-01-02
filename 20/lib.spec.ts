import {stream} from 'parser-combinator';
import { particle, particleParser, vec3, vec3Parser, fullInputParser, newLine, particleParserNL, indexOfMin, vecNorm, indexOfMinAcceleration, move, collideAndDestroy, applyNTimes, tick, vecAdd } from './lib';

const rawTestInputA =
`p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>
`;

const parsedTestInputA: particle[] = [
    {p:[3,0,0], v:[2,0,0], a:[-1,0,0]},
    {p:[4,0,0], v:[0,0,0], a:[-2,0,0]},
];
const rawTestInputB =
`p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>
p=<-4,0,0>, v=<2,0,0>, a=<0,0,0>
p=<-2,0,0>, v=<1,0,0>, a=<0,0,0>
p=<3,0,0>, v=<-1,0,0>, a=<0,0,0>
`;

describe('Day 20', () => {
    describe('Parsing', () => {
        it('a 3-vec', () => {
            const v1 = vec3Parser.parse(stream.ofString('<1,-4,0>')).value;
            const v2: vec3 = [1,-4,0];
            expect(v1).toEqual(v2);
        });
        it('a particle', () => {
            const p1 = particleParser.parse(stream.ofString('p=<-612,217,-1523>, v=<-34,7,105>, a=<11,-3,2>')).value;
            const p2: particle = {p:[-612,217,-1523], v:[-34,7,105], a:[11,-3,2]};
            expect(p1).toEqual(p2);
        });
        it('a particle with newline', () => {
            const p1 = particleParserNL.parse(stream.ofString(
                'p=<-612,217,-1523>, v=<-34,7,105>, a=<11,-3,2>\n')).value;
            const p2: particle = {p:[-612,217,-1523], v:[-34,7,105], a:[11,-3,2]};
            expect(p1).toEqual(p2);
        });
        it('new line', () => {
            expect(newLine.parse(stream.ofString('\n')).value).toEqual('\n');
            expect(newLine.parse(stream.ofString('\r\n')).value).toEqual('\r\n');
        });
        it('two particles', () => {
            const ps: particle[] = fullInputParser.parse(stream.ofString(rawTestInputA)).value;
            expect(ps).toEqual(parsedTestInputA);
        })
    });
    it('index of min', () => {
        expect(indexOfMin([2,7,54,-9,1,5])).toBe(3);
    });
    it('vector norm', () => {
        expect(vecNorm([0,0,0])).toBe(0);
        expect(vecNorm([1,0,0])).toBe(1);
        expect(vecNorm([1,1,0])).toBe(Math.sqrt(2));
        expect(vecNorm([1,-1,0])).toBe(Math.sqrt(2));
    });
    it('can compare accs', () => {
        expect(indexOfMinAcceleration(parsedTestInputA)).toBe(0);
    });
    it('Can tick a particle', () => {
        const p = parsedTestInputA[0];
        const pUpdated = move(p);
        // console.log(pUpdated)
        expect(pUpdated).toEqual({p:[4,0,0], v:[1,0,0], a:[-1,0,0]});
    });
    it('Can destroy three particles', () => {
        const ps: particle[] = fullInputParser.parse(stream.ofString(rawTestInputB)).value;
        const psUpdated = ps.map(p => move(move(p)));
        const psCleansedTry = collideAndDestroy(psUpdated).map(move);
        const psCleansedTrue = particleParser.parse(stream.ofString('p=<0,0,0>, v=<-1,0,0>, a=<0,0,0>')).value;
        expect(psCleansedTry).toEqual([psCleansedTrue]);
    });
    it('Case B', () => {
        const ps: particle[] = fullInputParser.parse(stream.ofString(rawTestInputB)).value;
        const n = 1000;
        const psAfterN = applyNTimes(tick)(n)(ps);
        expect(psAfterN.length).toBe(1);
    });
    it('Can add vectors', () => {
        const w = vecAdd([1,1,1],[-1,0,1]);
        expect(w).toEqual([0,1,2]);
    })
    it('Can repeat an action many times', () => {
        const five = applyNTimes((n: number) => n + 1)(5)(0);
        // console.log(five)
        expect(five).toBe(5);
    })
});
