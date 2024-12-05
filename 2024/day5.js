const input = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

const [rules, pagesRows] = input.trim().split('\n\n');

const formattedRules = rules.split('\n').reduce((acc, rule) => {
    const [pageNum1, pageNum2] = rule.split('|').map(r => r.trim());
    if (Object.hasOwn(acc, pageNum1)) {
        acc[pageNum1].push(pageNum2);
    } else {
        acc[pageNum1] = [pageNum2];
    }
    return acc;
}, {});

const formattedPageRows = pagesRows
    .split("\n")
    .map(row => row.split(",").map(page => page.trim()));

const part1 = () => {
    let ans = 0;
    formattedPageRows.forEach(printRow => {
        for (let i = 1; i < printRow.length; i++) {
            if (!Object.hasOwn(formattedRules, printRow[i - 1]) && !Object.hasOwn(formattedRules, printRow[i])) continue;
            if (!Object.hasOwn(formattedRules, printRow[i - 1]) || !formattedRules[printRow[i - 1]].includes(printRow[i])) return;
        }
        ans += Number(printRow[(printRow.length - 1) / 2]);
    })
    console.log("PART 1: ", ans);
}


const part2 = () => {
    let ans = 0;
    formattedPageRows.forEach(printRow => {
        for (let i = 1; i < printRow.length; i++) {
            if (!Object.hasOwn(formattedRules, printRow[i - 1]) && !Object.hasOwn(formattedRules, printRow[i])) continue;
            if (!Object.hasOwn(formattedRules, printRow[i - 1]) || !formattedRules[printRow[i - 1]].includes(printRow[i])) {
                const sortedPrintRow = printRow.toSorted((a, b) => Object.hasOwn(formattedRules, a) && formattedRules[a].includes(b) ? -1 : 0);
                ans += Number(sortedPrintRow[(sortedPrintRow.length - 1) / 2]);
                return;
            };
        }
    })

    console.log("PART 2: ", ans);
}

part1();
part2();