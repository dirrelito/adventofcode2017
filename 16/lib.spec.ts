import {stream} from 'parser-combinator';
import { dance1, danceMove, exchangeParser, moveParser, partnerParser, program, spinParser, moveListParser, parseDanceMoves, findCycleLength, shortCircuitDanceNTimes } from './lib';

fdescribe('Day 16', () => {
    describe('Dance1', () => {
        it('spin', () => {
            const d: program[] = ['a','b','c','d','e'];
            const m: danceMove = {kind:'spin',count:1};
            const d2 = dance1(d)(m);
            expect(d2).toEqual(['e','a','b','c','d']);
        });
        it('exchange', () => {
            const d: program[] = ['e','a','b','c','d'];
            const m: danceMove = {kind:'exchange',position1:3,position2:4};
            const d2 = dance1(d)(m);
            expect(d2).toEqual(['e','a','b','d','c']);
        });
        it('partner', () => {
            const d: program[] = ['e','a','b','d','c'];
            const m: danceMove = {kind:'partner',program1:'e',program2:'b'};
            const d2 = dance1(d)(m);
            expect(d2).toEqual(['b','a','e','d','c']);
        });
        it('Dance A', () => {
            const d: program[] = ['a','b','c','d','e'];
            const ms: danceMove[] = [{kind:'spin',count:1},
            {kind:'exchange',position1:3,position2:4},
            {kind:'partner',program1:'e',program2:'b'}];
            expect(ms.reduce((lineup,move) => dance1(lineup)(move),d)).toEqual(['b','a','e','d','c']);
        });
    });

    describe('Parsing', () => {
        it('spin', () => {
            const m = spinParser.parse(stream.ofString('s3')).value;
            expect(m).toEqual({kind:'spin',count:3});
        });
        it('exchange', () => {
            const m = exchangeParser.parse(stream.ofString('x10/3')).value;
            expect(m).toEqual({kind:'exchange',position1:10,position2:3});
        });
        it('partner', () => {
            const m = partnerParser.parse(stream.ofString('pe/a')).value;
            expect(m).toEqual({kind:'partner',program1:'e',program2:'a'});
        });
        it('moveParser', () => {
            const m = moveParser.parse(stream.ofString('pe/a')).value;
            expect(m).toEqual({kind:'partner',program1:'e',program2:'a'});
        });
        it('moveListParser one', () => {
            const m = moveListParser.parse(stream.ofString('pe/a')).value;
            expect(m).toEqual([{kind:'partner',program1:'e',program2:'a'}]);
        });
        it('moveListParser two', () => {
            const ms = moveListParser.parse(stream.ofString('pe/a,x10/3')).value;
            expect(ms).toEqual([{kind:'partner',program1:'e',program2:'a'},{kind:'exchange',position1:10,position2:3}]);
        });
        it('wrapped moveListParser two', () => {
            const ms = parseDanceMoves('pe/a,x10/3');
            expect(ms).toEqual([{kind:'partner',program1:'e',program2:'a'},{kind:'exchange',position1:10,position2:3}]);
        });
    });

    it('Parse and dance A', () => {
        const d: program[] = ['a','b','c','d','e'];
        const ms: danceMove[] = parseDanceMoves('s1,x3/4,pe/b')
        expect(ms.reduce((lineup,move) => dance1(lineup)(move),d)).toEqual(['b','a','e','d','c']);
    });

    it('Count cycle length', () => {
        const d: program[] = ['a','b','c','d','e'];
        const ms: danceMove[] = parseDanceMoves('s1');
        expect(findCycleLength(ms)(d)).toEqual(5);
    });
    it('Quickdance', () => {
        const d: program[] = ['a','b','c','d','e'];
        const ms: danceMove[] = parseDanceMoves('s1');
        expect(shortCircuitDanceNTimes(ms)(d)(10000003)).toEqual(['c','d','e','a','b']);
    });

});
