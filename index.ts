import * as fs from 'fs';
import * as readline from 'readline';

const inInterval = startInt => endInt => testInt => testInt >= startInt && testInt <= endInt;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function hasIndexTs(folder: string) {
    return new Promise<{path: string, hasIndex: boolean}>((resolve, reject) => {
        const path = folder + '/index.ts';
        fs.stat(path, (err, stat) => {
            if (err) {
                resolve({path, hasIndex: false});
            } else {
                resolve({
                    path,
                    hasIndex: stat.isFile()});
            }
        });
    });
}

async function readDir(path: string) {
    return new Promise<string[]>((resolve, reject) => {
        fs.readdir(path, (err, dirContent) => {
            if (err) {
                reject(err);
            } else {
                resolve(dirContent);
            }
        });
    });
}

async function getAvailableDays() {
    const dirContent = await readDir('.');

    const proms = dirContent
                    .map(file => parseInt(file, 10))
                    .filter(num => inInterval(1)(25)(num))
                    .map(num => hasIndexTs(num.toString()));

    const arr = await Promise.all(proms);
    const arr2 = arr.filter(o => o.hasIndex);
    const days = arr2.map(o => o.path.split('/')[0]);
    return days;
}

async function askAndRunDay() {
    const days = await getAvailableDays();
    const message =
`Please select a date to run the program for
Available days are: ${days}

>> `;

    rl.question(message, (answer: string) => {
        const num = parseInt(answer, 10);
        if (days.indexOf(num.toString()) !== -1) {
            import(`./${num}/index.ts`).then(i => {
                i.main();
            });
        }
        rl.close();
    });
}

Promise.resolve(askAndRunDay());
