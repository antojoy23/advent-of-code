const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const mulRegex = /mul\([0-9]{1,3},[0-9]{1,3}\)/gm;

const getResult = (inputString) =>
    inputString.match(mulRegex).reduce((acc, curr) => {
        const numberRe = /[0-9]+/gm;
        const numbers = curr.match(numberRe);
        return acc + (Number(numbers[0]) * Number(numbers[1]));
    }, 0);

const part1 = getResult(input);


const validStr = input.split(`do()`).map((str) => str.split(`don't()`)[0]).join();
const part2 = getResult(validStr);

console.log("Part1 ", part1);
console.log("Part2 ", part2);
