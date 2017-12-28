import { bufferToArray, createZeroNode, solveA, solveACustom, solveBCustom } from './lib';

describe('Day 17', () => {

    it('A', ()=> {
        const testA = 3;
        const afterLastInsert = solveA(testA);
        expect(afterLastInsert).toBe(638);
    });

    it('create zNode', ()=> {
        const a = {value:0,next:null};
        a.next = a;
        expect(createZeroNode()).toEqual(a);
    });

    it('buffer to array', () => {
        const node2 = {value:2,next:null};
        const node1 = {value:1,next:node2};
        const node0 = {value:0,next:node1};
        node2.next = node0;
        expect(bufferToArray(node0)).toEqual([0,1,2]);
    });
    it('Quick solve for B - small sample', () => {
        const p1 = solveACustom(10)(2);
        const q1 = solveBCustom(10)(2);
        expect(p1.zNode.next.value).toEqual(q1);
    });
    it('Quick solve for B - larger sample', () => {
        const p1 = solveACustom(10000)(51);
        const q1 = solveBCustom(10000)(51);
        expect(p1.zNode.next.value).toEqual(q1);
    });
});
