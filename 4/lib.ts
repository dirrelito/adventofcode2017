export const isValid = checker => (raw: string) => {
    const words = raw.split(/\s+/);
    const count = words.reduce(checker, {set: new Set(), count: 0}).count;
    return count === 0;
};

export const checkerA = (prevAcc, nextWord) => {
    const acc = { set: prevAcc.set, count: prevAcc.count };
    if (acc.set.has(nextWord)) { acc.count = acc.count + 1; } else { acc.set.add(nextWord); }
    return acc;
};

export const checkerB = (prevAcc, nextWord) => {
    const sortedWord = sortStrChars(nextWord);
    const acc = { set: prevAcc.set, count: prevAcc.count };
    if (acc.set.has(sortedWord)) { acc.count = acc.count + 1; } else { acc.set.add(sortedWord); }
    return acc;
};

const sortStrChars = (str: string) => {
    return str.split('').sort().join('');
};
