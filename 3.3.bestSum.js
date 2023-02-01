/*
Write a function `bestSum(targetSum, numbers)` that takes in a targetSum and an array of numbers as arguments.
The function should return an array containing the shortest combination of numbers that add up to exactly the targetSum.

If there is a tie for the shortest combination, you may return any one of the shortest.

*/
//Recursion with memorization Time : O(n*(m^2)) , Space:O(m^2)

const bestSumRecursion = (targetSum, numbers, memo = {}) => {

    if (targetSum in memo) return memo[targetSum];
    if (targetSum === 0) return [];
    if (targetSum < 0) return null;

    let shortestCombination = null;

    for (let num of numbers) {
        const remainder = targetSum - num;
        const remainderCombination = bestSumRecursion(remainder, numbers, memo);
        if (remainderCombination !== null) {
            const combination = [...remainderCombination, num];
            if (shortestCombination === null || combination.length < shortestCombination.length) {
                shortestCombination = combination;
            }
        }
    }
    memo[targetSum] = shortestCombination;
    return shortestCombination;
}
console.log("---Recursion---");
console.log(bestSumRecursion(7, [5, 3, 4, 7]))
console.log(bestSumRecursion(8, [2, 3, 5]))

//Tabulation Time : O((m^2)*n) , Space:O(m^2)
const bestSumTabulation = (targetSum, numbers) => {
    const table = new Array(targetSum + 1).fill(null);
    table[0] = [];
    for (let i = 0; i < targetSum; i++) {
        for (let num of numbers) {
            if (table[i] !== null) {
                const combination = [...table[i], num];
                //if current combination is shorter than what already stored
                if (!table[i + num] || combination.length < table[i + num].length) {
                    table[i + num] = combination;
                }

            }
        }

    }
    return table[targetSum];
}
console.log("---Tabulation---");
console.log(bestSumTabulation(7, [5, 3, 4, 7]))
console.log(bestSumTabulation(8, [2, 3, 5]))