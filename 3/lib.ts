
export const getCoords = (ord: number) => {
    if (ord === 1) { return {x: 0, y: 0}; }
    const i = Math.floor(Math.sqrt(ord - 1));
    const lastSquareSide =  i - 1 + (i % 2);
    const stepsInLap = ord - Math.pow(lastSquareSide, 2);
    const side = [1, 2, 3, 4].find(n => n * (lastSquareSide + 1) >= stepsInLap); // right = 1, turning CCW

    const radius = (lastSquareSide + 1) / 2;
    const tangent = stepsInLap - (side - 1) * (lastSquareSide + 1) - ((lastSquareSide + 1) / 2) ;
    if (side === 1) {return {x: radius, y: tangent };
    } else if (side === 2) {return {x: -tangent , y: radius};
    } else if (side === 3) {return {x: -radius, y: -tangent};
    } else if (side === 4) {return {x: tangent, y: -radius };
    } else { throw new Error('Logic error!'); }
};

export const manhattanDistance = (c: Coordinate) => Math.abs(c.x) + Math.abs(c.y) ;

export const saveNum = (board: Board) => coords => val => {
    if (!board.has(coords.x)) {
        board.set(coords.x, new Map());
    }
    board.get(coords.x).set(coords.y, val);
};

const getNum = board => coords => {
    if (!board.has(coords.x)) {
        return 0;
    } else if (!board.get(coords.x).has(coords.y)) {
        return 0;
    } else {
        return board.get(coords.x).get(coords.y);
    }
};

const getNeighborsSum = board => coord => getNeighbors(coord)
    .map(coords => getNum(board)(coords))
    .reduce((a, b) => a + b, 0);

const showBoard = board => lim => {
    let out = '';
    for (let y = lim; y > -lim; y--) {
        for (let x = -lim; x < lim; x++) {
            out = out + ' ' + getNum(board)({x, y}) + '\t';
        }
        out = out + '\n';
    }
    return out;
};

export const getAnsB = (board: Board) => thresh => {
    board.clear();
    saveNum(board)({x: 0, y: 0})(1);
    for (let i = 2; i < 100000 ; i++) {
        const c = getCoords(i);
        const val = getNeighborsSum(c);
        if (val > thresh) { return val; }
        saveNum(board)(c)(val);
    }
    throw new Error('Exceeded max comp stack');
};

export const getNeighbors = (c: Coordinate) => {
    const x = c.x;
    const y = c.y;
    const out: Coordinate[] = [
        {x: x + 1, y: y - 1},
        {x: x + 1, y},
        {x: x + 1, y: y + 1},
        {x, y: y - 1},
        {x, y: y + 1},
        {x: x - 1, y: y - 1},
        {x: x - 1, y},
        {x: x - 1, y: y + 1},
    ];
    return out;
};

type Board = Map<number, Map<number, number>>;
class Coordinate {
    public x: number;
    public y: number;
}
