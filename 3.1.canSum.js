/*
Write a function `canSum(targetSum, numbers) that takes in a targetSum and an array of numbers as arguments.
The function should return a boolean indicating whether or not it is possible to generate the targetSum using numbers from the array.

You may use an element of the array as many times as needed.
You may assume that all input numbers are nonnegative.

canSum(7,[5,3,4,7])

                 7
/(-5)     /(-3)     \(-4)   \(-7)
2         4          3      0
      /(-3)  \(-4)    \(-3)
     1        0        0

*/

//Recursion with memorization Time : O(m*n) , Space:O(m)
const canSumRecursion = (targetSum, numbers, memo = {}) => {

    if (targetSum in memo) return memo[targetSum];
    if (targetSum === 0) return true;
    if (targetSum < 0) return false;

    for (let num of numbers) {
        const remainder = targetSum - num;
        if (canSumRecursion(remainder, numbers, memo) === true) {
            memo[targetSum] = true;
            return true;
        }
        // if found true then it means this canSum = true => if(canSumRecursion(remainder,numbers,memo)===true) return true;
    }
    memo[targetSum] = false;
    return false;

}

console.log(canSumRecursion(7, [5, 3, 4, 7]));
console.log(canSumRecursion(7, [2,4]));
console.log(canSumRecursion(300, [7,14]));