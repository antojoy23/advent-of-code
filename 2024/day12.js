const isBrowser = typeof window !== "undefined";

const input = isBrowser ?
    document.body.innerText.trim() :
    `AAAA
BBCD
BBCC
EEEC`;

const garden = input.trim().split('\n').map(row => row.trim().split(''));

const part1 = () => {
    let visited = JSON.parse(JSON.stringify(garden)).map(row => row.fill(0));
    const searchGarden = (i, j, prev) => {
        if (i < 0 || i >= garden.length || j < 0 || j >= garden[0].length) {
            return [0, 1];
        }
        const currentPlant = garden[i][j];
        if (visited[i][j]) {
            if (currentPlant === prev) return [0, 0];
            return [0, 1];
        }
        if (currentPlant !== prev) {
            return [0, 1];
        }

        visited[i][j] = 1;

        const [a1, p1] = searchGarden(i + 1, j, currentPlant);
        const [a2, p2] = searchGarden(i - 1, j, currentPlant);
        const [a3, p3] = searchGarden(i, j + 1, currentPlant);
        const [a4, p4] = searchGarden(i, j - 1, currentPlant);

        return [1 + a1 + a2 + a3 + a4, p1 + p2 + p3 + p4];
    }

    let ans = 0;
    for (let i = 0; i < garden.length; i++) {
        for (let j = 0; j < garden[0].length; j++) {
            if (visited[i][j] !== 1) {
                const [a, p] = searchGarden(i, j, garden[i][j]);
                ans += a * p;
            }
        }
    }

    console.log("PART 1: ", ans);
}

part1();