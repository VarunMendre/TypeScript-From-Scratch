// ==========================================================
// Types as Sets of JavaScript Values
// ==========================================================

// In TypeScript, a type represents a set of possible JavaScript values.

// ----------------------------------------------------------
// number
// ----------------------------------------------------------

// Every JavaScript number belongs to the `number` set.
// Examples:
// { ..., -100, 0, 1, Infinity, -Infinity, NaN }

const num: number = 20;

// ----------------------------------------------------------
// string
// ----------------------------------------------------------

// Every possible JavaScript string belongs to the `string` set.

/*
string = {
    "",
    "a",
    "hello",
    "TypeScript",
    "123",
    ...
}
*/

// The `str` variable can only store values that belong to the
// `string` set (which contains infinitely many possible values).

const str: string = "";

// ----------------------------------------------------------
// boolean
// ----------------------------------------------------------

// The `boolean` type is a very small set that contains only two values:
//
// boolean = { true, false }

const bool: boolean = true;

// ==========================================================
// Literal Types
// ==========================================================

type Direction = "left";

// The `Direction` type is a set containing only one value.

/*
Direction = {
    "left"
}
*/

let d: Direction = "left"; // ✅

// let d: Direction = "right"; // ❌

// ==========================================================
// Union Types
// ==========================================================

type Success = "success" | "failure";

// This creates a union set containing both literal values.

/*
Success = {
    "success",
    "failure"
}
*/

// let s: Success = "success"; // ✅
// let s: Success = "failure"; // ✅
// let s: Success = "loading"; // ❌

// ==========================================================
// any Type
// ==========================================================

let x: any;

// The `any` type represents the set of every possible
// JavaScript value.

/*
It includes:

- Numbers
- Strings
- Objects
- Arrays
- Functions
- Everything

It is the largest possible type.
*/

// ==========================================================
// never Type
// ==========================================================

// `never` represents the empty set.
//
// never = {}
//
// It contains no values.
// Nothing belongs to this set.

// ----------------------------------------------------------
// Visual Representation
// ----------------------------------------------------------

//
//               any
//     ┌─────────────────────┐
//     │                     │
//     │ number              │
//     │                     │
//     │ string              │
//     │                     │
//     │ boolean             │
//     │                     │
//     │ object              │
//     │                     │
//     │ ...                 │
//     │                     │
//     └─────────────────────┘
//

// ==========================================================
// Subset Relationship
// ==========================================================

// type A = "hello";
//
// Set A:
//
// {
//     "hello"
// }

// type B = string;
//
// Set B:
//
// {
//     every possible string
// }

// Clearly:
//
// A ⊂ B
//
// Therefore, "hello" is a subtype of `string`.

// ==========================================================
// Why Union Works
// ==========================================================

type A = number;
type B = string;

// Their sets are:
//
// A = { all numbers }
// B = { all strings }

type C = number | string;

// The resulting set becomes:
//
// { all numbers } ∪ { all strings }

// ==========================================================
// Why Intersection Works
// ==========================================================

// For object types:

type Person = {
  name: string;
};

type Employee = {
  salary: number;
};

type WorkingPerson = Person & Employee;

// A value of type `WorkingPerson` must satisfy both `Person`
// and `Employee`.
//
// Therefore, the resulting set contains:
//
// {
//     name,
//     salary
// }

// ==========================================================
// Singleton Sets
// ==========================================================

let un: undefined = undefined;
let nl: null = null;

// `undefined` and `null` are singleton sets because
// each contains only one possible value.

// ==========================================================
// unknown (Universal Set)
// ==========================================================

// The universal set is better represented by `unknown`,
// not `any`.
//
// Why?
//
// A universal set can hold values of every type,
// but it cannot be assigned directly to another type
// without first narrowing or performing a type check.
//
// On the other hand, `any` disables TypeScript's type checking.

// Example:

// let universal: unknown = "hii";

// let a: string = universal;
// ❌ Error:
// Type 'unknown' is not assignable to type 'string'.
