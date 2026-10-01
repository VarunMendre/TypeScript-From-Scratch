
type SampleFunction = (input1: string, input2: number, input3: boolean) => { result1: string, result2: number, result3: boolean };


type ExtractParameters<T> = T extends (...args: infer I) => any ? I : never;

type ExtractReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
// if i put unknown[] here it will not work because the function can have any number of parameters, 
// and we want to extract the return type regardless of the number of parameters. 
// Using any[] allows us to match any function signature.
    
type SampleFunctionParameters = ExtractParameters<SampleFunction>; // [string, number, boolean]
type SampleFunctionReturnType = ExtractReturnType<SampleFunction>; // { result1: string, result2: number, result3: boolean }

/* Explanation:

1. ExtractParameters<T>:
   - This utility type takes a function type T as input.
   - It uses conditional types and the infer keyword to extract the parameter types of the function.
   - If T is a function type, it infers the parameter types into a tuple I. Otherwise, it returns never.

2. ExtractReturnType<T>:
   - This utility type takes a function type T as input.
   - It uses conditional types and the infer keyword to extract the return type of the function.
   - If T is a function type, it infers the return type into R. Otherwise, it returns never.

*/


function greet(name: string, age: number): string {
    return `Hello, my name is ${name} and I am ${age} years old.`;
}

type T = typeof greet;

// typeof only works with values, not types.
// It returns the type of the value it is applied to.
// In this case, it returns the type of the greet function, which is (name: string, age: number) => string.


type GreetParameters = ExtractParameters<typeof greet>; // [name: string, age: number]
type GreetReturnType = ExtractReturnType<T>; // string