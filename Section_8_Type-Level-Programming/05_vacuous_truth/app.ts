// ============================================================
// VACUOUS TRUTH IN JAVASCRIPT / TYPESCRIPT
// ============================================================
//
// A "vacuous truth" is a universal statement ("all X are Y") that is
// true simply because there is no X to break the rule.
// If the set is empty, there's no counterexample, so the claim holds
// by default.

// --- Example 1: Array.prototype.every() on an empty array ---
// "every() checks whether ALL elements satisfy a condition."
// Since there are ZERO elements here, none of them can violate
// "num > 10". No counterexample exists, so JS returns true.
[].every((num) => num > 10); // true (vacuously)

// ============================================================
// VACUOUS TRUTH SHOWS UP IN TYPESCRIPT'S TYPE SYSTEM TOO
// ============================================================

const a = 89;

if (typeof a !== "number") {
  // This branch is unreachable — TypeScript narrows `a` to `never`
  // here because we already know `a` IS a number.
  // "never" represents a type with NO possible values (an empty set).
  //
  // Since there are no values in `a` at this point, TS can't find
  // any value that DOESN'T have property "0on" either — so, just
  // like the empty-array example, it vacuously allows the access.
  a["0on"]; // allowed only because this code path can never run
}

declare let o: never;

// `o` is declared as type `never` — a variable that can hold no value.
// Because the set of possible values of `o` is empty, TypeScript
// can't point to any value of `o` that fails to have a given key.
// So indexing `o` with ANY key type is vacuously "true"/allowed,
// and the result type is also `never` (since no value can ever exist
// to be returned).
let v1 = o[""]; // string key   -> allowed
let v2 = o[1]; // number key   -> allowed
let v3 = o[Symbol()]; // symbol key   -> allowed

// This is exactly WHY TypeScript's own lib defines:
//   type keyof never = string | number | symbol
// "never" has no members, so there's no member to disprove that
// "every possible key type" (string, number, symbol) is valid on it.
// It's the same vacuous-truth logic as the empty array/basket/class
// examples — true because there's nothing around to violate it.

// ============================================================
// keyof (A & B)  vs  keyof A | keyof B
// ============================================================

type A = {
  name: string;
  age: number;
};

type B = {
  name: string;
  email: string;
};

// (A & B) is an INTERSECTION type: an object that has ALL properties
// of A AND all properties of B combined into one shape:
// { name: string, age: number, email: string }
// keyof that combined shape = union of every property name on it.
type C = keyof (A & B); // "name" | "age" | "email"

// keyof A alone = "name" | "age"
// keyof B alone = "name" | "email"
// Union of those two sets of keys = "name" | "age" | "email"
type D = keyof A | keyof B; // "name" | "age" | "email"

// C === D here because:
// - C = keys of the MERGED object (A & B)
// - D = the UNION of each type's individual keys
// Both end up collecting the same full set of property names,
// just approached from two different directions:
//   C merges the shapes first, then takes keys.
//   D takes keys first, then merges (unions) them.
// (Note: this equivalence can break with optional/conflicting keys —
// but for these two plain shapes it lines up.)
