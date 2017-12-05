
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
    } else {return {x: tangent, y: -radius };
    }
};

export const manhattanDistance = (c: Coordinate) => Math.abs(c.x) + Math.abs(c.y) ;

/**
 *
 * @param board the board that one saves a value into
 * @param coords the coordinates that one saves to
 * @param val the value that is stored
 * @returns the updated board. N.B. the board is a Board, so it will be edited in place.
 */
export const setNum = (board: Board) => coords => val => {
    const b2 = copyBoard(board);
    if (!b2.has(coords.x)) {
        b2.set(coords.x, new Map());
    }
    b2.get(coords.x).set(coords.y, val);
    return b2;
};

export const getNum = board => coords => {
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

export const fillBBoard = (board: Board) =>  ordMax => {
    if (getNum(board)({x: 0, y: 0}) === 0) { throw new Error('Bad board!'); }

    for (let ord = 2; ord <= ordMax ; ord++) {
        const c = getCoords(ord);
        if (getNum(board)(c) === 0) {
            const val = getNeighborsSum(board)(c);
            board = setNum(board)(c)(val);
        }
    }
    return board;
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

export const copyBoard = (b: Board) => {
    const b2 = new Map();
    for (const [xPos, innerMap] of b.entries()) {
        b2.set(xPos, new Map(innerMap));
    }
    return b2;
};

type Board = Map<number, Map<number, number>>;
class Coordinate {
    public x: number;
    public y: number;
}
