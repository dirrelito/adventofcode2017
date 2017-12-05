import { checkerA, checkerB, isValid } from './lib';

describe('Day 3', () => {
    it('A', () => {
        expect(isValid(checkerA)('aa bb cc dd ee')).toBe(true);
        expect(isValid(checkerA)('aa bb cc dd aa')).toBe(false);
        expect(isValid(checkerA)('aa bb cc dd aaa')).toBe(true);
    });

    it('B', () => {
        const f = isValid(checkerB);
        expect(f("abcde fghij")).toBeTruthy();
        expect(f("abcde xyz ecdab")).toBeFalsy();
        expect(f("a ab abc abd abf abj")).toBeTruthy();
        expect(f("iiii oiii ooii oooi oooo")).toBeTruthy();
        expect(f("oiii ioii iioi iiio")).toBeFalsy();
    });
});
