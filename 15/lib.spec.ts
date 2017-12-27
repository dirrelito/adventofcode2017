import { countCollisions, countCollisionsB } from "./lib";

describe('Day 15', () => {
    describe('Case A', () => {
        it('Small sample test for A', () => {
            expect(countCollisions(65)(8921)(5)).toBe(1);
        });
        it('Huge  sample test for A', () => {
            expect(countCollisions(65)(8921)(40000000)).toBe(588);
        });
    });
    describe('Case B', () => {
        it('Small sample test for A', () => {
            expect(countCollisionsB(65)(8921)(5)).toBe(0);
        });
        it('First collision', () => {
            expect(countCollisionsB(65)(8921)(1056)).toBe(1);
        });
        it('Huge  sample test for A', () => {
            expect(countCollisionsB(65)(8921)(5000000)).toBe(309);
        });
    });
})
