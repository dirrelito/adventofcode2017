import * as fs from 'fs';
import {processA, processB} from './lib';

async function main() {
    fs.readFile('./2/input.txt', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.log('A: ', processA(data.trim()));
            console.log('B: ', processB(data.trim()));
        }
    });
}

exports.main = main;
