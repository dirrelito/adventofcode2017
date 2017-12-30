/** ## TYPES -----------------------------------------------------------------------   */

export type programState = {
    regs: registers ,
    commands: string[],
    currentCommandPosition: number,
    status: programStatus,
    numberOfSentMessages: number,
    inboundMessageQueue: messageQueue,
    outboundMessageQueue: messageQueue,
};
export type registers = {[key: string]: number};
export type argument = string | number;
export type programStatus = 'running' | 'terminated' | 'waitingForMessages';
export type messageQueue = number[];
export type command =
    {k: 'set', target: string, val: argument} |
    {k: 'snd', val: argument} |
    {k: 'add', target: string, val: argument} |
    {k: 'mul', target: string, val: argument} |
    {k: 'mod', target: string, val: argument} |
    {k: 'rcv', target: string} |
    {k: 'jgz', guard: argument,skipLength: argument};

/** Util -------------------------------------------------------------------------------------------- */

export const parseCommand = (raw: string): command => {
    const [k,a1,a2] = raw.split(' ');
    const arg1 = parseStringInt(a1);
    const arg2 = parseStringInt(a2);
    if (k === 'set') {
        return {k,target:a1, val:arg2};
    } else if (k === 'snd') {
        return {k, val:arg1};
    } else if (k === 'mod') {
        return {k, target:a1, val:arg2};
    } else if (k === 'add') {
        return {k, target:a1, val:arg2};
    } else if (k === 'mul') {
        return {k, target:a1, val:arg2};
    } else if (k === 'rcv') {
        return {k, target:a1};
    } else if (k === 'jgz') {
        return {k, guard:arg1, skipLength:arg2};
    } else {
        throw new Error(`Cannot parse command ${raw}`);
    }
};

/**
 * If the content is an int, the type is converted to int (base 10)
 * Otherwise, it is kept as a string.
 * @param input A string that might represent an int
 */
const parseStringInt = (input: string): string | number => {
    const tmp = parseInt(input,10);
    if (tmp) {
        return tmp;
    } else {
        return input;
    }
};

const safeGet = (regs: registers,adress: string): number => {
    const tmp = regs[adress];
    if(tmp) {
        return tmp;
    } else {
        return 0;
    }
};

/** Solving ----------------------------------------------------------------------------------------- */

