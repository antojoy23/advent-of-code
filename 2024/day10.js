const isBrowser = typeof window !== "undefined";

const input = isBrowser ?
    document.body.innerText.trim() :
    `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

const map = input.trim().split('\n').map((row) => row.trim().split('').map(Number));

const getTrailHeadScore = (i, j, prevPath, visited) => {
    if (i < 0 || i >= map.length || j < 0 || j >= map[0].length) return 0;
    if (map[i][j] - prevPath !== 1 && prevPath !== null) return 0;
    if (visited) {
        if (visited[i][j] === 1) return 0;
        visited[i][j] = 1;
    }
    if (map[i][j] === 9) return 1;
    const newPath = map[i][j];
    return getTrailHeadScore(i + 1, j, newPath, visited) +
        getTrailHeadScore(i - 1, j, newPath, visited) +
        getTrailHeadScore(i, j + 1, newPath, visited) +
        getTrailHeadScore(i, j - 1, newPath, visited);

}

const part1 = () => {
    let ans = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === 0) {
                let visited = JSON.parse(JSON.stringify(map)).map(row => row.fill(0));
                ans += getTrailHeadScore(i, j, null, visited);
            }
        }
    }
    console.log("PART 1: ", ans);
}

const part2 = () => {
    let ans = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === 0) {
                ans += getTrailHeadScore(i, j, null);
            }
        }
    }
    console.log("PART 2: ", ans);
}

part1();
part2();