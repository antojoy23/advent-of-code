const isBrowser = typeof window !== "undefined";

const input = isBrowser ?
    document.body.innerText.trim() :
    `2333133121414131402`;

const reversedInput = input.split('').reverse();

const getFormattedBlockStringArr = () => {
    let idx = 0;
    let formattedBlocks = [];
    while (reversedInput.length > 0) {
        const fileNum = reversedInput.pop();
        formattedBlocks.push(...Array(Number(fileNum)).fill(idx));
        ++idx;
        if (reversedInput.length > 0) {
            const freeSpace = reversedInput.pop();
            formattedBlocks.push(...Array(Number(freeSpace)).fill('.'));
        }
    }
    return formattedBlocks;
}

const part1 = () => {
    let formattedBlockStringArr = getFormattedBlockStringArr();

    let left = 0;
    let right = formattedBlockStringArr.length - 1;
    while (left < right) {
        while (formattedBlockStringArr[right] === '.') {
            --right;
        }
        while (formattedBlockStringArr[left] !== '.') {
            ++left;
        }
        if (left < right) {
            let temp = formattedBlockStringArr[right];
            formattedBlockStringArr[right] = formattedBlockStringArr[left];
            formattedBlockStringArr[left] = temp;
        }
    }
    const res = formattedBlockStringArr.reduce((acc, curr, idx) => curr !== '.' ? acc + (Number(curr) * idx) : acc, 0)
    console.log("PART 1: ", res);
}

part1();