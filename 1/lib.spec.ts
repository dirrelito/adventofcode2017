import * as fs from 'fs';
import {process, processB} from './lib';

describe('Day 1', () => {
    let testData: Array<{input, output}>;
    let testDataB: Array<{input, output}>;

    beforeAll(done => {
        fs.readFile('./1/testData.json', 'utf8', (err, data) => {
            testData = JSON.parse(data).caseA;
            testDataB = JSON.parse(data).caseB;
            done();
        });
    });

    describe('A', () => {
        it('Testcase 1', () => {
            const i = testData[0].input;
            const o = testData[0].output;
            expect(process(i)).toBe(o);
        });
        it('Testcase 2', () => {
            const i = testData[1].input;
            const o = testData[1].output;
            expect(process(i)).toBe(o);
        });
        it('Testcase 3', () => {
            const i = testData[2].input;
            const o = testData[2].output;
            expect(process(i)).toBe(o);
        });
        it('Testcase 4', () => {
            const i = testData[3].input;
            const o = testData[3].output;
            expect(process(i)).toBe(o);
        });
    });
    describe('B', () => {
        it('Testcase 1', () => {
            const i = testDataB[0].input;
            const o = testDataB[0].output;
            expect(processB(i)).toBe(o);
        });
        it('Testcase 2', () => {
            const i = testDataB[1].input;
            const o = testDataB[1].output;
            expect(processB(i)).toBe(o);
        });
        it('Testcase 3', () => {
            const i = testDataB[2].input;
            const o = testDataB[2].output;
            expect(processB(i)).toBe(o);
        });
        it('Testcase 4', () => {
            const i = testDataB[3].input;
            const o = testDataB[3].output;
            expect(processB(i)).toBe(o, 'input was' + i);
        });
    });
});
