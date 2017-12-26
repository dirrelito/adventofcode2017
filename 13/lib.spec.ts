import { delayForSafePassage, getSeverity, parseFirewall } from './lib';

const input =
`0: 3
1: 2
4: 4
6: 4
`;
describe('Day 13', () => {
    it('Parse Input', () => {
        const a = parseFirewall(input);
        expect(a).toEqual([ { depth: 0, range: 3 },
            { depth: 1, range: 2 },
            { depth: 4, range: 4 },
            { depth: 6, range: 4 } ]);
    });

    it('Calculates severity', () => {
        const a = parseFirewall(input);
        const s = getSeverity(a)(0);
        expect(s).toBe(24);
    });

    it('Find minDelay', () => {
        const a = parseFirewall(input);
        const d = delayForSafePassage(a);
        expect(d).toBe(10);
    });
});
