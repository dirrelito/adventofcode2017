import {readFileSync} from 'fs';
import { command, messageQueue, parseCommand, programState, runDuetProgram, solveA, solveB } from './lib';

const rawB = `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`;

fdescribe('Day 18', () => {
    describe('Case A', ()=> {
        it('Whole case', ()=> {
            const raw = readFileSync('./18/testA.txt', 'utf8');
            const cmds: string[] = raw.trim().split(/\r?\n/);
            const r = solveA(cmds);
            expect(r).toEqual(4);
        });
    });

    it('Parse commands', () => {
        const rawCmdsToTry =
`set a 3
set a a
snd 3
snd q
add a 3
mul e -1
mod q 1
mod q r
rcv a
jgz a e
jgz r 8
jgz 9 1`;
        const tryCmds = rawCmdsToTry.split(/\r?\n/).map(parseCommand);
        const trueCmds: command[] = [
            {k: 'set', target: 'a', val: 3},
            {k: 'set', target: 'a', val: 'a'},
            {k: 'snd', val: 3},
            {k: 'snd', val: 'q'},
            {k: 'add', target: 'a', val: 3},
            {k: 'mul', target: 'e', val: -1},
            {k: 'mod', target: 'q', val: 1},
            {k: 'mod', target: 'q', val: 'r'},
            {k: 'rcv', target: 'a'},
            {k: 'jgz', guard: 'a', skipLength: 'e'},
            {k: 'jgz', guard: 'r', skipLength: 8},
            {k: 'jgz', guard: 9,   skipLength: 1},
        ];
        expect(tryCmds).toEqual(trueCmds);
    });

    it('Case B', () => {
        const cmdsB: string[] = rawB.trim().split(/\r?\n/);
        const a = solveB(cmdsB);
        expect(a).toBe(3);
    });

    fit('Prog1 of B', () => {
        const cmdsB: string[] = rawB.trim().split(/\r?\n/);
        const prog0Before: programState = {
            commands: cmdsB,
            regs: {p:0},
            currentCommandPosition: 0,
            status: 'running',
            numberOfSentMessages: 0,
            inboundMessageQueue: [1,2,1],
            outboundMessageQueue: [],
            };
        const prog0After = runDuetProgram('B')(prog0Before);
        expect(prog0After.outboundMessageQueue).toEqual([1,2,0]);
        expect(prog0After.status).toEqual('waitingForMessages');
        expect(prog0After.currentCommandPosition).toEqual(6);
        expect(prog0After.numberOfSentMessages).toEqual(3);
        expect(prog0After.regs).toEqual({p:0,a:1,b:2,c:1});
        expect(prog0After.inboundMessageQueue).toEqual([]);
    });
});
