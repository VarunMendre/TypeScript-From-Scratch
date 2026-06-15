// let num: number = 10
// let num: number = 10n // Type 'bigint' is not assignable to type 'number'.ts(2322)

// we could see error code in TS server response, means in TS all error code messages are stored in a JSON based file
// location : src/compiler/diagnosticMessages.json

/* "errorCodes": [
         2322
]
*/

// let num: number = 50

// num - 'string' // error : The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.ts(2363)

// console.log(num);

let domain; // type: any   --- avoid to declare variable like , also no type-checking is occurred when declare with :any

domain = 5;

console.log(typeof domain); // number

domain = "string";

console.log(typeof domain); // String
