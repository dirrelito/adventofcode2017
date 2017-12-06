const raw = '11	11	13	7	0	15	5	5	4	4	1	1	7	1	15	11'

export const data = raw.split(/\t/).map(x => parseInt(x, 10));
