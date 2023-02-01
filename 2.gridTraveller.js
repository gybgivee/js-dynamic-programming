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
console.log("---Recursion---");
console.log(gridTravelRecurion(1, 1));
console.log(gridTravelRecurion(3, 3));

//Tabulation Time : O(m*n) , Space:O(m*n)
const gridTravellerTabulation = (m, n) => {
    const table = new Array(m + 1)
        .fill()
        .map(() => Array(n + 1).fill(0));
    //common mistake : if fill(Array(n+1)) it fil entire row with single array
    table[1][1] = 1;

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            const current = table[i][j];
            //check boundary first 
            if (j + 1 <= n) table[i][j + 1] += current; //right neighbor
            if (i + 1 <= m) table[i + 1][j] += current; //down neighbor

        }
    }
    return table[m][n];
}
console.log("---Tabulation---");
console.log(gridTravellerTabulation(1, 1));
console.log(gridTravellerTabulation(3, 3));