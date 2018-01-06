import { applyNTimes } from '../util/lib';
import { infectionMap, makeEvolvedVirusBurst, makePrimitiveVirusBurst,
     parseMap, solveA, solveB, stateBetweenBursts } from './lib';

const testA =
`..#
#..
...
`;
const s0Maker = (): stateBetweenBursts => ({
    virusCarrierHeading: 'up',
    virusCarrierPosition: [0,0],
    computingCluster: new Map([
        ['1,1','infected'],
        ['-1,0','infected'],
    ]) as infectionMap,
    infectiveActions: 0,
});

describe('Day 22', () => {
    it('Can parse a map', ()=> {
        const a = parseMap(testA);
        expect([...a.entries()]).toEqual([
            ['1,1','infected'],
            ['-1,0','infected'],
        ]);
    });
    describe('primitive virus', () => {
        it('Can burst 1', ()=> {
            const s2 = makePrimitiveVirusBurst(s0Maker());
            expect(s2.virusCarrierHeading).toBe('left');
            expect(s2.virusCarrierPosition).toEqual([-1,0]);
            expect([...s2.computingCluster.entries()]).toEqual([
                ['1,1','infected'],
                ['-1,0','infected'],
                ['0,0','infected'],
            ]);
        });
        it('Can burst 2', ()=> {
            const s2 = applyNTimes(makePrimitiveVirusBurst)(2)(s0Maker());
            expect(s2.virusCarrierHeading).toBe('up');
            expect(s2.virusCarrierPosition).toEqual([-1,1]);
            expect([...s2.computingCluster.entries()]).toEqual([
                ['1,1','infected'],
                ['-1,0','clean'],
                ['0,0','infected'],
            ]);
        });
        it('Can burst 7', ()=> {
            const s7 = applyNTimes(makePrimitiveVirusBurst)(7)(s0Maker());
            expect(s7.virusCarrierHeading).toBe('right');
            expect(s7.virusCarrierPosition.toString()).toBe('0,1');
            expect([...s7.computingCluster.entries()]).toEqual([
                ['1,1','infected'],
                ['-1,0','infected'],
                ['0,0','infected'],
                ['-1,1','clean'],
                ['-2,1','infected'],
                ['-2,0','infected'],
            ]);
        });
        it('Can count number of infective bursts 70', ()=> {
            const a = solveA(testA)(70);
            expect(a).toBe(41);
        });
        it('Can count number of infective bursts 10000', ()=> {
            const a = solveA(testA)(10000);
            expect(a).toBe(5587);
        });
    });
    describe('Evolved virus', () => {
        it('Can burst 1', ()=> {
            const s1 = applyNTimes(makeEvolvedVirusBurst)(1)(s0Maker());
            expect(s1.virusCarrierHeading).toBe('left');
            expect(s1.virusCarrierPosition).toEqual([-1,0]);
            expect([...s1.computingCluster.entries()]).toEqual([
                ['1,1','infected'],
                ['-1,0','infected'],
                ['0,0','weakened'],
            ]);
        });
        it('Can burst 2', ()=> {
            const s2 = applyNTimes(makeEvolvedVirusBurst)(2)(s0Maker());
            expect(s2.virusCarrierHeading).toBe('up');
            expect(s2.virusCarrierPosition).toEqual([-1,1]);
            expect([...s2.computingCluster.entries()]).toEqual([
                ['1,1','infected'],
                ['-1,0','flagged'],
                ['0,0','weakened'],
            ]);
        });
        it('Can burst 5', ()=> {
            const s5 = applyNTimes(makeEvolvedVirusBurst)(5)(s0Maker());
            expect(s5.virusCarrierHeading).toBe('right');
            expect(s5.virusCarrierPosition).toEqual([-1,0]);
            expect([...s5.computingCluster.entries()]).toEqual([
                ['1,1','infected'],
                ['-1,0','flagged'],
                ['0,0','weakened'],
                ['-1,1','weakened'],
                ['-2,1','weakened'],
                ['-2,0','weakened'],
            ]);
        });
        it('Can burst 6', ()=> {
            const s6 = applyNTimes(makeEvolvedVirusBurst)(6)(s0Maker());
            expect(s6.virusCarrierHeading).toBe('left');
            expect(s6.virusCarrierPosition).toEqual([-2,0]);
            expect([...s6.computingCluster.entries()]).toEqual([
                ['1,1','infected'],
                ['-1,0','clean'],
                ['0,0','weakened'],
                ['-1,1','weakened'],
                ['-2,1','weakened'],
                ['-2,0','weakened'],
            ]);
        });
        it('Can burst 7', ()=> {
            const s7 = applyNTimes(makeEvolvedVirusBurst)(7)(s0Maker());
            expect(s7.virusCarrierHeading).toBe('left');
            expect(s7.virusCarrierPosition).toEqual([-3,0]);
            expect([...s7.computingCluster.entries()]).toEqual([
                ['1,1','infected'],
                ['-1,0','clean'],
                ['0,0','weakened'],
                ['-1,1','weakened'],
                ['-2,1','weakened'],
                ['-2,0','infected'],
            ]);
        });
        it('Can count number of infective bursts 100', ()=> {
            const a = solveB(testA)(100);
            expect(a).toBe(26);
        });
        it('Can count number of infective bursts 10000000', ()=> {
            const a = solveB(testA)(1e7);
            expect(a).toBe(2511944);
        });
    });
});
