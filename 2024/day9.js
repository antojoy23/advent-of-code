const isBrowser = typeof window !== "undefined";

const input = isBrowser ?
    document.body.innerText.trim() :
    `2333133121414131402`;

const getFormattedBlockStringArr = (part2) => {
    const reversedInput = input.split('').reverse();
    let idx = 0;
    let formattedBlocks = [];
    let fileInfo = [];
    const freeSpaceCount = [];
    while (reversedInput.length > 0) {
        const fileNum = reversedInput.pop();
        formattedBlocks.push(...Array(Number(fileNum)).fill(idx));
        part2 && fileInfo.push([idx, formattedBlocks.length - Number(fileNum), Number(fileNum)]);
        if (reversedInput.length > 0) {
            const freeSpace = reversedInput.pop();
            formattedBlocks.push(...Array(Number(freeSpace)).fill('.'));
            part2 && freeSpaceCount.push([idx, formattedBlocks.length - Number(freeSpace), Number(freeSpace)]);
        }
        ++idx;
    }
    if (part2) {
        return [formattedBlocks, fileInfo, freeSpaceCount];
    } else {
        return formattedBlocks;
    }
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

const part2 = () => {
    let [formattedBlockStringArr, fileInfoList, freeSpaceCountList] = getFormattedBlockStringArr(true);

    while (fileInfoList.length > 0) {
        const [fileId, startIndex, fileCount] = fileInfoList.pop();
        for (const [idx, [freeSpaceFileId, freeSpaceStartIndex, spaceCount]] of freeSpaceCountList.entries()) {
            if (freeSpaceFileId === fileId) break;

            if (spaceCount >= fileCount) {
                freeSpaceCountList[idx] = [freeSpaceFileId, freeSpaceStartIndex + fileCount, spaceCount - fileCount];
                for (let i = startIndex; i < startIndex + fileCount; i++) {
                    formattedBlockStringArr[i] = '.';
                }
                for (let i = freeSpaceStartIndex; i < freeSpaceStartIndex + fileCount; i++) {
                    formattedBlockStringArr[i] = fileId;
                }
                break;
            }
        }
    }

    const res = formattedBlockStringArr.reduce((acc, curr, idx) => curr !== '.' ? acc + (Number(curr) * idx) : acc, 0)

    console.log("PART 2: ", res);

}

part1();
part2();