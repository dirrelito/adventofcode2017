export const processLine = line => {
  const arr = line
      .trim()
      .split(' <-> ');
  const from = arr[0];
  const tos = arr[1].split(', ');
  const links = tos.map(to => ({from, to}));
  return links;
};

export const getNeighbors = edges => node => edges.filter(edge1 => edge1.from === node).map(edge2 => edge2.to);
export const parseFile = rawData => rawData.trim().split(/\r?\n/).map(processLine).reduce((a, b) => a.concat(b), []);

export const travelGraph = <T>(edges: Array<edge<T>>) => (visited: Set<T>) => (toVisit: T[]) => {
  if (toVisit == null || toVisit.length === 0) {
    return visited;

  } else if (!visited.has(toVisit[0])) {
    visited.add(toVisit[0]);
    const newNeighbors = getNeighbors(edges)(toVisit[0]);
    const rest = toVisit.slice(1).concat(newNeighbors);
    return travelGraph(edges)(visited)(rest);

  } else {
    const rest = toVisit.slice(1);
    return travelGraph(edges)(visited)(rest);
  }

};

type edge<T> = {from: T, to: T};
