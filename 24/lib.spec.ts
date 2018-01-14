import { longestPath, nodeNeighborEdge, parseComponent, parseComponents, pathWeight, keepBestPaths, pathLength } from './lib';

const edges = [
    {id:1, node1: '1', node2: '2',  weight: 3 },
    {id:2, node1: '3', node2: '4',  weight: 5 },
];
const edges2 = [
    {id:1, node1: '1', node2: '2',  weight: 3 },
    {id:2, node1: '2', node2: '3',  weight: 3 },
    {id:3, node1: '3', node2: '4',  weight: 3 },
];
const edges3 = [
    {id:1, node1: '1', node2: '2',  weight: 6 },
    {id:2, node1: '1', node2: '3',  weight: 1 },
    {id:3, node1: '3', node2: '4',  weight: 6 },
];

const rawTestA =
`0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10
`;

describe('Day 24', () => {
    it('Filter movable node1', () => {
        const node = '1';
        const filteredEdges = edges.filter(e => nodeNeighborEdge(node)(e))[0];
        expect(filteredEdges).toEqual(edges[0]);
    });
    it('Filter movable node2', () => {
        const node = '4';
        const filteredEdges = edges.filter(e => nodeNeighborEdge(node)(e))[0];
        expect(filteredEdges).toEqual(edges[1]);
    });
    describe('Heaviest Path solver', () => {
        it('can step 1', () => {
            const now = '1';
            const best = longestPath(edges, now, pathWeight)[0];
            expect(best).toEqual([edges[0]]);
        });
        it('can step along', () => {
            const now = '1';
            const best = longestPath(edges2, now, pathWeight)[0];
            expect(best).toEqual(edges2);
        });
        it('can choose fork', () => {
            const now = '1';
            const best = longestPath(edges3, now, pathWeight)[0];
            expect(best).toEqual(edges3.slice(1,3));
        });
    });
    describe('Path parser', () => {
        it('can parse a simple line', () => {
            const raw = '10/3';
            const e = parseComponent(raw,0);
            expect(e).toEqual([
                {id: 0, node1:'component0',node2:'pinCount10',weight:10},
                {id: 1, node1:'component0',node2:'pinCount3',weight:3},
            ]);
        });
        it('can parse several lines', () => {
            const raw = '10/3\n5/3';
            const e = parseComponents(raw);
            expect(e).toEqual([
                {id: 0, node1:'component0',node2:'pinCount10',weight:10},
                {id: 1, node1:'component0',node2:'pinCount3',weight:3},
                {id: 2, node1:'component1',node2:'pinCount5',weight:5},
                {id: 3, node1:'component1',node2:'pinCount3',weight:3},
            ]);
        });
    });
    it('Test A', () => {
        const componentGraph = parseComponents(rawTestA);
        const p = longestPath(componentGraph,'pinCount0',pathWeight);
        const w = pathWeight(p[0]);
        expect(w).toBe(31);
    });

    describe('Keep Best Path', () => {
        const paths = [
            [{id:1,node1:'',node2:'',weight:1}],
            [{id:1,node1:'',node2:'',weight:2}],
        ];
        it('getting one path', () => {
            const bestPaths = keepBestPaths(paths,pathWeight);
            expect(bestPaths).toEqual([paths[1]]);
        });
        it('getting two paths', () => {
            const bestPaths = keepBestPaths(paths,pathLength);
            expect(bestPaths).toEqual(paths);
        });
    });
});
