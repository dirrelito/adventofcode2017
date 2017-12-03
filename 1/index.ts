import * as fs from 'fs';
import {process, processB} from './lib';

async function main() {
    fs.readFile('./1/input.txt', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.log('A: ',process(data.trim()));
        }
    });
    fs.readFile('./1/inputB.txt', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.log('B: ', processB(data.trim()));
        }
    });
}

exports.main = main;
