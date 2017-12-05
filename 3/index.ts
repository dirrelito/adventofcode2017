import * as fs from 'fs';
import {fillBBoard, getCoords, getNum, manhattanDistance, setNum} from './lib';

async function main() {
    fs.readFile('./2/input.txt', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            const MY_INPUT = 325489;
            console.log('A: ', manhattanDistance(getCoords(MY_INPUT)));
            let b = setNum(new Map())({x: 0, y: 0})(1);
            let currVal = 1;
            for (let j = 2; currVal < MY_INPUT; j++) {
                b = fillBBoard(b)(j);
                currVal = getNum(b)(getCoords(j));
            }
            console.log('B: ', currVal);
        }
    });
}

exports.main = main;
