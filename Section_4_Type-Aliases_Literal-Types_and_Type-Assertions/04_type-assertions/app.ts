/**
 * ==========================================
 * TOPIC: TypeScript Type Assertions & `as const`
 * ==========================================
 */

// ------------------------------------------------------------------
// 1. TYPE ASSERTIONS (`as Type`)
// ------------------------------------------------------------------
// Definition: Tells the TypeScript Compiler (TSC) to treat a value
// as a specific type, overriding the inferred type.
// ⚠️ Warning: This is a compile-time instruction only. It does NOT
// perform runtime checks. If the assertion is wrong, the app may crash.

type CSSubjects = "OS" | "NT" | "DBMS";

// Scenario: Mixed Array (Inferred as (string | number)[])
let arr = ["Varun", 22];

// ❌ Problem: Accessing index 0 gives union type (string | number).
// You only see methods common to BOTH types (e.g., .toString()).
// arr[0].toUpperCase(); // Error: Property 'toUpperCase' does not exist...

// ✅ Solution: Use Type Assertion to tell TSC "I know this is a string".
(arr[0] as string).toUpperCase();
// Now you get all string methods & properties.

// ⚠️ Danger Zone: Asserting incorrectly
// The code below compiles, but will CRASH at runtime because index 1 is a number.
// (arr[1] as string).toUpperCase(); // Runtime Error: .toUpperCase is not a function

// ✅ Valid Assertion: When you know the specific type
let b = arr[1] as number;
// Variable 'b' now has full number autocompletion.

// ✅ Assertion to Custom Type
// Useful when data comes from an external source (API/JSON) and you know the shape.
// let subject = arr[1] as CSSubjects;

// ------------------------------------------------------------------
// 2. LITERAL TYPES vs. WIDENED TYPES
// ------------------------------------------------------------------

// Standard Declaration: Type is "widened" to the general primitive.
let str = "Hii";
// Type: string (Can be reassigned to "Hello", "World", etc.)

// Const Declaration: Type is inferred as the specific "Literal".
const strLiteral = "Hii";
// Type: "Hii" (Can ONLY be the value "Hii")

// ------------------------------------------------------------------
// 3. IMMUTABILITY WITH `as const`
// ------------------------------------------------------------------
// Usage: Applies to objects and arrays.
// Effects:
// 1. Makes all properties deeply `readonly`.
// 2. Infers literal types instead of widened types.

// Example: Readonly Array
const arrConst = [1, 2, 3] as const;
// Type: readonly [1, 2, 3]
// arrConst[1] = 4; // ❌ Error: Index signature is readonly.

// Example: Readonly Object with Nested Structure
const objConst = {
  name: "Varun",
  age: 22,
  address: {
    city: "Pune",
    state: "Maharashtra",
  },
} as const;

// ❌ Mutations are now forbidden at all levels:
// objConst.name = "John";            // Error: readonly property
// objConst.address.city = "Mumbai";  // Error: deeply readonly property

/**
 * 📝 Type Inference Result for `objConst`:
 *
 * const objConst: {
 *     readonly name: "Varun";
 *     readonly age: 22;
 *     readonly address: {
 *         readonly city: "Pune";
 *         readonly state: "Maharashtra";
 *     };
 * }
 *
 * Summary: Values are locked (readonly) and types are precise (literals).
 */
