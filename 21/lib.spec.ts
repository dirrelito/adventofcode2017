import { chunk2D, flatten, FractalArtImage, FractalArtImageMapping,
     parseStringMappings, rotate2DArrCW, Ruleset, unChunk2D, uniquesBy } from './lib';
import { map2 } from '../util/lib';

const startInput = '.#./..#/###';

const rawTestInputA =
`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
`;

const stringMappingTrue: Array<[string,string]> = [
    ['../.#','##./#../...'],
    ['.#./..#/###','#..#/..../..../#..#'],
];

const imageMapTrue1 = new FractalArtImageMapping([
    new FractalArtImage('../.#'),
    new FractalArtImage('##./#../...')]);

describe('Day 21', () => {
    describe('Functions', ()=> {
        it('can parse several string mappings', () => {
            const stringMappingTry = parseStringMappings(rawTestInputA);
            expect(stringMappingTry).toEqual(stringMappingTrue);
        });
        it('Rotate arr CW', ()=> {
            const a1= [[1,2,3],[4,5,6]];
            expect(rotate2DArrCW(a1)).toEqual([[4,1],[5,2],[6,3]]);
        });
        it('Uniques by', () => {
            const u = uniquesBy((n: number) => n)([1,4,2,5,2,1,2]);
            expect(u).toEqual([1,4,2,5]);
            const u2 = uniquesBy((s: string) => s.length)(['apa','boll','röv']);
            expect(u2).toEqual(['apa','boll']);
        });
        it('flatten', () => {
            const raw = [[1,2,3],[1,2]];
            expect(flatten(raw)).toEqual([1,2,3,1,2]);
        });
        it('chunk2D', () => {
            const input = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
            const output = [[[[1,2],[5,6]],[[3,4],[7,8]]],[[[9,10],[13,14]],[[11,12],[15,16]]]];
            expect(chunk2D(input,2)).toEqual(output);
        });
        it('unChunk2D', () => {
            const output = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
            const input = [[[[1,2],[5,6]],[[3,4],[7,8]]],[[[9,10],[13,14]],[[11,12],[15,16]]]];
            expect(unChunk2D(input)).toEqual(output);
        });
    });
    describe('Image class', () => {
        it('Can be created from image string (2x2)', ()=> {
            const i1 = new FractalArtImage('.#/#.');
            expect(i1.size).toBe(2);
            expect(i1.data).toEqual([[false,true],[true,false]]);
        });
        it('Can be created from image string (3x3)', ()=> {
            const i1 = new FractalArtImage('.#./##./###');
            expect(i1.size).toBe(3);
            expect(i1.data).toEqual([[false,true,false],[true,true,false],[true,true,true]]);
        });
        describe('Has the symmetry group (R=rotate CW, F=flip rows)', ()=> {
            it('R', () => {
                const i1 = new FractalArtImage('../.#');
                const i2 = new FractalArtImage('../#.');
                expect(i1.rotateCW()).toEqual(i2);
            });
            it('F', () => {
                const i1 = new FractalArtImage('../.#');
                const i2 = new FractalArtImage('.#/..');
                expect(i1.flipRows()).toEqual(i2);
            });
            it('RF', () => {
                const i1 = new FractalArtImage('../.#');
                expect(i1.flipRows().rotateCW()).toEqual(i1);
                const i2 = new FractalArtImage('.#/..');
                const i3 = new FractalArtImage('../#.');
                expect(i2.flipRows().rotateCW()).toEqual(i3);
            });
            it('can find all symmetries', () => {
                const i1 = new FractalArtImage('#./..');
                const is = [
                    i1,
                    new FractalArtImage('.#/..'),
                    new FractalArtImage('../.#'),
                    new FractalArtImage('../#.'),
                ];
                expect(i1.allSymmetries().sort()).toEqual(is.sort());
            });
        });
        it('Can break down image into small parts', () => {
            const input = new FractalArtImage([
                [true,true,false,false],
                [true,true,false,false],
                [false,false,true,true],
                [false,false,true,true]]);
            const smallies = map2((f: FractalArtImage) => f.data)(input.partition());
            const output = [[[[true,true],[true,true]],[[false,false],[false,false]]],
                            [[[false,false],[false,false]],[[true,true],[true,true]]]];
            expect(smallies).toEqual(output);
        });
        it('Can enhance simple', () => {
            const startImage = new FractalArtImage(stringMappingTrue[0][0]);
            const endImageTrue = new FractalArtImage(stringMappingTrue[0][1]);
            const faim = new FractalArtImageMapping(stringMappingTrue[0]);
            const rs = new Ruleset([faim]);
            const endImage = startImage.enhance(rs);
            expect(endImage).toEqual(endImageTrue);
        });
        it('Can enhance bigger', () => {
            const startImage = new FractalArtImage('..../.##./.##./....');
            const endImageTrue = new FractalArtImage('##.##./#..#../....../##.##./#..#../......');
            const faim = new FractalArtImageMapping(stringMappingTrue[0]);
            const rs = new Ruleset([faim]);
            const endImage = startImage.enhance(rs);
            expect(endImage).toEqual(endImageTrue);
        });
        it('can count pxels', () => {
            const a = new FractalArtImage('..../.##./.##./....');
            expect(a.pixelCount()).toBe(4);
        });
    });

    describe('Mapping class', () => {
        it('Can be created from a raw rule', () => {
            const r1 = new FractalArtImageMapping(stringMappingTrue[0]);
            expect(r1).toEqual(imageMapTrue1);
        });
    });
    describe('Ruleset', ()=> {
        it('can be created', ()=> {
            const faim = new FractalArtImageMapping(stringMappingTrue[0]);
            const rs = new Ruleset([faim]);
            expect(rs.rules.length).toBe(4);
        });
    });
    it('Test case A', () => {
        const a = parseStringMappings(rawTestInputA);
        const b = a.map(map => new FractalArtImageMapping(map));
        const c = new FractalArtImage(startInput);
        const rs = new Ruleset(b);
        const d = c.enhance(rs,2);
        expect(d.pixelCount()).toBe(12);
    });
});
