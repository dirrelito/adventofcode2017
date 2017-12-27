import { knotHash, take } from '../10/lib';
import { range } from '../util/lib';
import { concatMap, diskState, generateHashDisk, getUnlabelledCoords, hexCharToBinArray,
     sumFromDiskState, 
     regionMaxNo,
     labelRegion,
     labelNewRegion} from './lib';

const input = 'flqrgnkx';

fdescribe('Day 14', () => {

    describe('hex2bin', () => {
        it('1', () => { expect(hexCharToBinArray('1')).toEqual(['0','0','0','1']); });
        it('a', () => { expect(hexCharToBinArray('a')).toEqual(['1','0','1','0']); });
    });

    it('generate disk test A', () => {
        const disk = generateHashDisk(input);
        const peek = take(disk)(8).map(row => take(row)(8));

        expect(peek).toEqual([
  [ '#', '#', '.', '#', '.', '#', '.', '.' ],
  [ '.', '#', '.', '#', '.', '#', '.', '#' ],
  [ '.', '.', '.', '.', '#', '.', '#', '.' ],
  [ '#', '.', '#', '.', '#', '#', '.', '#' ],
  [ '.', '#', '#', '.', '#', '.', '.', '.' ],
  [ '#', '#', '.', '.', '#', '.', '.', '#' ],
  [ '.', '#', '.', '.', '.', '#', '.', '.' ],
  [ '#', '#', '.', '#', '.', '#', '#', '.' ] ]);
    });

    it('count disk state test A', () => {
        const disk = generateHashDisk(input);
        const val = sumFromDiskState(disk);
        expect(val).toBe(8108);
    });

    describe('concatmap', () => {
        it('happy1', () => {
            const f = s => [s,(s+1)];
            const a = [1,3];
            expect(concatMap(f)(a)).toEqual([1,2,3,4]);
        });
    });

    it('can produce a list of unlaballed points on a map', () => {
        const state: diskState = [['.','#'],['#','.']];
        const coords = getUnlabelledCoords(state);
        expect(coords).toEqual([{x:0,y:1},{x:1,y:0}]);
    });

    it('can identify the max region no on a disk state', () => {
        const state: diskState = [['.',1],[5,'#'],[1,'.']];
        const m = regionMaxNo(state);
        expect(m).toBe(5);
    });

    it('can fill small board', () => {
        const state: diskState = [
            ['#','.'],
            ['#','#'],
        ];
        const state2 = labelRegion(state)({x:0,y:0})(3);
        expect(state2).toEqual([
            [3,'.'],
            [3,3],
        ]);
    });
    it('can separate groups and make new label', () => {
        const state: diskState = [
            ['#','.','#'],
        ];
        const state2 = labelNewRegion(state)({x:0,y:0});
        expect(state2).toEqual([
            [1,'.','#'],
        ]);
    });
    it('can label a fresh map', () => {
        const state: diskState = [
            ['#','.','#'],
            ['.','.','#'],
        ];
        const coords = getUnlabelledCoords(state);
        const state2 = coords.reduce((ds,coord) => labelNewRegion(ds)(coord), state);
        expect(state2).toEqual([
            [1,'.',2],
            ['.','.',2],
        ]);
    });
});
