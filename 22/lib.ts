import { isUndefined } from 'util';
import { applyNTimes, assertNever, flatten, some } from '../util/lib';

type coordinate = [number,number];
type nodeState = 'clean' | 'weakened' | 'infected' | 'flagged';
export type infectionMap = Map<string,nodeState>;
type direction = 'right' | 'left' | 'up' | 'down';
export type stateBetweenBursts = {
    virusCarrierPosition: coordinate,
    virusCarrierHeading: direction,
    computingCluster: infectionMap,
    infectiveActions: number,
};

export const parseMap = (s: string): infectionMap => {
    const rows = s.trim().split(/\r?\n/);
    const offset = (rows.length - 1) /2;
    const coordinatesTmp = rows.map((row,rowI) =>
        row.split('')
            .map((char,colI): coordinate => char === '#' ? [colI-offset,offset-rowI] : undefined)
            .filter(val => !isUndefined(val)),
    );
    const coordinates = flatten(coordinatesTmp);
    const ret: Map<string,nodeState> = coordinates.reduce((prev,curr) =>
                prev.set(curr.toString(),'infected'),new Map());
    return ret;
};

export const makePrimitiveVirusBurst = (s: stateBetweenBursts): stateBetweenBursts => {

    const siteInfected = s.computingCluster.get(s.virusCarrierPosition.toString()) === 'infected';
    const virusCarrierHeading: direction = siteInfected
            ? rotateCW(s.virusCarrierHeading)
            : rotateCCW(s.virusCarrierHeading);
    const virusCarrierPosition: coordinate = moveXYDir(s.virusCarrierPosition,virusCarrierHeading);
    const computingCluster: infectionMap = siteInfected
            ? s.computingCluster.set(s.virusCarrierPosition.toString(),'clean')
            : s.computingCluster.set(s.virusCarrierPosition.toString(),'infected');
    const infectiveActions = siteInfected
            ? s.infectiveActions
            : s.infectiveActions + 1;
    return {virusCarrierHeading, virusCarrierPosition,computingCluster, infectiveActions};
};

export const makeEvolvedVirusBurst = (s: stateBetweenBursts): stateBetweenBursts => {
    const siteStatus = s.computingCluster.get(s.virusCarrierPosition.toString());
    let computingCluster: infectionMap;
    let virusCarrierHeading: direction;
    let infectiveActions = s.infectiveActions;
    if (siteStatus === 'infected') {
        virusCarrierHeading = rotateCW(s.virusCarrierHeading);
        computingCluster = s.computingCluster.set(s.virusCarrierPosition.toString(),'flagged');
    } else if (siteStatus === 'weakened') {
        virusCarrierHeading = s.virusCarrierHeading;
        computingCluster = s.computingCluster.set(s.virusCarrierPosition.toString(),'infected');
        infectiveActions += 1;
    } else if (siteStatus === 'flagged') {
        virusCarrierHeading = rotateReverse(s.virusCarrierHeading);
        computingCluster = s.computingCluster.set(s.virusCarrierPosition.toString(),'clean');
    } else { // clean or undefined
        virusCarrierHeading = rotateCCW(s.virusCarrierHeading);
        computingCluster = s.computingCluster.set(s.virusCarrierPosition.toString(),'weakened');
    }
    const virusCarrierPosition: coordinate = moveXYDir(s.virusCarrierPosition,virusCarrierHeading);
    return {virusCarrierHeading,virusCarrierPosition,computingCluster, infectiveActions};
};

const removeAt = (i: number) => <T>(arr: T[]) => arr.slice(0,i).concat(arr.slice(i+1));

export const rotateCW = (d: direction): direction => {
    if (d === 'up') {
        return 'right';
    } else if (d === 'down') {
        return 'left';
    } else if (d === 'right') {
        return 'down';
    } else if (d === 'left') {
        return 'up';
    } else {
        assertNever(d);
    }
};

export const rotateCCW = (d: direction) => applyNTimes(rotateCW)(3)(d);

export const rotateReverse = (d: direction) => applyNTimes(rotateCW)(2)(d);

const moveXYDir = (c: coordinate, dir: direction): coordinate => {
    if (dir === 'up') {
        return [c[0],c[1]+1];
    } else if (dir === 'down') {
        return [c[0],c[1]-1];
    } else if (dir === 'right') {
        return [c[0]+1,c[1]];
    } else if (dir === 'left') {
        return [c[0]-1,c[1]];
    } else {
        assertNever(dir);
    }
};

export const solveA = (raw: string) => (rounds: number) => {
    const computingCluster = parseMap(raw);
    const s0: stateBetweenBursts = {
        virusCarrierHeading: 'up',
        virusCarrierPosition: [0,0],
        computingCluster,
        infectiveActions: 0,
    };
    const sAfterRounds = applyNTimes(makePrimitiveVirusBurst)(rounds)(s0);
    return sAfterRounds.infectiveActions;
};
export const solveB = (raw: string) => (rounds: number) => {
    const computingCluster = parseMap(raw);
    const s0: stateBetweenBursts = {
        virusCarrierHeading: 'up',
        virusCarrierPosition: [0,0],
        computingCluster,
        infectiveActions: 0,
    };
    const sAfterRounds = applyNTimes(makeEvolvedVirusBurst)(rounds)(s0);
    return sAfterRounds.infectiveActions;
};
