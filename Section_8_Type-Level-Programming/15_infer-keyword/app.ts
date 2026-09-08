// ============================================
// 1. Basic Array Type Check (without infer)
// ============================================

type GetArrayType<T> = T extends unknown[] ? T : never;

type T1 = GetArrayType<string[]>; // string[]
type T2 = GetArrayType<number[]>; // number[]

// Problem: This gives us the FULL array type (string[]),
// but we only want the ELEMENT type (string).
// Solution: Use the `infer` keyword.

// ============================================
// 2. Using `infer` to Extract Array Element Type
// ============================================

// `infer` can ONLY be used on the right side of `extends` in a conditional type.
// It declares a type variable that TypeScript fills in by pattern-matching.

type GetArrayElementType<T> = T extends (infer I)[] ? I : never;
//                                ^^^^^^^
// Pattern: "T is an array of <something>"
// Action:  capture that <something> into variable I

// How it works step-by-step:
// - (infer I)[]  →  "an array whose element type is unknown, capture it as I"
// - T extends (infer I)[]  →  "if T can be assigned to an array of I,
//                               then figure out what I must be"
// - ? I : never  →  "if match, return the element type; otherwise never"

type TI1 = GetArrayElementType<string[]>; // string
type TI2 = GetArrayElementType<number[]>; // number
type TI3 = GetArrayElementType<{}>; // never ({} is not an array)

// Edge case: empty array
type TI4 = GetArrayElementType<[]>; // never

// WHY? `[]` is typed as `never[]` in TypeScript (an array that can hold
// no element type). So it DOES match `(infer I)[]`, and I is inferred
// as `never` (the element type of never[]).
// The `never` here comes from I (the inferred element), NOT from the
// else branch.

// ============================================
// 3. Extracting Function Return Type
// ============================================

// Without infer — gives back the full function type:
type FunctionReturnType<T> = T extends (...args: any[]) => unknown ? T : never;

type Func1 = FunctionReturnType<() => string>; // () => string  ← not what we want

// With infer — extracts just the return type:
type FunctionReturnTypeInfer<T> = T extends (...args: any[]) => infer R
  ? R
  : never;
//                                              ^^^^^^^^^^^^    ^^^
//                                              matches any     captures
//                                              number of args  return type

type InferFunc1 = FunctionReturnTypeInfer<() => string>; // string
type InferFunc2 = FunctionReturnTypeInfer<() => number>; // number
type InferFunc3 = FunctionReturnTypeInfer<(a: number) => number>; // number ✓

// NOTE: Using `() => infer R` (no args) would FAIL for functions with
// parameters. Always use `(...args: any[]) => infer R` to match
// functions with any number of arguments.

// ============================================
// 4. Extracting BOTH Return Type AND Parameter Type
// ============================================

type FunctionSignature<T> = T extends (...args: infer P) => infer R
  ? { returnType: R; parameterType: P }
  : never;
//                          ^^^              ^^^
//                          captures the    captures the
//                          params tuple    return type

type Func2 = FunctionSignature<(a: string, b: boolean) => number>;
// {
//   returnType: number;
//   parameterType: [a: string, b: boolean];  ← tuple, not array!
// }

// ============================================
// 5. Extracting a Specific Property's Value Type
// ============================================

// This extracts the VALUE type of the `id` property specifically,
// NOT "all keys" or "all values" of the object.

type GetIdType<T> = T extends { id: infer K } ? K : never;
//                              ^^^^^^^^^
// Pattern: "an object with an `id` property of type <something>"
// Action:  capture that <something> into K

type Obj1 = GetIdType<{ id: number }>; // number
type Obj2 = GetIdType<{ id: string; name: "Varun" }>; // string
type Obj3 = GetIdType<{ name: "Varun" }>; // never (no `id` property)
