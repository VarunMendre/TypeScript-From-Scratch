function greet<T>(value: T) {
  return value;
}

const result1 = greet("Hi"); // has literal type as : result1: "Hi"
const result2 = greet(1); // literal type : result2: 1
const result3 = greet(true); // literal type : result3: true 
const result4 = greet([1, 2, 3]); // type: result4: number[]
const result5 = greet(["a", "b", "c"]); // type : result5: string[]
const result6 = greet({ name: "Varun", age: 22 });
/* 
type as : result6: {
    name: string;
    age: number;
}
*/


// we can also make that array of numbers as tuple too 
const result7 = greet([1, 2, 3] as const) // so now its: readonly [1, 2, 3]
const result8 = greet(["a", "b", "c"] as const);
const result9 = greet({ name: "Varun", age: 22 } as const);
/*
now it will be literal type :-
const result9: {
    readonly name: "Varun";
    readonly age: 22;
}
*/

// now we know that at which position which exact type is
// we exactly know that name is string 
result9.name


const pos1 = result8[1]; // so now we exactly know that at specific position what value is been stored

// but now problem is we're declaring as const every where

// instead we'll use const Modifier typed parameter it is only used in Function, methods, classes only




// write const before type parameter 
function greet2<const T>(value: T) {
  return value;
}
// so now  the non primitives will passed like as const

const result10 = greet2({name:"Varun"})
/*
const result10: {
    readonly name: "Varun";
}
*/


// but we cant use with primitives

type Greet = <T>(value: T) => T;


const greet3: Greet = (value) => {
  return value;
}

