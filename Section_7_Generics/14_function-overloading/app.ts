/**
 * ==============================================================================
 * TypeScript Function Overloading: Complete Guide & Examples
 * ==============================================================================
 *
 * CONCEPT:
 * Function overloading allows you to define multiple call signatures for a single
 * function implementation. This provides precise type inference based on input
 * arguments while maintaining a single runtime logic block.
 *
 * KEY RULES:
 * 1. Declare all overload signatures first (no implementation body).
 * 2. The implementation signature must immediately follow the last overload.
 * 3. The implementation signature must be compatible with ALL overloads (usually uses 'any' or union types).
 * 4. Nothing (variables, other functions) can exist between overloads and implementation.
 *
 * WHEN TO USE:
 * - Use Overloading: When logic differs significantly based on input type.
 * - Use Generics: When logic is identical and you just want to preserve types.
 */

// ------------------------------------------------------------------------------
// 1. THE PROBLEM: Why we can't just redefine functions
// ------------------------------------------------------------------------------
// In JavaScript/TypeScript, redefining a function overwrites the previous one.
// The following would cause a "Duplicate function implementation" error:

/*
function echo(a: string) { return a.toUpperCase(); } 
function echo(b: number) { return b.toFixed(2); } // ❌ Error
*/

// ------------------------------------------------------------------------------
// 2. THE NAIVE SOLUTION: Using 'any' (Losese Type Safety)
// ------------------------------------------------------------------------------
// This works at runtime, but TypeScript loses track of the specific return type.

function myFuncNaive(a: any): string | number | false {
  if (typeof a === "number") {
    return a.toFixed(2);
  } else if (typeof a === "string") {
    return a.toUpperCase();
  }
  return false;
}

const naiveResult = myFuncNaive("hi");
// ❌ Type is 'string | number | false' (Too broad, requires manual checking)

// ------------------------------------------------------------------------------
// 3. THE SOLUTION: Proper Function Overloading
// ------------------------------------------------------------------------------

/**
 * Overload Signature 1: Handles string inputs
 * @param a - The string to convert to uppercase
 * @returns The uppercase string
 */
function myFunc(a: string): string;

/**
 * Overload Signature 2: Handles number inputs
 * @param a - The number to square
 * @returns The squared number
 */
function myFunc(a: number): number;

/**
 * Implementation Signature
 * NOTE: This signature is not visible to external callers.
 * It must be broad enough to handle all overload cases.
 *
 * @param a - The input value (string or number)
 * @returns The processed value
 */
function myFunc(a: any): any {
  if (typeof a === "number") {
    return a ** 2; // Logic for numbers
  }
  if (typeof a === "string") {
    return a.toUpperCase(); // Logic for strings
  }
  return false; // Fallback (should ideally throw an error in strict code)
}

// ✅ Usage Examples with Perfect Type Inference:
const resultString = myFunc("hi"); // Type: string (Autocomplete works!)
const resultNumber = myFunc(5); // Type: number
// const resultError = myFunc(true); // ❌ Compile Error: No overload matches boolean

// ------------------------------------------------------------------------------
// 4. CRITICAL RULE: No Interruptions Allowed
// ------------------------------------------------------------------------------
// You CANNOT declare variables or other functions between the overloads
// and the implementation.

/**
 * Example of a valid overload sequence for 'echo2'
 */
function echo2(value: number): number;
function echo2(value: string): string;
// ❌ ERROR if you put 'const x = 1;' here
function echo2(value: any): any {
  if (typeof value === "number") return value ** 2;
  if (typeof value === "string") return value.toLocaleUpperCase();
  return value;
}

// ------------------------------------------------------------------------------
// 5. ADVANCED: Overloading vs. Generics
// ------------------------------------------------------------------------------

/**
 * USE OVERLOADING WHEN: Logic is completely different per type.
 */
function processInput(value: string): object;
function processInput(value: number): string;
function processInput(value: any): any {
  if (typeof value === "string") return JSON.parse(value); // Complex parsing
  return value.toString(); // Simple conversion
}

/**
 * USE GENERICS WHEN: Logic is the same, just preserving the type.
 * (More flexible than overloading for simple cases)
 */
function identity<T>(value: T): T {
  return value; // Same logic for any type T
}

// ------------------------------------------------------------------------------
// 6. BONUS: Method Overloading in Classes
// ------------------------------------------------------------------------------

class DataFormatter {
  /**
   * Overload: Single string
   */
  format(value: string): string;
  /**
   * Overload: Array of strings
   */
  format(values: string[]): string[];

  /**
   * Implementation
   */
  format(value: any): any {
    if (Array.isArray(value)) {
      return value.map((v: string) => v.toUpperCase());
    }
    return value.toUpperCase();
  }
}

const formatter = new DataFormatter();
const single = formatter.format("hello"); // Type: string
const list = formatter.format(["a", "b"]); // Type: string[]

// Exporting for module usage (optional)
export { myFunc, echo2, processInput, identity, DataFormatter };
