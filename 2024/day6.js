const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

// const input = document.body.innerText.trim();

let inputMapMatrix = input.trim().split('\n').map((row) => row.split(''));
let guardStart = [];
for (let i = 0; i < inputMapMatrix.length; i++) {
    for (let j = 0; j < inputMapMatrix[0].length; j++) {
        if (!['.', '#'].includes(inputMapMatrix[i][j])) {
            guardStart = [i, j];
            break;
        }
    }
}

const newDirection = {
    'up': 'right',
    'down': 'left',
    'left': 'up',
    'right': 'down'
}

const getReversePath = (i, j, direction) => {
    switch (direction) {
        case 'up':
            return [i + 1, j];
        case 'down':
            return [i - 1, j];
        case 'left':
            return [i, j + 1];
        default:
            return [i, j - 1];
    }
}

const getPath = (i, j, direction) => {
    switch (direction) {
        case 'up':
            return [i - 1, j];
        case 'down':
            return [i + 1, j];
        case 'left':
            return [i, j - 1];
        default:
            return [i, j + 1];
    }
}

const getDirection = (direction) => {
    switch (direction) {
        case '^': return 'up';
        case '<': return 'left';
        case '>': return 'right';
        default: return 'down';
    }
}

const part1 = () => {

    let stack = [];
    let res = 0;
    stack.push(guardStart);

    let direction = getDirection(inputMapMatrix[guardStart[0]][guardStart[1]]);

    while (stack.length > 0) {
        const [i, j] = stack.pop();
        if (i < 0 || i >= inputMapMatrix.length || j < 0 || j >= inputMapMatrix[0].length) break;

        if (inputMapMatrix[i][j] === 'X') {
            const [newI, newJ] = getPath(i, j, direction);
            stack.push([newI, newJ]);
        } else if (inputMapMatrix[i][j] === "#") {
            const [newI, newJ] = getReversePath(i, j, direction);
            direction = newDirection[direction];
            stack.push([newI, newJ]);
        } else {
            inputMapMatrix[i][j] = 'X';
            const [newI, newJ] = getPath(i, j, direction);
            stack.push([newI, newJ]);
            ++res;
        }
    }
    console.log("Part 1:", res);
}


const part2 = () => {
    let res = 0;
    for (let i = 0; i < inputMapMatrix.length; i++) {
        for (let j = 0; j < inputMapMatrix[0].length; j++) {
            let stack = [];
            if (inputMapMatrix[i][j] !== '.') continue;
            inputMapMatrix[i][j] = '#';
            let obstacleHits = inputMapMatrix.map(row => row.map(_ => 0));
            stack.push(guardStart);
            let direction = getDirection(inputMapMatrix[guardStart[0]][guardStart[1]]);
            while (stack.length > 0) {
                const [i, j] = stack.pop();
                if (i < 0 || i >= inputMapMatrix.length || j < 0 || j >= inputMapMatrix[0].length) break;

                if (inputMapMatrix[i][j] === 'X') {
                    const [newI, newJ] = getPath(i, j, direction);
                    stack.push([newI, newJ]);
                } else if (inputMapMatrix[i][j] === "#") {
                    if (obstacleHits[i][j] > 2) {
                        res++;
                        break;
                    }
                    obstacleHits[i][j] = obstacleHits[i][j] + 1;
                    const [newI, newJ] = getReversePath(i, j, direction);
                    direction = newDirection[direction];
                    stack.push([newI, newJ]);
                } else {
                    const [newI, newJ] = getPath(i, j, direction);
                    stack.push([newI, newJ]);
                }
            }
            inputMapMatrix[i][j] = '.'
        }
    }
    console.log("Part 2:", res);
}

const tempInputArr = JSON.parse(JSON.stringify(inputMapMatrix));
part1();
inputMapMatrix = tempInputArr;
console.log("Computing part 2 ...");
part2();