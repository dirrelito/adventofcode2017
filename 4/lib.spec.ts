import { checkerA, isValid } from './lib';

describe('Day 3', () => {
    it('A', () => {
        expect(isValid(checkerA)('aa bb cc dd ee')).toBe(true);
        expect(isValid(checkerA)('aa bb cc dd aa')).toBe(false);
        expect(isValid(checkerA)('aa bb cc dd aaa')).toBe(true);
    });
});
