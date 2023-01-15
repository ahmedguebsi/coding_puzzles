//Memoization for recursive problems
//visualize the problem as tree and implement the tree using recursion
//Dynamic programming(devide into sub problems and avoid calculation of the same pattern)
//add a memo which is key-value object to store patterns/nodes(store them to avoid repeating the previous calculations)
// add a base case to return memo objects
//store them

// complexity time O(2**n) , complexity space O(n) before memoization / brute force
//after memoization (complexity time and space O(n) )
const fibonacci = (n, memo ={}) =>{
    if(n <= 2) return 1;
    if (n in memo) return memo[n];
    memo[n] = fibonacci(n - 1,memo)+ fibonacci(n-2 , memo);
    return memo[n];
};

const fib=(n) =>{
    const table = Array(n + 1).fill(0);
    table[1]=1;
    for(let i=0; i<=n; i++){
        table[i+1]+=table[i];
        table[i+2]+=table[i];
    }
    return table[n];
};
// complexity time O(2**n+m) , complexity space O(n+m) before memoization / brute force
//after memoization (complexity time O(n*m)  and space O(n+m) )
const gridTraveler =(m, n, memo={}) => {
    const key = m + ',' + n ;
    if (key in memo )return memo[key];
    if (m == 1 && n == 1) return 1;
    if (m == 0 || n ==0) return 0;
    memo[key] = gridTraveler(m - 1,n, memo) + gridTraveler(m, n-1,memo);
    return memo[key]

};

const gridTra =(m, n )=>{
    const table = Array(m + 1)
        .fill()
        .map(() =>Array(n + 1));

    table[1][1]= 1;

    for(let i=0; i<=m; i++){
        for(let j=0; j<=n ;j++){
            const current = table[i][j];
            if(i + 1 <m) table[i+1][j] += current;
            if(j + 1 <n) table[i][j +1] += current;
        }
    }
    return table[m][n];
}

// complexity time O(n**m) , complexity space O(m) before memoization/brute force
// n= numbers size
// m= targetSum
//after memoization (complexity time O(n*m) and space O(m) )
//Decision problem (can I do it ? yes or no)
const cunSum = (targetSum, numbers, memo ={}) =>{
    if (targetSum in memo) return memo[targetSum];
    if (targetSum === 0) return true;
    if (targetSum <0) return false ;
    for(let num of numbers ){
        remainder = targetSum - num;
        if(cunSum(remainder, numbers) == true) {
            memo[targetSum] =true;
            return true;
        }
    }
    memo[targetSum]=false;
    return false
}

const cunTable = (targetSum, number) =>{
    const table = Array(targetSum + 1).fill(false);
    table[0] = true;
    for (let i=0; i<targetSum; i++){
        if(table[i] ===true){
            for(let num of number){
                table[i + num] =true;
            }
        }
    }
    return table[targetSum];
};

// complexity time O(n**m * m) , complexity space O(m) before memoization/brute force
// n= numbers size
// m= targetSum
//after memoization (complexity time O(n*m*m) and space O(m*m) )
// Combinatoric problem (how will I do it)
const howSum =(targetSum, numbers, memo ={}) =>{
    const res = [] ;
    if(targetSum in memo) return memo[targetSum];
    if (targetSum ===0) return res ;
    if (targetSum <0 ) return null ;
    for(let num of numbers){
        const remainder = targetSum - num ;
        const remainderResult =howSum(remainder,numbers,memo) ;
        if(remainderResult !== null){
            memo[targetSum] = [ ...remainderResult,num];
            return memo[targetSum];
        }
    }
    memo[targetSum] = null;
    return null ;
}

const howSum =(targetSum, numbers) =>{
    const table = Array(targetSum + 1).fill(null);
    table[0] =[];
    for(let i=0; i<= targetSum; i++){
        if (tab[i] == null){
            for(let num of numbers){
                table[i + num]= [...table[i], num];
            }
        }
    }

    return table[targetSum] = null; ;
}


// complexity time O(n**m * m) , complexity space O(m) before memoization/brute force
// n= numbers size
// m= targetSum
//after memoization (complexity time O(n*m*m) and space O(m*m) )
// Optimization problem (What is the best way to do it ?)
const bestSum=(targetSum , numbers, memo={}) =>{
    if(targetSum in memo) return memo[targetSum];
    if(targetSum ==0) return [];
    if (targetSum <0) return null;
    let shortestCombination = null;
    for(let num of numbers){
        const remainder = targetSum - num ;
        const combinationResult = bestSum(remainder,numbers,memo);
        if(combinationResult !== null) {
            const combination = [...combinationResult, num];
            if (shortestCombination == null || combination.length < shortestCombination.length) {
                shortestCombination = combination;
            }

        }
    }

    memo[targetSum] =shortestCombination;
    return shortestCombination;
}


const canConstruct =(target, wordBank, memo ={}) =>{
    if(target in memo) return memo[target]
    if(target === '') return true;
    for(let word of wordBank){
        if(target.indexOf(word) === 0){
            const suffix = target.slice(word.length);
            const res = canConstruct(suffix, wordBank,memo);
            if(res === true) {
                memo[target] =true;
                return true;
            }
        }
    }
    memo[target]= false

    return false;

};


const countConstruct = (target, wordBank, memo={}) =>{
    if(target in memo) return memo[target];
    if (target == '') return 1;
    let totalCount =0;
    for(let word of wordBank){
        if(target.indexOf(word) === 0){
            const suffix = target.slice(word.length);
            const numberWays =countConstruct(suffix, wordBank,memo);
            totalCount += numberWays;

        }
    }
    memo[target] = totalCount ;
    return totalCount;
};

const allConstruct=(target, wordBank, memo ={}) =>{
    if(target in memo) return memo[target];
    if(target ==='') return [[]];

    const result =[];
    for(let word of wordBank){
        if(target.indexOf(word) == 0){
            const suffix = target.indexOf(word.length);
            const suffixWays = allConstruct(suffix,word,memo);
            const targetWays = suffixWays.map(way =>[word,...way]);
            result.push(...targetWays); // Use spread operator ,if we use push(targetWays) we will get three dim array

        }

    }
    memo[target]=result;
    return result;
}


console.log(gridTraveler(6,3));
console.log(gridTraveler(2,3));
console.log(gridTraveler(16,13));
console.log(fibonacci(50));
console.log(cunSum(300, [14, 7 , 2]));
console.log(bestSum(300, [14, 70 , 2,50]));
console.log(canConstruct('abcdefg',['ab','cd', 'efg']));