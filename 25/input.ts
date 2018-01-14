import { instructionSet, state, stateInstruction } from './lib';

export const initialState: state = 'A';

export const checksumAfterSteps = 12794428;

export const rules: instructionSet = new Map([
    ['A' as state ,[
        [1,'right','B'],
        [0,'left','F'],
    ] as stateInstruction],
    ['B' as state ,[
        [0,'right','C'],
        [0,'right','D'],
    ] as stateInstruction],
    ['C' as state ,[
        [1,'left','D'],
        [1,'right','E'],
    ] as stateInstruction],
    ['D' as state ,[
        [0,'left','E'],
        [0,'left','D'],
    ] as stateInstruction],
    ['E' as state ,[
        [0,'right','A'],
        [1,'right','C'],
    ] as stateInstruction],
    ['F' as state ,[
        [1,'left','A'],
        [1,'right','A'],
    ] as stateInstruction],
]);
