import * as fs from 'fs';
import {data } from './input';
import {checkerA, checkerB, isValid} from './lib';

async function main() {
    console.log('Ans to A: ' + data.trim().split(/\r?\n/).filter(isValid(checkerA)).length);
    console.log('Ans to B: ' + data.trim().split(/\r?\n/).filter(isValid(checkerB)).length);
}

exports.main = main;
