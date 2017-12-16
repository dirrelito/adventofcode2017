import { measureGarbage, node, parseGarbage, parseStream, scoreStream } from './lib';

const rawGarbage = ['<>', '<random characters>', '<<<<>', '<{!>}>', '<!!>', '<!!!>>', '<{o"i!a,<{i<a>'];
const garbScores = [0, 17, 3, 2, 0, 0, 10];

describe('Day9', () => {

    it('garbage Scoring', () => {
        const g: node = {kind: 'garbage', content: 'i should give 0 pts'};
        const pts = scoreStream(g);
        expect(pts).toBe(0);
    });
    it('Garbage 1', () => {
        const p = parseGarbage('<>');
        expect(p).toEqual({kind: 'garbage', content: ''});
    });
    it('Garbage 2', () => {
        const p = parseGarbage('<random characters>');
        expect(p).toEqual({kind: 'garbage', content: 'random characters'});
    });
    it('Garbage 3', () => {
        expect(parseGarbage('<<<<>')).toEqual({kind: 'garbage', content: '<<<'});
    });
    it('Garbage 4', () => {
        expect(parseGarbage('<{!>}>')).toEqual({kind: 'garbage', content: '{!>}'});
    });
    it('Garbage 5', () => {
        expect(parseGarbage('<!!>')).toEqual({kind: 'garbage', content: '!!'});
    });
    it('Garbage 6', () => {
        expect(parseGarbage('<!!!>>')).toEqual({kind: 'garbage', content: '!!!>'});
    });
    it('Garbage 7', () => {
        expect(parseGarbage('<{o"i!a,<{i<a>')).toEqual({kind: 'garbage', content: '{o"i!a,<{i<a'});
    });

    describe('parse groups', () => {

        it('1', () => {
            const p = parseStream('{}');
            expect(p).toEqual({kind: 'group', content: []});
        });
        it('2', () => {
            const p = parseStream('{{{}}}');
            expect(p).toEqual({kind: 'group',
                               content: [{
                                    kind: 'group',
                                    content: [{
                                        kind: 'group',
                                        content: []},
                                    ]},
                                ]});
        });
        it('3', () => {
            const p = parseStream('{{},{}}');
            expect(p).toEqual({kind: 'group', content: [{kind: 'group', content: []}, {kind: 'group', content: []}]});
        });
        it('4', () => {
            const p = parseStream('{{{},{},{{}}}}'); // 6 groups
            expect(p).toEqual({kind: 'group',
                               content: [{kind: 'group',
                                          content: [{kind: 'group',
                                                     content: []},
                                                    {kind: 'group',
                                                     content: []},
                                                    {kind: 'group',
                                                     content: [{kind: 'group',
                                                                content: []},
                                                    ]},
                                            ]},
                                        ]});
        });
        it('5', () => {
            const p = parseStream('{<{},{},{{}}>}');
            expect(p).toEqual({kind: 'group', content: [{kind: 'garbage', content: '{},{},{{}}'}]});
        });
        it('6', () => {
            const p = parseStream('{<a>,<a>,<a>,<a>}');
            expect(p).toEqual({kind: 'group', content: [
                {kind: 'garbage', content: 'a'},
                {kind: 'garbage', content: 'a'},
                {kind: 'garbage', content: 'a'},
                {kind: 'garbage', content: 'a'},
            ]});
        });
        it('7', () => {
            const p = parseStream('{{<a>},{<a>},{<a>},{<a>}}');
            expect(p).toEqual({kind: 'group', content: [
                {kind: 'group', content: [{kind: 'garbage', content: 'a'}]},
                {kind: 'group', content: [{kind: 'garbage', content: 'a'}]},
                {kind: 'group', content: [{kind: 'garbage', content: 'a'}]},
                {kind: 'group', content: [{kind: 'garbage', content: 'a'}]},
            ]});
        });
        it('8', () => {
            const p = parseStream('{{<!>},{<!>},{<!>},{<a>}}');
            expect(p).toEqual({
                kind: 'group',
                content: [{
                    kind: 'group',
                    content: [{
                        kind: 'garbage',
                        content: '!>},{<!>},{<!>},{<a',
                    }]}]});
        });
    });

    describe('score groups', () => {
        it('1', () => {
            const s = scoreStream(parseStream('{}'));
            expect(s).toBe(1);
        });
        it('2', () => {
            const s = scoreStream(parseStream('{{{}}}'));
            expect(s).toBe(6);
        });
        it('3', () => {
            const s = scoreStream(parseStream('{{},{}}'));
            expect(s).toBe(5);
        });
        it('4', () => {
            const s = scoreStream(parseStream('{{{},{},{{}}}}'));
            expect(s).toBe(16);
        });
        it('5', () => {
            const s = scoreStream(parseStream('{<a>,<a>,<a>,<a>}'));
            expect(s).toBe(1);
        });
        it('6', () => {
            const s = scoreStream(parseStream('{{<ab>},{<ab>},{<ab>},{<ab>}}'));
            expect(s).toBe(9);
        });
        it('7', () => {
            const s = scoreStream(parseStream('{{<!!>},{<!!>},{<!!>},{<!!>}}'));
            expect(s).toBe(9);
        });
        it('8', () => {
            const s = scoreStream(parseStream('{{<a!>},{<a!>},{<a!>},{<ab>}}'));
            expect(s).toBe(3);
        });
    });

    describe('measure garbage', () => {
        it('measure all garbages', () => {
            expect(rawGarbage.map(g => measureGarbage(parseGarbage(g)))).toEqual(garbScores);
        });
    });
});
