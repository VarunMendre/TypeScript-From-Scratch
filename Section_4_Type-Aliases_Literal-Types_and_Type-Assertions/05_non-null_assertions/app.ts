/**
 * ==========================================
 * TOPIC: Non-Null Assertion Operator (!)
 * ==========================================
 * Definition: Tells the TypeScript Compiler (TSC) to exclude
 * `null` and `undefined` from a type.
 * ⚠️ Warning: This is a compile-time override only. It does NOT
 * check if the value actually exists at runtime. If the value is
 * actually null/undefined, your app will crash.
 */

// ------------------------------------------------------------------
// 1. THE PROBLEM: Strict Null Checks
// ------------------------------------------------------------------
// Scenario: A variable that might be undefined.
let name: string | undefined;

// ❌ Error: Type 'string | undefined' is not assignable to type 'string'.
// TSC prevents this because 'name' might be undefined at this point.
// let username: string = name;

// ------------------------------------------------------------------
// 2. THE SOLUTION: Non-Null Assertion (!)
// ------------------------------------------------------------------
// Usage: Append '!' to the variable to tell TSC:
// "Trust me, this value is definitely NOT null or undefined."

let username: string = name!;
// ✅ Compiles successfully. TSC treats 'name' as type 'string'.

// ⚠️ CRITICAL WARNING:
// If 'name' is actually undefined at runtime, this line will crash.
// The '!' operator removes safety checks; it does not add them.

// ------------------------------------------------------------------
// 3. VALID USE CASE: Initialization Outside Current Scope
// ------------------------------------------------------------------
// Scenario: You know the value is set, but TSC can't trace the flow.

let safeName: string | undefined;

// Function that initializes the variable
function setValue() {
  safeName = "Varun";
}

// Call the function before accessing the variable
setValue();

// ❌ TSC Error without '!':
// "Variable 'safeName' is used before being assigned."
// TSC doesn't realize setValue() was called just above.

// ✅ Correct Usage:
// We KNOW logically that setValue() ran, so safeName exists.
let finalUsername: string = safeName!;

// Summary: Use '!' only when you are 100% certain the value exists
// based on your code logic, even if TSC can't infer it.

// ------------------------------------------------------------------
// 4. ALTERNATIVES (SAFER APPROACHES)
// ------------------------------------------------------------------
// Prefer these methods when possible, as they include runtime checks.

// A. Optional Chaining (?.) - Returns undefined if null
// const length = name?.length;

// B. Nullish Coalescing (??) - Provides a default value
// const displayName = name ?? "Guest";

// C. Type Guards (if checks) - Narrows the type safely
// if (name !== undefined) {
//     let safe = name; // Type is now 'string' inside this block
// }
