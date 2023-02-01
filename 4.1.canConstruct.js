/*
Write a function `canConstruct(target, wordBank)` that accepts a target string and an array of strings.
The function should return a boolean indicating 
whether or not the 'target' can be constructed by concatenating elements of the `wordBank array.

You may reuse elements of wordBank as many times as needed.

canConstruct(skateboard,[bo,rd,ate,t,ska,sk,boar])

                    skateboard
            /(ska)                \(sk)
        teboard                     ateboard
        /                               \(ate)
    eboard                               board
                                    /(bo)       \(boar)
                                   ard            d
*/

//Recursion with memorization Time : O(n*(m^2)) , Space:O(m^2)
const canConstructRecursive = (target, wordBank, memo = {}) => {

    if (target in memo) return memo[target];
    if (target === '') return true;

    for (let word of wordBank) {
        //check if the word is a prefix of the target 
        if (target.indexOf(word) === 0) {
            //remove the prefix start from end of suffix until the end 
            const suffix = target.slice(word.length);
            if (canConstructRecursive(suffix, wordBank, memo) === true) {
                memo[target] = true;
                return true;
            }
        }
    }
    memo[target] = false;
    return false;
}

console.log("---Recursion---");
console.log(canConstructRecursive('abcdef', ['ab', 'abc', 'def', 'abcd']));
console.log(canConstructRecursive('eeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee']));

//Tabulation Time : O((m^2)*n) , Space:O(m)
const canConstructTabulation = (target, wordBank) => {

    const table = new Array(target.length + 1).fill(false);
    table[0] = true;
    for (let i = 0; i < target.length; i++) {
        if (table[i] === true) {
            for (const word of wordBank) {
                //if the word matches the character starting at position i 
                const currentWord = target.slice(i, i + word.length);
                if (currentWord === word) {
                    table[i + word.length] = true;
                }

            }
        }
    }
    return table[target.length]
}
console.log("---Tabulation---");
console.log(canConstructTabulation('abcdef', ['ab', 'abc', 'def', 'abcd']));
console.log(canConstructTabulation('eeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee']));
