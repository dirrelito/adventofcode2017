import {C, F, N, stream} from 'parser-combinator';
import { sum } from '../util/lib';
export type vec3 = [number,number,number];
export type particle = {p: vec3, v: vec3, a: vec3};
export const vec3Parser = C.char('<').drop()
                            .then(N.integer).then(C.char(',').drop())
                            .then(N.integer).then(C.char(',').drop())
                            .then(N.integer).then(C.char('>').drop());

export const particleParser = C.string('p=').drop()
                                .then(vec3Parser)
                                .then(C.string(', v=').thenRight(vec3Parser))
                                .then(C.string(', a=').thenRight(vec3Parser))
                                .map(result => ({p: result.slice(0,3), v: result.slice(3,6), a: result.slice(6)}));
export const newLine = C.string('\r\n').or(C.char('\n'));
export const particleParserNL = particleParser.thenLeft(newLine);
export const fullInputParser = particleParserNL.rep().map(list => list.array());

export const indexOfMin = (xs: number[]) => {
    const {minI: i} = xs.reduce(({minI,minX},currX,currI) => {
        if(currX < minX) {
            return {minI:currI,minX:currX};
        } else {
            return {minI, minX};
        }
    }
    ,{minI:0,minX:xs[0]});
    return i;
};

export const vecAdd = (v1: vec3, v2: vec3): vec3 => [v1[0]+v2[0],v1[1]+v2[1],v1[2]+v2[2]];
export const vecNorm = (v: vec3) => Math.sqrt(v.map(ai => ai ** 2).reduce(sum));
export const indexOfMinAcceleration = (ps: particle[]) => indexOfMin(ps.map(p => vecNorm(p.a)));

export const move = (pIn: particle): particle => {
    const a = pIn.a;
    const v = vecAdd(pIn.v,pIn.a);
    const p = vecAdd(pIn.p,v);
    return {p,v,a};
};

export const collideAndDestroy = (psIn: particle[]): particle[] => {
    const psOut: particle[] = [];
    const groupedParts = groupBy(psIn,p => JSON.stringify(p.p));
    const groupedPartsMinusDeleted = [...groupedParts.values()].forEach(particleList => {
        if (particleList.length === 1) { psOut.push(...particleList); }
    });
    return psOut;
};

export const groupBy = <T,S>(list: T[], keyGetter: (t: T) => S): Map<S,T[]> => {
    const map = new Map();
    list.forEach(item => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
};

export const tick = (ps: particle[]) => collideAndDestroy(ps.map(move));

export const applyNTimes = <T>(f: (a: T) => T) => (n: number) => (t: T): T => {
    // console.log('Calling applyNTimes with',f,n,t)
    // console.log(n)
    if (n <= 0) {
        // console.log('quick answer')
        return t;
    } else {
        // console.log('recurse!')
        return applyNTimes(f)(n-1)(f(t));
    }
};
