import {C, F, N, stream} from 'parser-combinator';
import { assertNever } from '../util/lib';

export type program = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' |'m' |'n'|'o'|'p';
export type danceMove =
    {kind: 'spin', count: number} |
    {kind: 'exchange', position1: number, position2: number} |
    {kind: 'partner', program1: program, program2: program};

export const dance1 = (dancers: program[]) => (move: danceMove) => {
    switch (move.kind) {
        case 'spin':
            const cutPosition = dancers.length - move.count;
            const head = dancers.slice(0, cutPosition);
            const tail = dancers.slice(cutPosition);
            return tail.concat(head);
        case 'exchange':
            const dancers2 = dancers.slice(0);
            dancers2[move.position1] = dancers[move.position2];
            dancers2[move.position2] = dancers[move.position1];
            return dancers2;
        case 'partner':
            const position1 = dancers.indexOf(move.program1);
            const position2 = dancers.indexOf(move.program2);
            return dance1(dancers)({kind:'exchange',position1,position2});
        default:
            assertNever(move);
    }
};

export const spinParser = C.char('s').drop().then(N.integer).map(val => ({kind:'spin',count:val}));
export const exchangeParser = C.char('x').drop()
                            .then(N.integer)
                            .then(C.char('/').drop())
                            .then(N.integer)
                            .map(list => ({kind:'exchange',position1:list[0],position2:list[1]}));
export const partnerParser = C.char('p').drop()
                            .then(C.charIn('abcdefghijklmnop'))
                            .then(C.char('/').drop())
                            .then(C.charIn('abcdefghijklmnop'))
                            .map(list => ({kind:'partner',program1:list[0],program2:list[1]}));

export const moveParser = spinParser.or(exchangeParser).or(partnerParser);
export const moveListParser = moveParser.then(C.char(',').thenRight(moveParser).optrep())
    .map(arr => [arr[0], ...arr[1].array()]);

export const parseDanceMoves = input => moveListParser.parse(stream.ofString(input)).value;

export const findCycleLength = danceMoves => lineup => {
    let d = lineup.slice(0);
    d = danceMoves.reduce((dancers,move) => dance1(dancers)(move),d);
    let i = 1;
    while (d.join('') !== lineup.join('')) {
        d = danceMoves.reduce((dancers,move) => dance1(dancers)(move),d);
        i++;
    }
    return i;
};

export const shortCircuitDanceNTimes = danceMoves => lineup => nTimesAll => {
    const m = findCycleLength(danceMoves)(lineup);
    const nTimes = nTimesAll % m;
    let d = lineup.slice(0);
    for(let i = 1; i <= nTimes; i++) {
        d = danceMoves.reduce((dancers,move) => dance1(dancers)(move),d);
    }
    return d;
};
