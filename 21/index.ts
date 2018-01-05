import { readFileSync } from 'fs';
import { FractalArtImage, FractalArtImageMapping, parseStringMappings, Ruleset } from './lib';

async function main() {

    const startInput = '.#./..#/###';
    const raw = readFileSync('./21/input.txt','utf8');
    const a = parseStringMappings(raw);
    const b = a.map(map => new FractalArtImageMapping(map));
    const c = new FractalArtImage(startInput);
    const rs = new Ruleset(b);
    const d = c.enhance(rs,5);
    const e = c.enhance(rs,18);
    console.log(`Ans for part A:${d.pixelCount()}`);
    console.log(`Ans for part B:${e.pixelCount()}`);
}
exports.main = main;
