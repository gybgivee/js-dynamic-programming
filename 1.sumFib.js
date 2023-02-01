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
    memo[n] = fibRecursion(n-1,memo)+fibRecursion(n-2,memo);
    return memo[n];    
}

console.log(fibRecursion(6));
console.log(fibRecursion(50));


