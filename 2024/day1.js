const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

const locationList2CountMap = new Map();

const [locationList1, locationList2] = input.split('\n').reduce((acc, curr) => {
    if (!!curr.split('   ')[0]) {
        const list1Num = Number(curr.split('   ')[0]);
        const list2Num = Number(curr.split('   ')[1]);
        acc[0].push(list1Num);
        acc[1].push(list2Num);
        locationList2CountMap.set(list2Num, locationList2CountMap.has(list2Num) ? locationList2CountMap.get(list2Num) + 1 : 1)
    }
    return acc;
}, [[], []]);

const partOne = () => {
    locationList1.sort();
    locationList2.sort();

    let ans = 0;
    for (let i = 0; i < locationList1.length; i++) {
        ans += Math.abs(locationList1[i] - locationList2[i]);
    }

    return ans;
}

const partTwo = () => {
    return locationList1.reduce((acc, curr) => acc + (curr * (locationList2CountMap.get(curr) ?? 0)), 0);
}

console.log(partOne());
console.log(partTwo());