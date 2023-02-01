/*
Write a function `howSum(targetSum, numbers)` that takes in a targetSum and an array of numbers as arguments.
The function should return an array containing any combination of elements that add up to exactly the targetSum. 

If there is no combination that adds up to the targetSum, then return null.

If there are multiple combinations possible, you may return any single one.
*/

//Bruthforce (no memo) => Time: O((n^m)*m) ,Space:O(m)
//Recursion with memorization Time : O(n*(m^2)) , Space:O(m^2)

const howSumRecursion = (targetSum, numbers, memo = {}) => {

    if (targetSum in memo) return memo[targetSum];;
    if (targetSum === 0) return [];
    if (targetSum < 0) return null;

    for (let num of numbers) {
        const remainder = targetSum - num;
        const remainderResult = howSumRecursion(remainder, numbers, memo);
        if (remainderResult !== null) {
            memo[targetSum] = [...remainderResult, num];
            return memo[targetSum];
        }
    }
    memo[targetSum] = null;
    return null;

}
console.log("---Recursion---");
console.log(howSumRecursion(7, [5, 3, 4, 7]));
console.log(howSumRecursion(7, [2, 4]));
console.log(howSumRecursion(8, [2,3, 5]));
console.log(howSumRecursion(300, [7, 14]));

//Tabulation Time : O((m^2)*n) , Space:O(m^2)
const howSumTabulation = (targetSum, numbers) => {
    const table = new Array(targetSum + 1).fill(null);
    table[0] = [];

    for (let i = 0; i < targetSum; i++) {
        if(table[i] !== null){
            for(let num of numbers){
                table[i+num] = [...table[i],num];
            }
        }
    }
    return table[targetSum];

}
console.log("---Tabulation---");
console.log(howSumTabulation(7, [5, 3, 4, 7]));
console.log(howSumTabulation(7, [2, 4]));
console.log(howSumTabulation(8, [2,3, 5]));
console.log(howSumTabulation(300, [7, 14]));
