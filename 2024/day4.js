const input = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

const searchTerm = "XMAS";

const inputMatrix = input.trim().split('\n').map(line => line.split(""));

const dfs = (word, reversedWord, i, j, paths) => {
    //base condition
    if (i < 0 || i >= inputMatrix.length || j < 0 || j >= inputMatrix[0].length) return 0;
    if (visited[i][j]) return 0;
    const newWord = word + inputMatrix[i][j];
    const newReversedWord = inputMatrix[i][j] + reversedWord;
    if (newWord === searchTerm || newReversedWord === searchTerm) {
        return 1;
    }
    if (newWord !== searchTerm.slice(0, newWord.length) && newReversedWord !== searchTerm.slice(0, newReversedWord.length)) return 0;

    if (newWord.length > 4) return 0;

    visited[i][j] = true;
    let ans = 0;
    paths.forEach(([change1, change2]) => {
        ans += dfs(newWord, newReversedWord, i + change1, j + change2, paths);
    });

    return ans;
}

let visited = [];

for (let i = 0; i < inputMatrix.length; i++) {
    visited[i] = [];
    for (let j = 0; j < inputMatrix[0].length; j++) {
        visited[i].push(false);
    }
}

let ans = 0;
for (let i = 0; i < inputMatrix.length; i++) {
    for (let j = 0; j < inputMatrix[0].length; j++) {
        ans += dfs("", "", i, j, [[-1, 0], [1, 0]]);
    }
}

for (let i = 0; i < inputMatrix.length; i++) {
    visited[i] = [];
    for (let j = 0; j < inputMatrix[0].length; j++) {
        visited[i].push(false);
    }
}

for (let i = 0; i < inputMatrix.length; i++) {
    for (let j = 0; j < inputMatrix[0].length; j++) {
        ans += dfs("", "", i, j, [[0, -1], [0, 1]]);
    }
}

for (let i = 0; i < inputMatrix.length; i++) {
    visited[i] = [];
    for (let j = 0; j < inputMatrix[0].length; j++) {
        visited[i].push(false);
    }
}

for (let i = 0; i < inputMatrix.length; i++) {
    for (let j = 0; j < inputMatrix[0].length; j++) {
        ans += dfs("", "", i, j, [[-1, -1], [1, 1]]);
    }
}

for (let i = 0; i < inputMatrix.length; i++) {
    visited[i] = [];
    for (let j = 0; j < inputMatrix[0].length; j++) {
        visited[i].push(false);
    }
}

for (let i = 0; i < inputMatrix.length; i++) {
    for (let j = 0; j < inputMatrix[0].length; j++) {
        ans += dfs("", "", i, j, [[-1, 1], [1, -1]]);
    }
}

console.log("Part 1", ans);


let part2Ans = 0;
for (let i = 0; i < inputMatrix.length; i++) {
    for (let j = 0; j < inputMatrix[0].length; j++) {
        if (inputMatrix[i][j] === "A") {
            if (i - 1 >= 0 && i + 1 < inputMatrix.length &&
                j - 1 >= 0 && j + 1 < inputMatrix.length
            ) {
                if (
                    ((inputMatrix[i - 1][j - 1] === "M" && inputMatrix[i + 1][j + 1] === "S") ||
                        (inputMatrix[i - 1][j - 1] === "S" && inputMatrix[i + 1][j + 1] === "M")) &&
                    ((inputMatrix[i - 1][j + 1] === "M" && inputMatrix[i + 1][j - 1] === "S") ||
                        (inputMatrix[i - 1][j + 1] === "S" && inputMatrix[i + 1][j - 1] === "M"))
                ) {
                    ++part2Ans;
                }
            }
        }
    }
}
console.log("Part 2", part2Ans);
