```ts
// ============================================================
// Conditional Types
// ============================================================

// A conditional type checks whether one type is assignable to another:
//
// T extends U ? "assignable" : "not-assignable"


// ------------------------------------------------------------
// 1. Basic Assignability
// ------------------------------------------------------------

type T1 = "STR" extends string ? "assignable" : "not-assignable";

// "STR" is a string literal type.
// A string literal type is a subtype of string,
// so "STR" is assignable to string.
// T1 = "assignable"


type T2 = number extends string ? "assignable" : "not-assignable";

// number and string are unrelated types.
// number is not assignable to string.
// T2 = "not-assignable"


type T3 = number extends number[] ? "assignable" : "not-assignable";

// number is a single number value,
// while number[] represents an array of numbers.
//
// number is NOT assignable to number[].
// Also, number[] is NOT a supertype of number.
// They are different, unrelated types.
//
// T3 = "not-assignable"


// ------------------------------------------------------------
// 2. Object Assignability
// ------------------------------------------------------------

type T4 = { name: "Varun" } extends {} ? "assignable" : "not-assignable";

// {} represents any non-nullish value.
// An object such as { name: "Varun" } is assignable to {}.
//
// T4 = "assignable"


type T5 =
  { name: "Varun"; age: 22 } extends { name: "Varun" }
    ? "assignable"
    : "not-assignable";

// An object with MORE properties can be assigned to a type
// that requires only a subset of those properties.
//
// { name: "Varun"; age: 22 }
// contains everything required by
// { name: "Varun" }
//
// Therefore, the first type is assignable to the second.
//
// T5 = "assignable"


// ------------------------------------------------------------
// 3. Function and Object Properties
// ------------------------------------------------------------

type T6 = Function extends { length: number }
  ? "assignable"
  : "not-assignable";

// The Function type has a "length" property of type number.
//
// Therefore, Function is assignable to { length: number }.
//
// T6 = "assignable"


// ------------------------------------------------------------
// 4. unknown, never and any
// ------------------------------------------------------------

type T7 = number extends unknown ? "assignable" : "not-assignable";

// unknown is the top type in TypeScript.
// Every type is assignable to unknown.
//
// T7 = "assignable"


type T8 = number extends never ? "assignable" : "not-assignable";

// never represents a type with no possible values.
// No normal type is assignable to never.
//
// T8 = "not-assignable"


type T9 = never extends number ? "assignable" : "not-assignable";

// never is assignable to every type.
//
// T9 = "assignable"


type T10 = number extends any ? "assignable" : "not-assignable";

// any can accept values of any type.
// Therefore, number is assignable to any.
//
// T10 = "assignable"


type T11 = any extends number ? "assignable" : "not-assignable";

// When "any" is used as the checked type in a conditional type,
// the result can represent BOTH branches.
//
// T11 = "assignable" | "not-assignable"


type T12 = any extends unknown ? "assignable" : "not-assignable";

// Because the checked type is any,
// TypeScript can produce both possible branches.
//
// T12 = "assignable" | "not-assignable"


type T13 = never extends any ? "assignable" : "not-assignable";

// never is assignable to every type, including any.
//
// T13 = "assignable"


// Important:
// any can bypass normal TypeScript type checking.
// It should therefore be used carefully.

// const a: unknown = 80;
// const num: number = a;
// Error: Type 'unknown' is not assignable to type 'number'.

const a: any = 80;
const num: number = a;

// any bypasses the type-checking that would normally prevent
// assigning an unknown value to number.


// ------------------------------------------------------------
// 5. Conditional Types with Generics
// ------------------------------------------------------------

type U<V> = V extends string
  ? "assignable"
  : "not-assignable";


type A1 = U<string>;

// string extends string -> true
// A1 = "assignable"


type A2 = U<"Hii">;

// "Hii" extends string -> true
// A2 = "assignable"


type A3 = U<unknown>;

// unknown is not assignable to string.
// Therefore:
// A3 = "not-assignable"


// ------------------------------------------------------------
// 6. Conditional Types with Function Types
// ------------------------------------------------------------

type V =
  () => (
    void extends { name: string }
      ? "Yes"
      : "No"
  );

// Important:
// The conditional type is the RETURN TYPE of the function.
//
// void does not extend { name: string },
// so the return type becomes "No".
//
// V = () => "No"


type V1 =
  () => (
    Function extends { name: string }
      ? "Yes"
      : "No"
  );

// Function has a "name" property of type string,
// so the conditional type evaluates to "Yes".
//
// V1 = () => "Yes"


const functionV1: V1 = () => "Yes";

// This would produce an error:
//
// const functionV2: V1 = () => "No";
//
// Error:
// Type '"No"' is not assignable to type '"Yes"'.


// ------------------------------------------------------------
// 7. keyof and Function Types
// ------------------------------------------------------------

type W = keyof (() => void);

// keyof extracts the property keys of the function type.
//
// For a simple function type, this can result in "never"
// because the function type itself does not expose
// known keys through this type in the same way as an object type.


// ------------------------------------------------------------
// 8. {} vs unknown
// ------------------------------------------------------------

// {} means:
// "any value except null and undefined"
//
// It does NOT mean "an empty object only".
//
// Examples:
//
// const x1: {} = 10;          // allowed
// const x2: {} = "hello";     // allowed
// const x3: {} = true;        // allowed
// const x4: {} = {};          // allowed
// const x5: {} = null;        // Error
// const x6: {} = undefined;   // Error


type W1 = null | undefined | {};

// null | undefined | {} covers all possible JavaScript values.
//
// Therefore, this union is effectively equivalent to unknown
// for assignability purposes.


// ------------------------------------------------------------
// 9. unknown and any
// ------------------------------------------------------------

type Y1 = unknown extends unknown
  ? "Yes"
  : "No";

// Yes


type Y2 = unknown extends any
  ? "Yes"
  : "No";

// Yes


type Y3 = any extends unknown
  ? "Yes"
  : "No";

// Because any is the checked type,
// conditional types can produce both branches.
//
// Y3 = "Yes" | "No"


// ------------------------------------------------------------
// 10. unknown vs {}
// ------------------------------------------------------------

type Y4 = unknown extends {}
  ? "Yes"
  : "No";

// No
//
// unknown may contain null or undefined,
// while {} does NOT allow null or undefined.
//
// Therefore, unknown is not assignable to {}.


type Y5 = {} extends unknown
  ? "Yes"
  : "No";

// Yes
//
// Every type is assignable to unknown,
// including {}.


type Y6 =
  unknown extends ({} | undefined | null)
    ? "Yes"
    : "No";

// Yes
//
// {} accepts every non-nullish value.
// undefined and null cover the remaining values.
//
// Therefore:
//
// {} | undefined | null
//
// effectively covers all possible values,
// making it equivalent to unknown for this assignability check.
//
// So:
// Y6 = "Yes"


// ============================================================
// Important Mental Model
// ============================================================
//
// Think of:
//
// never   -> bottom type
// unknown -> top type
// any     -> escape hatch / bypasses normal type checking
//
// Assignability:
//
// never -> assignable to every type
// every type -> assignable to unknown
//
// But:
//
// unknown -> NOT automatically assignable to specific types
//
// Example:
//
// const x: unknown = 10;
// const y: number = x; // Error
//
// You must narrow or assert x before assigning it to number.
//
// ============================================================
```;
