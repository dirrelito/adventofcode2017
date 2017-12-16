import * as fs from 'fs';
import { measureGarbage, parseStream, scoreStream } from './lib';

async function main() {
    const data = fs.readFileSync('./9/input.txt', 'utf8').trim();
    const stream = parseStream(data);
    console.log(`Ans to A: ${scoreStream(stream)}`);
    console.log(`Ans to B: ${measureGarbage(stream)}`);
}

exports.main = main;
