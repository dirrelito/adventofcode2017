import * as fs from 'fs';
import {getCoords, manhattanDistance} from './lib';

async function main() {
    fs.readFile('./2/input.txt', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.log('A: ', manhattanDistance(getCoords(325489)));
            // console.log('B: ', processB(data.trim()));
        }
    });
}

exports.main = main;
