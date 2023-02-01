/*
Write a function `count Construct(target, wordBank)` that accepts a target string and an array of strings.
The function should return the number of ways that the `target` can be constructed by concatenating elements of the `wordBank` array.

You may reuse elements of `wordBank as many times as needed.

*/

//Recursion with memorization Time : O(n*(m^2)) , Space:O(m^2)
const countConstructRecursive = (target, wordBank, memo = {}) => {

    if (target in memo) return memo[target];
    if (target === '') return 1;

    let countConstruct = 0;

    for (let word of wordBank) {

        if (target.indexOf(word) === 0) {
            const suffix = target.slice(word.length);
            countConstruct += countConstructRecursive(suffix, wordBank, memo);
        }
    }
    memo[target] = countConstruct;
    return countConstruct;

}

console.log("---Recursion---");
console.log(countConstructRecursive('purple', ['purp', 'p', 'ur', 'le', 'purpl']));
console.log(countConstructRecursive('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']));
console.log(countConstructRecursive('enterpotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']));
console.log(countConstructRecursive('eeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee']));

//Tabulation Time : O(n*(m^2)) , Space:O(m)
const countConstructTabulation = (target, wordBank) => {

    const table = new Array(target.length + 1).fill(0);
    table[0] = 1;

    for (let i = 0; i < target.length; i++) {
        for (const word of wordBank) {
            //if the word matches the character starting at position i 
            const currentWord = target.slice(i, i + word.length);
            if (currentWord === word) {
               table[i + word.length] += table[i];
            }
        }

    }
    return table[target.length];
}
console.log("---Tabulation---");
console.log(countConstructTabulation('purple', ['purp', 'p', 'ur', 'le', 'purpl']));
console.log(countConstructTabulation('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']));
console.log(countConstructTabulation('enterpotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']));
console.log(countConstructTabulation('eeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee']));
