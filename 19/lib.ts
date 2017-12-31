import { isNull, isUndefined } from 'util';
import { assertNever } from '../util/lib';

export type aContext = {x: number,y: number,dir: direction,log: logType};
export type logType = {message: string, distance: number};
type coordinate = {x: number, y: number};
export type routingDiagram = string[][];
type direction = 'right' | 'left' | 'up' | 'down';

export const solve = (raw: string): logType => {
    const map = parseRoutingDiagram(raw);
    const move = move1(map);
    const y = findStartY(map);
    const x = 0;
    const log: logType = {message: '', distance:1};
    const dir = 'down';
    let dummy: logType | aContext = {x,y,log,dir};
    while (isUndefined((dummy as logType).message)) {
        dummy = move(dummy as aContext);
    }
    return dummy as logType;
};

export const parseRoutingDiagram = (raw: string): routingDiagram =>
        raw.replace(/\r?\n$/, '')
           .split(/\r?\n/)
           .map(line =>
                line.split('')
                    .map(c => c === ' ' ? null : c),
                );

export const findStartY = (map: routingDiagram) => map[0].findIndex(c => c === '|');

export const move1 = (map: routingDiagram) => (start: aContext): aContext | logType => {
    const {x: startX, y: startY, dir: startDir, log: startLog} = start;
    const log: logType = {...startLog};
    let c: coordinate = stepXYDir(startX,startY,startDir);
    log.distance += 1;
    let thisChar = map[c.x][c.y];
    while (thisChar !== '+') {
        if (isNull(thisChar)) {
            log.distance -= 1;
            return log;
        } else if('|-'.search(thisChar) === -1) {
            log.message += thisChar;
        }
        c = stepXYDir(c.x,c.y,startDir);
        log.distance += 1;
        thisChar = map[c.x][c.y];
    }
    const dir = getNewDir(c.x,c.y,map,startDir);
    return {x:c.x, y:c.y, dir, log};
};

export const getNewDir = (x,y,map,dir: direction): direction  => {
    if (dir === 'up' || dir === 'down') {
        if (map[x][y-1] === null) {
            return 'right';
        } else {
            return 'left';
        }
    } else if (dir === 'right' || dir === 'left') {
        if (map[x-1][y] === null) {
            return 'down';
        } else {
            return 'up';
        }
    } else {
        assertNever(dir);
    }
};

const stepXYDir = (x: number, y: number, dir: direction) => {
    if (dir === 'up') {
        return {x:x-1,y};
    } else if (dir === 'down') {
        return {x:x+1,y};
    } else if (dir === 'right') {
        return {x,y:y+1};
    } else if (dir === 'left') {
        return {x,y:y-1};
    } else {
        assertNever(dir);
    }
};