export const runDuetProgram = (mode: 'A'|'B') =>
        (psIn: programState): programState => {
    if (psIn.status === 'terminated') {
        return psIn;
    } else if (psIn.status === 'waitingForMessages' && psIn.inboundMessageQueue.length === 0) {
        return psIn;
    }

    // either the program is running, or program is waiting and there are messages to consume.
    const {regs,commands, inboundMessageQueue, outboundMessageQueue} = psIn;
    const maxCommandPosition = commands.length -1;
    let {numberOfSentMessages,currentCommandPosition} = psIn;
    let modeASound;
    // console.log('Running. When stating,',outboundMessageQueue.length,' items are in outbound.')
    while (currentCommandPosition >= 0 && currentCommandPosition <= maxCommandPosition) {

        const cmd: command = parseCommand(commands[currentCommandPosition]);
        // console.log('Running ',cmd,' on ',regs)
        if(cmd.k === 'set') {
            const value = typeof cmd.val === 'number' ? cmd.val : safeGet(regs,cmd.val);
            regs[cmd.target] = value;
            currentCommandPosition++;

        } else if(cmd.k === 'add') {
            const value = typeof cmd.val === 'number' ? cmd.val : safeGet(regs,cmd.val);
            regs[cmd.target] += value;
            currentCommandPosition++;

        } else if(cmd.k === 'mul') {
            const value = typeof cmd.val === 'number' ? cmd.val : safeGet(regs,cmd.val);
            regs[cmd.target] *= value;
            currentCommandPosition++;

        } else if(cmd.k === 'mod') {
            const value = typeof cmd.val === 'number' ? cmd.val : safeGet(regs,cmd.val);
            regs[cmd.target] %= value;
            currentCommandPosition++;

        } else if(cmd.k === 'snd') {
            const frequency = typeof cmd.val === 'number' ? cmd.val : safeGet(regs,cmd.val);
            // console.log('Sending',cmd,frequency);
            // console.log('Sending',frequency,'. Now ',outboundMessageQueue.length,' messages are outgoing');
            if (mode === 'A') {
                modeASound = frequency;
            } else {
                outboundMessageQueue.push(frequency);
                numberOfSentMessages++;
            }
            currentCommandPosition++;

        } else if(cmd.k === 'rcv') {
            const guardVal = safeGet(regs,cmd.target);
            // console.log(targetVal)
            // console.log('Running receive. Guard val:',guardVal, 'Target reg:', cmd.target);
            if (mode === 'A' && guardVal !== 0) {
                // console.log(inboundMessageQueue)
                return {
                    commands,
                    regs,
                    currentCommandPosition,
                    numberOfSentMessages,
                    status: 'terminated',
                    inboundMessageQueue,
                    outboundMessageQueue: [modeASound],
                };
            } else if (mode === 'B') {
                const poppedItems = inboundMessageQueue.splice(0,1);
                if (poppedItems.length === 1) {
                    regs[cmd.target] = poppedItems[0];
                } else {
                    return {
                        commands,
                        regs,
                        currentCommandPosition,
                        numberOfSentMessages,
                        status: 'waitingForMessages',
                        inboundMessageQueue,
                        outboundMessageQueue,
                    };
                }
            }
            currentCommandPosition++;
        } else if(cmd.k === 'jgz') {
            const guard = typeof cmd.guard === 'number' ? cmd.guard : regs[cmd.guard];
            const skip = typeof cmd.skipLength === 'number' ? cmd.skipLength : regs[cmd.skipLength];
            if (guard > 0) {
                currentCommandPosition += skip;
            } else {
                currentCommandPosition++;
            }
        } else {
            throw new Error(`bad command ${cmd}`);
        }
    }
    return {
        commands,
        regs,
        currentCommandPosition,
        numberOfSentMessages,
        status: 'terminated',
        inboundMessageQueue,
        outboundMessageQueue,
    };
};

export const solveA = (cmds: string[]) => {
    const prog: programState = {
        commands: cmds,
        regs: {},
        currentCommandPosition: 0,
        status: 'running',
        numberOfSentMessages: 0,
        inboundMessageQueue: [],
        outboundMessageQueue: [],
        };

    const ret = runDuetProgram('A')(prog);
    return ret.outboundMessageQueue[0];
};

export const solveB = (cmds: string[]) => {
    let prog0: programState = {
        commands: cmds,
        regs: {p:0},
        currentCommandPosition: 0,
        status: 'running',
        numberOfSentMessages: 0,
        inboundMessageQueue: [],
        outboundMessageQueue: [],
        };
    let prog1: programState = {
        commands: cmds,
        regs: {p:1},
        currentCommandPosition: 0,
        status: 'running',
        numberOfSentMessages: 0,
        inboundMessageQueue: [],
        outboundMessageQueue: [],
        };

    let duetIsRunning = true;
    while (duetIsRunning) {
        const prog1CannotRun = prog0.status === 'terminated' ||
            (prog0.status === 'waitingForMessages' && prog0.inboundMessageQueue.length === 0);
        const prog2CannotRun = prog1.status === 'terminated' ||
            (prog1.status === 'waitingForMessages' && prog1.inboundMessageQueue.length === 0);

        if (prog1CannotRun && prog2CannotRun) {
            duetIsRunning = false;
        } else {
            prog0 = runDuetProgram('B')(prog0);
            prog1.inboundMessageQueue = prog0.outboundMessageQueue.slice(0);
            prog0.outboundMessageQueue = [];
            prog1 = runDuetProgram('B')(prog1);
            prog0.inboundMessageQueue = prog1.outboundMessageQueue.slice(0);
            prog1.outboundMessageQueue = [];
        }
    }
    return prog1.numberOfSentMessages;
};
