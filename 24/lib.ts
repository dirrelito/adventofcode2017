import { isUndefined } from 'util';
import { flatten, assertNever } from '../util/lib';

type node = string;
type edge = {
    id: number,
    node1: node,
    node2: node,
    weight: number,
};
type path = edge[];
type scoringStrategy = (es: edge[]) => number;

export const nodeNeighborEdge = (n: node) => (e: edge) => e.node1 === n || e.node2 === n;

export const longestPath = (possibleEdges: edge[], nodeNow: node, scoreFun: scoringStrategy): path[] => {

    const movableEdges = possibleEdges.filter(e => nodeNeighborEdge(nodeNow)(e));

    if (movableEdges.length === 0) {
        return [[]];
    }

    // console.log('when in node...', nodeNow)
    // console.log('... we will try out pahts:', movableEdges)

    const listOfPathsPerNextEdge = movableEdges.map(nextEdge => {
        // console.log("if moving by...", nextEdge)
        const newPos = nodeNow === nextEdge.node1
            ? nextEdge.node2
            : nextEdge.node1;
        // console.log('the next node to be in is...', newPos)
        const restEdges = possibleEdges.filter(e => e.id !== nextEdge.id);
        // console.log('potential steps after are...', restEdges)
        const subPathsPrel: path[] = longestPath(restEdges,newPos, scoreFun);
        // console.log('the paths that this "next node" leads to are...', subPathsPrel)
        const subPaths: path[] = subPathsPrel.map(p => [nextEdge].concat(p));
        // console.log('... so including the next edge the paths are...', subPaths)
        return subPaths;
    });
    // console.log(listOfPathsPerNextEdge);
    const listOfPaths: path[] = flatten(listOfPathsPerNextEdge);
    // console.log(listOfPaths);

    const bestSubPaths = keepBestPaths(listOfPaths,scoreFun);
    // console.log(bestSubPaths);
    return bestSubPaths;
};

export const keepBestPaths = (ps: path[], scoreFun: scoringStrategy) => {
    if(ps.length === 0) { return []; }
    const max = ps.map(p => scoreFun(p)).reduce((a,b) => Math.max(a,b));
    const bests = ps.filter(p => scoreFun(p) === max);
    return bests;
};

export const pathLength = (p: path) => p.length;

export const pathWeight = (p: path) => p.reduce((a,e) => a + e.weight, 0);

export const parseComponent = (componentAsString: string, componentNumber: number) => {
    const [s0,s1] = componentAsString.split('/');
    const [pinCount0,pinCount1] = [s0,s1].map(n => Number(n));
    const e0: edge = {
        id:componentNumber*2 + 0,
        node1: `component${componentNumber}`,
        node2: `pinCount${pinCount0}`,
        weight: pinCount0};
    const e1: edge = {
        id:componentNumber*2 + 1,
        node1: `component${componentNumber}`,
        node2: `pinCount${pinCount1}`,
        weight: pinCount1};
    return [e0,e1];
};

export const parseComponents = (raw: string) =>
    flatten(raw.trim().split(/\r?\n/).map((str,id) => parseComponent(str,id)));
