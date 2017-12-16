import {C, F, N, stream} from 'parser-combinator';

export type node =
    {kind: 'group', content: node[]} |
    {kind: 'garbage', content: string};

export const scoreStream = (input: node, parentNodeLvl: number = 0) => {
    if (input.kind === 'garbage') {
        return 0;
    } else { // it is a group
        const thisNodeScore = parentNodeLvl + 1;
        const childrenScore = input.content.map(n => scoreStream(n, parentNodeLvl + 1)).reduce((a,b) => a + b, 0);
        return thisNodeScore + childrenScore;
    }
};

const garbageInnerCombinator = C.charNotIn('>!')
                                      .or(C.char('!').then(F.any));

const garbageParser = C.char('<').drop()
                       .then(garbageInnerCombinator.optrep())
                       .then(C.char('>').drop())
                       .map(list => ({ kind: 'garbage', content: list.array().join('') }));

function groupParser() {
    return C.char('{').thenRight(F.lazy(groupOrGarbListParser).opt()).thenLeft(C.char('}').drop())
    .map(option => ({ kind: 'group', content: option.value === undefined ? [] : option.value }));
}

function groupOrGarbParser() {
    return garbageParser.or(F.lazy(groupParser));
}

function groupOrGarbListParser() {
    return groupOrGarbParser().then(C.char(',').thenRight(groupOrGarbParser()).optrep())
    .map(arr => [ arr[0], ...arr[1].array()]);
}

export const parseStream = rawStream => groupParser().parse(stream.ofString(rawStream)).value;
export const parseGarbage = rawStream => garbageParser.parse(stream.ofString(rawStream)).value;

export const measureGarbage = (n: node) => {
    if (n.kind === 'group') {
        return n.content.map(measureGarbage).reduce((a, b) => a + b, 0);
    } else {
        return measureSingleGarbage(n.content);
    }
};

const measureSingleGarbage = (content, weight= 0) => {
    if (content.length === 0) {
        return weight;
    } else if (content[0] === '!') {
        return measureSingleGarbage(content.slice(2), weight);
    } else {
        return measureSingleGarbage(content.slice(1), weight + 1);
    }
};
