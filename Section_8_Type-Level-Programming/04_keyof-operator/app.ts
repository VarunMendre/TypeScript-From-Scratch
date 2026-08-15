// Define a User type with two properties
type User = {
  name: string;  // property 'name' of type string
  age: number;   // property 'age' of type number
};

// keyof User extracts all property keys as a union type
type T = keyof User;
// Result: type T = "name" | "age"
// These are the only valid keys you can use to access User properties

// Variable 'a' must be one of the keys from type T
const a: T = "age";   // ✅ Valid - "age" is in "name" | "age"
// VSCode IntelliSense shows only 2 suggestions: "age" | "name"

const b: T = "name";  // ✅ Valid - "name" is in "name" | "age"

// Intersection of string with T ("name" | "age")
// Since "name" | "age" are already strings, the result is the narrower type
type U = string & T;  
// Result: type U = "name" | "age"
// Explanation: T is a subset of string, so string & T = T

// User2 intersects User with an empty object type {}
type User2 = {
  name: string;
  age: number;
} & {};  
// The & {} doesn't change runtime behavior, but affects VSCode's type display
// It forces TypeScript to expand/show the full type in IntelliSense

type F = keyof User2;  
// Result: type F = "name" | "age"
// Same as keyof User, but VSCode displays it more explicitly

// keyof on empty string literal type ""
type G = keyof "";
// Result: type G = number | "toString" | "charAt" | "charCodeAt" | ...
// Why number? Because you can access string characters by index: str[0], str[1], etc.
// Strings have numeric index signatures for character access

const c: keyof "" = 52;  // ✅ Assignable - number is part of keyof ""
// You can access any numeric index on a string

// keyof on number primitive type
type H = keyof number;  
// Result: type H = "toString" | "valueOf" | "toFixed" | "toExponential" | 
//                  "toPrecision" | "toLocaleString"
// These are all methods available on number values
// In JS, you can access them via bracket notation: num["toFixed"](2)

// keyof on undefined - no properties exist
type I = keyof undefined;  
// Result: type I = never
// undefined has no properties or methods

// keyof on null - no properties exist
type J = keyof null;  
// Result: type J = never
// null has no properties or methods

// keyof on void - no properties exist
type K = keyof void;  
// Result: type K = never
// void represents absence of value, no properties available

// keyof on unknown - TypeScript doesn't allow property access on unknown
type L = keyof unknown;  
// Result: type L = never
// unknown is type-safe; you must narrow it before accessing properties
// x["name"] would error, so no keys are considered safe

// keyof on any - allows ALL property access without errors
type M = keyof any;  
// Result: type M = string | number | symbol
// any bypasses type checking, so any key is valid

// keyof on never - paradoxically allows all keys
type N = keyof never;  
// Result: type N = string | number | symbol
// Explanation: never represents an impossible/unreachable value
// Since you can never actually have a value of type never,
// TypeScript allows all indexing operations without error
// This is consistent with "ex falso quodlibet" (from falsehood, anything follows)

let d!: never;  // Definite assignment assertion - d will never have a value
d["hi"];        // ✅ No error - you can index never with any key

const e = 50;
if (typeof e !== "number") e["hi"];  
// Inside this block, e has type 'never' (since e is always number)
// So e["hi"] is allowed (indexing never)

// keyof on empty array intersected with (string | number)
type O = keyof [] & (string | number);
// keyof [] gives all array properties (number, "length", "push", etc.)
// Intersecting with (string | number) filters to only those keys that are string | number
// Result: union of array property keys that are strings or numbers

// Expand utility type - forces TypeScript to show expanded type in IntelliSense
type Expand<T> = {
  [K in keyof T]: T[K];  // Mapped type that recreates each property
};

// Apply Expand to keyof [] to see all array keys expanded
type P = Expand<keyof []>;
// This displays all properties of array type explicitly

// keyof on function type (() => void)
type Func = keyof (() => void);  
// Result: type Func = never
// Why? The type annotation (() => void) defines a function *signature*, not an instance
// Function signatures don't have accessible properties in the type system
// Note: void doesn't exist at runtime in JavaScript

// However, actual Function objects DO have properties
type ExFunc = Expand<keyof Function>;
// Result: type ExFunc = "name" | "toString" | "length" | 
//                     typeof Symbol.hasInstance | "apply" | "call" | 
//                     "bind" | "prototype" | "arguments" | "caller"
// Function is the interface/type for actual function objects, which have these properties

// keyof on object with single property
type ExObj = Expand<keyof { name: "varun" }>;  
// Result: type ExObj = "name"
// Only one key exists in this object type

// Using keyof with typeof operator
const obj = {
  name: "varun",
  age: 22
};

// typeof obj gets the inferred type: { name: string; age: number }
// keyof then extracts the keys from that type
type Q = keyof typeof obj;  
// Result: type Q = "name" | "age"
// Evaluation order: right to left
// 1. typeof obj → { name: string; age: number }
// 2. keyof { name: string; age: number } → "name" | "age"

// PropertyKey is a built-in TypeScript type
type R = PropertyKey;
// Result: type R = string | number | symbol
// Defined in lib.es5.d.ts
// Represents all valid property key types in JavaScript/TypeScript
// Every object key must be one of these three types

// keyof on empty array intersected with empty object
type S = keyof [] & {};  
// Result: all properties that exist on arrays
// The & {} doesn't change the type but may affect display
// Includes: number | "length" | "toString" | "pop" | "push" | ...

// keyof on union type ("ts" | 100)
type V = keyof ("ts" | 100);  
// Result: type V = "toString" | "valueOf"
// For union types, keyof returns only keys common to ALL members
// Both string "ts" and number 100 share: "toString" and "valueOf"

// keyof on intersection type ("ts" & 100)
type W = keyof ("ts" & 100);
// Result: This creates an impossible type (string & number = never)
// A value cannot be both a string AND a number simultaneously
// keyof never = string | number | symbol (see type N above)   