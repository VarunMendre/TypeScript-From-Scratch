/**
 * PROBLEM: The original function only accepts and returns a 'string'.
 * To handle different types (number, boolean, arrays, etc.) without
 * creating infinite duplicate functions, we use Generics.
 */

// ❌ Limited to strings only
function displayString(a: string): string {
  return a;
}

const result = displayString("Hi");

/**
 * SOLUTION: Generic Function
 * <T> is a type variable that acts as a placeholder.
 * It captures the type passed at runtime and ensures the return type matches the input type.
 */
function greet<T>(a: T): T {
  return a;
}

// --- Type Inference Behavior ---

// 1. Const Assertion (Literal Types)
// When using 'const', TypeScript infers the most specific type (literal type).
const a = greet(1);
// Type: '1' (Function signature: greet<1>(a: 1): 1)

// 2. Let Widening (Base Types)
// When using 'let', TypeScript widens the type to its base type to allow reassignment.
let c = greet(4);
// Type: 'number' (Function signature: greet<number>(a: number): number)

// 3. Explicit Type Arguments
// You can manually specify the type. This overrides inference.
const b = greet<number>(52);
// Type: 'number' (Even though 52 is a literal, we forced it to be 'number')

// 4. Complex Types
// Generics work with arrays, objects, and custom types.
const d = greet<number[]>([10, 45, 55]);
// Type: 'number[]'

/**
 * KEY CONCEPT: Type Arguments vs. Function Arguments
 * - <number> is a Type Argument: Evaluated at compile-time for type safety.
 * - (52) is a Function Argument: Evaluated at runtime for logic.
 */

// ❌ INVALID SYNTAX
// Generics must be defined with a name (e.g., <T>). They cannot be empty.
// type type<> = string;
// interface Type<> { value: string }

/**
 * EXAMPLE: Swapping Values
 * This function ensures both inputs are of the SAME type (T)
 * and returns a tuple [T, T] preserving that type.
 */
function swap<T>(a: T, b: T): [T, T] {
  return [b, a];
}

// Usage with Numbers
const num1 = 10;
const num2 = 20;
let [first, second] = swap(num1, num2);
console.log({ first, second });
// Output: { first: 20, second: 10 }
// Types: first is number, second is number

// Usage with Strings
const str1 = "first";
const str2 = "second";
let [string1, string2] = swap(str1, str2);
console.log({ string1, string2 });
// Output: { string1: 'second', string2: 'first' }
// Types: string1 is string, string2 is string
