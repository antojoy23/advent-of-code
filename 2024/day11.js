const isBrowser = typeof window !== "undefined";

const input = isBrowser ?
    document.body.innerText.trim() :
    `125 17`;

let stones = input.trim().split(' ');

const savedStones = new Map();

const processStones = (stone, blinks) => {
    if (blinks === 0) return 1;

    const cacheKey = `${stone}:${blinks}`;
    if (savedStones.has(cacheKey)) {
        return savedStones.get(cacheKey);
    }

    if (stone === '0') {
        savedStones.set(cacheKey, processStones('1', blinks - 1));
        return savedStones.get(cacheKey);
    }

    if (stone.length % 2 === 0) {
        let leftStone = Number(stone.slice(0, stone.length / 2));
        let rightStone = Number(stone.slice(stone.length / 2));
        savedStones.set(cacheKey, processStones(String(leftStone), blinks - 1) + processStones(String(rightStone), blinks - 1))
        return savedStones.get(cacheKey);
    }

    savedStones.set(cacheKey, processStones(String(Number(stone) * 2024), blinks - 1))
    return savedStones.get(cacheKey);
}

const part1 = () => {
    const res = stones.reduce((ans, stone) => ans + processStones(stone, 25), 0);
    console.log("Part 1: ", res);

}

const part2 = () => {
    const res = stones.reduce((ans, stone) => ans + processStones(stone, 75), 0);
    console.log("Part 2: ", res);
}

part1();
part2();