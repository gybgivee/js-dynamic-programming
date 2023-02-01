/*
Write a function `count Construct(target, wordBank)` that accepts a target string and an array of strings.
The function should return the number of ways that the `target` can be constructed by concatenating elements of the `wordBank` array.

You may reuse elements of `wordBank as many times as needed.

*/

//Recursion with memorization Time : O(n*(m^2)) , Space:O(m^2)
const countConstructRecursive = (target, wordBank,memo ={}) =>{

    if(target in memo) return memo[target];
    if(target === '') return 1;
    
    let countConstruct = 0;

    for(let word of wordBank){
        
        if(target.indexOf(word)===0){
            const suffix = target.slice(word.length);
            countConstruct += countConstructRecursive(suffix,wordBank,memo);
        }
    }
    memo[target] = countConstruct;
    return countConstruct;

}
console.log(countConstructRecursive('purple',['purp','p','ur','le','purpl']));
console.log(countConstructRecursive('abcdef',['ab','abc','cd','def','abcd']));
console.log(countConstructRecursive('enterpotentpot',['a','p','ent','enter','ot','o','t']));
console.log(countConstructRecursive('eeeeeeeeeeeeeeeeeeef',['e','ee','eee','eeee']));