const isBrowser = typeof window !== "undefined";

const input = isBrowser ?
    document.body.innerText.trim() :
    `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const antennaMatrix = input.trim().split('\n').map(row => row.trim().split(''));


const part1 = () => {
    const charMap = new Map();
    const resMatrix = antennaMatrix.map(_ => Array.from(antennaMatrix).fill('.'));
    for (let i = 0; i < antennaMatrix.length; i++) {
        for (let j = 0; j < antennaMatrix[0].length; j++) {
            if (antennaMatrix[i][j] !== '.') {
                if (charMap.has(antennaMatrix[i][j])) {
                    const sameFrequencyAntennas = charMap.get(antennaMatrix[i][j]);
                    sameFrequencyAntennas.forEach(([oi, oj]) => {
                        if (oi - (i - oi) >= 0 &&
                            oj - (j - oj) >= 0 &&
                            oj - (j - oj) < antennaMatrix[0].length &&
                            oi - (i - oi) < antennaMatrix.length) {
                            resMatrix[oi - (i - oi)][oj - (j - oj)] = '#';
                        }
                        if (i + (i - oi) >= 0 &&
                            i + (i - oi) < antennaMatrix.length &&
                            j + (j - oj) >= 0 &&
                            j + (j - oj) < antennaMatrix[0].length) {
                            resMatrix[i + (i - oi)][j + (j - oj)] = '#';
                        }
                    });
                    charMap.set(antennaMatrix[i][j], [...sameFrequencyAntennas, [i, j]]);
                } else {
                    charMap.set(antennaMatrix[i][j], [[i, j]]);
                }
            }
        }
    }
    const res = resMatrix.flat().reduce((acc, curr) => curr === '#' ? acc + 1 : acc, 0)
    console.log("PART 1: ", res);
}

const part2 = () => {
    const charMap = new Map();
    const resMatrix = antennaMatrix.map(_ => Array.from(antennaMatrix).fill('.'));
    for (let i = 0; i < antennaMatrix.length; i++) {
        for (let j = 0; j < antennaMatrix[0].length; j++) {
            if (antennaMatrix[i][j] !== '.') {
                resMatrix[i][j] = '#';
                if (charMap.has(antennaMatrix[i][j])) {
                    const sameFrequencyAntennas = charMap.get(antennaMatrix[i][j]);
                    sameFrequencyAntennas.forEach(([oi, oj]) => {
                        let canContinueTop = true;
                        let canContinueBottom = true;
                        let iter = 1;
                        while (canContinueTop || canContinueBottom) {
                            if (oi - (i - oi) * iter >= 0 &&
                                oj - (j - oj) * iter >= 0 &&
                                oj - (j - oj) * iter < antennaMatrix[0].length &&
                                oi - (i - oi) * iter < antennaMatrix.length) {
                                resMatrix[oi - (i - oi) * iter][oj - (j - oj) * iter] = '#';
                            } else {
                                canContinueTop = false;
                            }
                            if (i + (i - oi) * iter >= 0 &&
                                i + (i - oi) * iter < antennaMatrix.length &&
                                j + (j - oj) * iter >= 0 &&
                                j + (j - oj) * iter < antennaMatrix[0].length) {
                                resMatrix[i + (i - oi) * iter][j + (j - oj) * iter] = '#';
                            } else {
                                canContinueBottom = false;
                            }
                            ++iter;
                        }
                    });
                    charMap.set(antennaMatrix[i][j], [...sameFrequencyAntennas, [i, j]]);
                } else {
                    charMap.set(antennaMatrix[i][j], [[i, j]]);
                }
            }
        }
    }
    const res = resMatrix.flat().reduce((acc, curr) => curr === '#' ? acc + 1 : acc, 0)
    console.log("PART 2: ", res);
}

part1();
part2();