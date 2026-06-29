/**
 * TypeScript Function Type Inference and Explicit Typing Documentation
 *
 * Key Concepts:
 * 1. Return Type Inference: TypeScript automatically infers the return type based on the returned value.
 * 2. Parameter Typing: Parameters must be explicitly typed; they default to 'any' if omitted.
 * 3. Explicit Return Types: While optional due to inference, explicitly defining return types improves readability and catches errors early.
 * 4. Void vs. Undefined vs. Never:
 *    - void: Function completes but returns no meaningful value (implicitly undefined).
 *    - undefined: Function explicitly returns the value 'undefined'.
 *    - never: Function never completes execution (infinite loop or always throws).
 */

// --- Type Inference Examples ---

// Without explicit types, parameters default to 'any'.
// The return type is inferred as 'number' here because of the returned value.
// If we returned a string, the inferred return type would be 'string'.
// function product(a, b) {
//   return 10;
// }
// Inferred Type: function product(a: any, b: any): number

// With explicit parameter types, TypeScript infers the return type automatically.
// Inferred Signature: function add(a: number, b: number): number
function addInferred(a: number, b: number) {
  return a + b;
}

// Explicitly defining the return type is best practice for clarity and strictness.
// This ensures the function strictly adheres to the expected contract.
function add(a: number, b: number): number {
  return a + b;
}

// You can define a specific return type different from the default inference,
// provided the returned value matches that type.
function compare(a: number, b: number): boolean {
  return a < b;
}

// --- Argument Validation ---

// TypeScript enforces the number of arguments passed.
// Calling add() without arguments triggers error TS2554: "Expected 2 arguments, but got 0."
// const result = add();

// When storing the return value, the variable's type matches the function's return type.
// const result = add(5, 6);
// Type of 'result': number
// Type of 'add': (a: number, b: number) => number

// --- Void Type ---

// 'void' indicates the function does not return a meaningful value.
// It implicitly returns 'undefined'.
function greet(name: string): void {
  console.log(`Hello, ${name}`);

  // Returning a value here causes an error: "Type 'string' is not assignable to type 'void'."
  // return name;

  // Valid returns for void:
  return;
  // return undefined;

  // Code after a return statement is flagged as unreachable.
  // console.log("This will not run");
}

// Distinction: 'void' vs 'undefined'
// 'void' implies the return value is ignored. 'undefined' implies the function explicitly returns the value 'undefined'.
function greetUndefined(name: string): undefined {
  console.log(`Hello, ${name}`);
  return undefined;
  // 'return void;' is invalid syntax because 'void' is a type, not a value.
}

// --- Never Type ---

// 'never' represents a value that never occurs. Used for functions that:
// 1. Always throw an error.
// 2. Run an infinite loop.
// Any code following a call to a 'never' function is unreachable.

function throwCustomError(): never {
  throw new Error("Custom Error");
}

// const result = throwCustomError();
// console.log(result); // Unreachable: The program crashes before this line.

function infiniteLoop(): never {
  while (true) {
    // Executes indefinitely
  }
}

// const loopResult = infiniteLoop();
// console.log(loopResult); // Unreachable: The function never returns.

// --- Arithmetic Functions ---

function subtract(a: number, b: number): number {
  return a - b;
}

function divide(a: number, b: number): number {
  return a / b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

// Example Usage:
// const sum = add(10, 5);
// const diff = subtract(10, 5);
// const prod = multiply(10, 5);
// const quot = divide(10, 5);
