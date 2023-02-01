/*
Say that you are a traveler on a 2D grid. You begin in the
top-left corner and your goal is to travel to the bottom-right corner. You may only move down or right.
In how many ways can you travel to the goal on a grid with dimensions m✶ n?
***Start with base case***
grid(2,3) => 3 
grid(1,1) => 1 ,so only one row and one column, start = end 
grid(0,1) => 0 , invalid grid, no row,one column (impossible)
grid(2,0) => 0

Travel Down grid(x,y)=>grid(x-1,y);
Travel Right grid(x,y)=>grid(x,y-1);

gridTraveller(2,3) => 3

                   2,3    
            /               \ 
        1,3                   2,2 
        /  \               /     \
    0,3     1,2           1,2    2,1
            /  \          / \    / \ 
        0,2     1,1     0,2 1,1 1,1 0,0


*/
//Recursion with memorization Time : O(m*n) , Space:O(n+m)

const gridTravelRecurion = (m, n, memo = {}) => {
    const key = `${m},${n}`;
    if (key in memo) return memo[key];
    if (m === 1 && n === 1) return 1;
    if (m === 0 || n === 0) return 0;

    memo[key] = gridTravelRecurion(m - 1, n, memo) + gridTravelRecurion(m, n - 1, memo);
    return memo[key];

}

console.log(gridTravelRecurion(1, 1));
console.log(gridTravelRecurion(3, 3));