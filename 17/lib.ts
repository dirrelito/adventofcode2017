import { range } from '../util/lib';

type node = {value: number, next: node};

export const createZeroNode = () => {
    const zeroNodeAny: node = {value:0, next:null};
    zeroNodeAny.next = zeroNodeAny;
    return zeroNodeAny;
};

export const solveACustom = (noOfInserts: number) => (stepLength: number) => {
    // console.log('Doing A -----------------------')
    const zNode = createZeroNode();
    let currentNode: node = zNode;
    for(let value = 1; value <= noOfInserts; value++) {
        for(let k = 1; k <= stepLength; k++) {
            currentNode = currentNode.next;
        }
        const newNode: node = {value, next:currentNode.next};
        currentNode.next = newNode;
        // console.log(`just inserted ${newNode.value} after ${currentNode.value}`);
        currentNode = newNode;
    }
    const lastNode = currentNode;
    return {zNode,lastNode};
};

export const solveA = x => {
    const {lastNode} = solveACustom(2017)(x);
    return lastNode.next.value;
};


export const solveBCustom = noOfInserts => stepSize => {
    // console.log('Running B --------------')
    let currentPosition = 0;
    let valueAfterZero = 0;
    for(let value = 1; value <= noOfInserts; value++) {
        currentPosition = (currentPosition + stepSize) % (value); // step
        // console.log(`will insert after ${currentPosition}`);
        if (currentPosition === 0) {
            valueAfterZero = value;
            // console.log(`just inserted ${value} after 0`);
        }
        currentPosition++; // insert
        // console.log(`just inserted ${value} at new position ${currentPosition}`);
    }
    return valueAfterZero;
};

export const solveB = solveBCustom(50*10**6);
export const bufferToArray = (n: node) => {
    const arr: number[] = [];
    let m = n;
    // console.log(m);

    arr.push(n.value);
    m = n.next;
    while(m !== n) {
        // console.log(m,arr)
        arr.push(m.value);
        m = m.next;
    }
    return arr;
};
