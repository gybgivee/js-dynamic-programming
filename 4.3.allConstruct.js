/*
Write a function `allConstruct(target, wordBank)` that accepts a target string and an array of strings.
The function should return a 2D array containing all of the ways that the `target can be constructed 
by concatenating elements of the wordBank array.

Each element of the 2D array should represent one combination that constructs the `target`.

You may reuse elements of wordBank as many times as needed.
*/

//Recursion with memorization Time : O(n^m) , Space:O(m)
const allConstructRecursive = (target, wordBank, memo = {}) => {

    if (target in memo) return memo[target];
    if (target === '') return [[]];

    const result = [];

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix = target.slice(word.length);
            const suffixWays = allConstructRecursive(suffix, wordBank, memo);
            //push from the end of tree example 1,2,3,4,5 => [...4,5]
            const targetWays = suffixWays.map((way) => [word, ...way]);
            result.push(...targetWays);
        }
    }

    memo[target] = result;
    return result;
}

console.log(allConstructRecursive('purple',['purp','p','ur','le','purpl']));
console.log(allConstructRecursive('abcdef',['ab','abc','cd','def','abcd']));
console.log(allConstructRecursive('enterpotentpot',['a','p','ent','enter','ot','o','t']));
console.log(allConstructRecursive('eeeeeeeeeeeeeeeeeeef',['e','ee','eee','eeee']));