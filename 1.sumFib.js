/*
Write a function `fib(n)` that takes in a number as an argument.
The function should return the n-th number of the Fibonacci sequence.
The 1st and 2nd number of the sequence is 1.
To generate the next number of the sequence, we sum the previous two.
*/

//Recursion with memorization Time : O(n) , Space:O(n)

const fibRecursion = (n, memo = {}) => {
    if (n in memo) return memo[n];
    //fib(1)=1,fib(2)=1
    if (n <= 2) return 1;
    //sum of fib => sum of previous number 1st and previous number 2nd
    memo[n] = fibRecursion(n - 1, memo) + fibRecursion(n - 2, memo);
    return memo[n];
}
console.log("---Recursion---");
console.log(fibRecursion(6));
console.log(fibRecursion(50));

//Tabulation Time : O(n) , Space:O(n)
const fibTabulation = (n) => {
    const table = new Array(n + 1).fill(0);
    table[1] = 1;

    for (let i = 0; i <= n; i++) {
        table[i + 1] += table[i];
        table[i + 2] += table[i];
    }
    return table[n];
}
console.log("---Tabulation---");
console.log(fibTabulation(6));
console.log(fibTabulation(50));