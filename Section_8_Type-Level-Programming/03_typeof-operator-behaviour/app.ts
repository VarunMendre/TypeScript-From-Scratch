/**
 * TypeScript typeof Operator Demonstration
 * 
 * This file demonstrates how the `typeof` operator works in TypeScript's type system.
 * Unlike JavaScript's runtime `typeof`, TypeScript's `typeof` in a type context 
 * extracts the static type of a variable, function, or object.
 */

// -----------------------------------------------------------------------------
// 1. Primitive Types: let vs const (Type Widening vs Literal Types)
// -----------------------------------------------------------------------------

// 'let' declarations widen the type to the general primitive (string)
let a = "hi";
type T = typeof a; 
// ^ type T = string
// Explanation: Since 'a' can be reassigned, TypeScript widens the type to 'string'.

// 'const' declarations preserve the literal type
const b = "hi";
type T1 = typeof b; 
// ^ type T1 = "hi"
// Explanation: 'b' cannot change, so TypeScript infers the specific literal type "hi".

// Explicit typing overrides inference
const c: string | number = "Bye";
type T3 = typeof c; 
// ^ type T3 = string | number
// Explanation: Even though the value is "Bye", the explicit annotation forces the type to be the union.

// -----------------------------------------------------------------------------
// 2. Object Type Inference
// -----------------------------------------------------------------------------

// TypeScript infers the structure of the object automatically
const obj = {
  name: "varun",
  company: "SLB",
  designation: "Backend Developer"
};

// We can capture this inferred structure into a reusable type alias
type T4 = typeof obj;
/* 
  Inferred type T4:
  {
    name: string;
    company: string;
    designation: string;
  }
*/

// Reusing the inferred type for new objects ensures structural consistency
const obj2: T4 = {
  name: "John",
  company: "Microsoft",
  designation: "AI-ML Engineer"
};

// ⚠️ Common Pitfall: Self-Referencing Annotations
// You cannot use the type of a variable while declaring that same variable.
// const obj: T4 = { ... }; // Error: 'obj' is referenced directly or indirectly in its own type annotation.
// Solution: Declare the variable first, then extract the type (as done above).

// -----------------------------------------------------------------------------
// 3. Function Signatures
// -----------------------------------------------------------------------------

function myFunc(para: number): string {
  return "Greetings";
}

// Extract the entire function signature (parameters and return type)
type T6 = typeof myFunc; 
// ^ type T6 = (para: number) => string

// We can use this extracted type to annotate other functions or variables
let greet: typeof myFunc = (para: number) => {
  return "hi";
};

// -----------------------------------------------------------------------------
// 4. Usage in Interfaces
// -----------------------------------------------------------------------------

interface Demo {
  a: string;
  // We can use the function type directly inside an interface
  b: typeof myFunc;
}

const demo: Demo = {
  a: "Hello",
  // Implementation must match the signature of myFunc
  b(para: number) {
    return "returning string";
  }
};

// -----------------------------------------------------------------------------
// Key Takeaways
// -----------------------------------------------------------------------------
// 1. `typeof <value>` in a type position extracts the TypeScript type of that value.
// 2. `const` preserves literal types ("hi"), while `let` widens them (string).
// 3. It works on objects, functions, and classes to avoid manual type duplication.
// 4. It only works on identifiers (variables), not inline expressions.   