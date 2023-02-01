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
console.log("---Recursion---");
console.log(allConstructRecursive('purple', ['purp', 'p', 'ur', 'le', 'purpl']));
console.log(allConstructRecursive('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']));
console.log(allConstructRecursive('enterpotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']));
console.log(allConstructRecursive('eeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee']));

/*
allConstruct(abcdef,[ab,ac,cd,def,abcd,ef,c])
= [
    [ab,cd,ef],
    [ab,c,def],
    [abc,def],
    [abcd,ef]

]
Each subarray represent one combination
1.''
    a          b            c         d        e         f                 
|  [[]]     |  []      |   []    |    []   |   []    |   []     |    []   |

2.current position a 
only looking in array of wordBank that start with a 

2.1. ab => length 0f 2 positions 
example
1.current at a => next positon will be a+2 = position c 
2.take value of current position to next positon [[]]
3.included the edge(content that consuming right now) = ab

    a          b            c              d        e         f                 
|  [[]]     |  []      |   [[ab]]    |    []   |   []    |   []     |    []   |

2.2.abc
 a              b            c             d            e         f                 
|  [[]]     |  []      |   [[ab]]    |    [[abc]]   |   []    |   []     |    []   |

2.3.abcd
 a              b            c             d                e           f                 
|  [[]]     |  []      |   [[ab]]    |    [[abc]]   |   [[abcd]]    |   []     |    []   |

3.current positon b = nothing start with b so move on to next positon

4.current position c with value of [ab]
4.1.cd => length 0f 2 positions
next position will be c+2 = e

a              b            c               d                   e               f                 
|  [[]]     |  []      |   [[ab]]    |    [[abc]]   |   [[abcd],[ab,cd]]    |   []     |    []   |

4.1.c => length 0f 1 position
next position will be c+1 = d

a              b            c               d                       e                  f                 
|  [[]]     |  []      |   [[ab]]    |    [[abc],[ab,c]]   |   [[abcd],[ab,cd]]    |   []     |    []   |

5.current postion of d with value of [[abc],[ab,c]]
5.1. def => length 0f 3 positions
next position will be d+3 = last 
a              b            c               d                       e                 ]f                 
|  [[]]     |  []      |   [[ab]]    |    [[abc],[ab,c]]   |   [[abcd],[ab,cd]]    |   []     |    [[abc,def],[ab,c,def]]   |


6.current postion of e with value of [[abcd],[ab,cd]]
6.1 ef => length 0f 2 positions
next position will be e+2 = last

a              b            c               d                       e                   f                 
|  [[]]     |  []      |   [[ab]]    |    [[abc],[ab,c]]   |   [[abcd],[ab,cd]]    |   []     |    [[abc,def],[ab,c,def]  ,[abcd,ef],[ab,cd,ef]]   |

7.current positonfb = nothing start with f , now its end position
*/

//Tabulation Time : O(n^m)) , Space:O(n^m)
const allConstructTabulation = (target, wordBank) => {

    const table = new Array(target.length + 1).fill().map(() => []);
    table[0] = [[]];

    for (let i = 0; i <= target.length; i++) {
        for (let word of wordBank) {
            const currentWord = target.slice(i, i + word.length);
            if (currentWord === word) {
                const newCombination = table[i].map((subArray) => [...subArray, word])
                table[i + word.length].push(...newCombination);
            }
        }
    }
    return table[target.length];

}
console.log("---Tabulation---");
console.log(allConstructTabulation('purple', ['purp', 'p', 'ur', 'le', 'purpl']));
console.log(allConstructTabulation('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']));
console.log(allConstructTabulation('enterpotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']));
console.log(allConstructTabulation('eeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee']));