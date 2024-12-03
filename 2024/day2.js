const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const reports = input.split('\n');

const ans = reports.reduce((acc, report) => {
    const levels = report.trim().split(' ');
    if (levels.length === 1) return acc;
    let ptr = 1;
    let diff = 0;
    while (ptr < levels.length) {
        const newDiff = Number(levels[ptr]) - Number(levels[ptr - 1]);
        if (Math.abs(newDiff) > 3 || Math.abs(newDiff + diff) <= Math.abs(diff)) {
            return acc;
        }
        diff += newDiff;
        ++ptr;
    }
    return acc + 1;
}, 0);

console.log(ans);
