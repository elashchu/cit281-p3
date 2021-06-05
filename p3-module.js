/*
1)
-Returns true if the coin function parameter is a valid coin value of either 1, 5, 10, 25, 50, or 100
-Must use the array indexOf() method, and !== equality operator
-This function can be coded to be a single line of code
*/
function validDenomination(coin) {return [1,5,10,25,50,100].indexOf(coin) !== -1};
//console.log(0, validDenomination(6));
//console.log(1, validDenomination(5));
//console.log(2, validDenomination(100));



/*
2)
-Returns the calculated value of a single coin object from the obj function parameter
-Must use object deconstruction to create constant variables denom and count from the obj function parameter, using default object values of 0 for denom and count
*/
/*let coinio = {
    denom: 10,
    count: 3
}; */
function valueFromCoinObject(obj) {
    const { denom = 0, count = 0} = obj;
    return denom * count;
}
//console.log(valueFromCoinObject(coinio));



/*
3)
-Iterates through an array of coin objects and returns the final calculated value of all coin objects
-Must use Array.reduce() method, and an arrow function with the Array.reduce() method
-Must call valueFromCoinObject()
-Extra credit: Handle scenario where the arr function parameter, rather than an array of coin objects, contains another array of coin objects
*/
/*const coinios = [
    {
        denom: 10,
        count: 3
    },
    {
        denom: 5,
        count: 2
    },
    {
        denom: 1,
        count: 4
    },
]; */

function valueFromArray(arr) {
    if (Array.isArray(arr[0])) {
        arr = arr[0];
    }
    return arr.reduce((total, amount) => {return total + valueFromCoinObject(amount)}, 0);
}
//console.log(valueFromArray(coinios));



/*
4)
coinCount(...coinage)
This function is the only exported function from the code module
Calls and returns the result of valueFromArray() function, which will be the value of all coin objects with the coinage array function parameter
*/
function coinCount(...coinage) {
    return valueFromArray(coinage);
}

module.exports = {
    coinCount
};

//Testing the code
console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins));

