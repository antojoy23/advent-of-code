const isBrowser = typeof window !== "undefined";

const input = isBrowser ?
    document.body.innerText.trim() :
    `190: 10 19
    3267: 81 40 27
    83: 17 5
    156: 15 6
    7290: 6 8 6 15
    161011: 16 10 13
    192: 17 8 14
    21037: 9 7 18 13
    292: 11 6 16 20`;

const formattedInputList = input.trim().split('\n').map(equation => {
    const [ansStrRaw, numsStr] = equation.split(':');
    const ansStr = ansStrRaw.trim();
    const numsList = numsStr.trim().split(' ').map(Number);
    return { [ansStr]: numsList };
});

const isValid = (res, acc, list, i, part2) => {
    if (acc > res) return false;
    if (i === list.length && acc === res) return true;
    if (i >= list.length) return false;

    const newNum = list[i];

    const mul = acc * newNum;
    const add = acc + newNum;
    const concat = Number(`${acc}${newNum}`);

    const newIdx = ++i

    return (isValid(res, mul, list, newIdx, part2) ||
        isValid(res, add, list, newIdx, part2) ||
        (part2 && isValid(res, concat, list, newIdx, part2)));
}

const part1 = () => {
    let ans = 0;
    formattedInputList.forEach((equation => {
        const res = Object.keys(equation)[0];
        const list = equation[res];
        const num = list[0];
        if (isValid(Number(res), num, list, 1)) ans += Number(res);
    }));
    console.log("PART 1: ", ans);
}

const part2 = () => {
    let ans = 0;
    formattedInputList.forEach((equation => {
        const res = Object.keys(equation)[0];
        const list = equation[res];
        const num = list[0];
        if (isValid(Number(res), num, list, 1, true)) ans += Number(res);
    }));
    console.log("PART 2: ", ans);
}

part1();
part2();

