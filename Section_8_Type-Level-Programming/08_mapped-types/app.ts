/**
 * Mapped Types in TypeScript
 *
 * A mapped type produces a new object type by transforming the properties
 * of an existing type. It iterates over keys (like a for...in loop at the type level)
 * and applies a transformation to each property's type.
 */

const obj = {
  name: "Varun",
  age: 22,
  designation: "Developer",
  isValid: true,
};

// Extracts all property keys from 'obj' as a union type: "name" | "age" | "designation" | "isValid"
type Keys = keyof typeof obj;

// Basic mapped type: iterates over specific literal keys and sets all values to string
type T = {
  [K in "name" | "age" | "designation"]: string;
};
/* 
Resulting type T:
{
  name: string;
  age: string;
  designation: string;
}
*/

// Define a base type to demonstrate dynamic value mapping
type User = {
  name: string;
  age: number;
  designation: string;
  isValid: boolean;
};

// Uses indexed access types (User[K]) to preserve the original property types
type T2 = {
  [K in Keys]: User[K];
};
/* 
Resulting type T2 (preserves original types from User):
{
  name: string;
  age: number;
  designation: string;
  isValid: boolean;
}
*/

// Transforms each property type into an array of that type
type T3 = {
  [K in Keys]: User[K][];
};
/* 
Resulting type T3:
{
  name: string[];
  age: number[];
  designation: string[];
  isValid: boolean[];
}
*/

// Transforms each property into an object containing an array of the key literal itself
type T4 = {
  [K in Keys]: { list: K[] };
};
/* 
Resulting type T4:
{
  name: { list: "name"[] };
  age: { list: "age"[] };
  designation: { list: "designation"[] };
  isValid: { list: "isValid"[] };
}
*/

// Maps all properties to a single fixed type (boolean)
type T5 = {
  [K in keyof User]: boolean;
};
/* 
Resulting type T5:
{
  name: boolean;
  age: boolean;
  designation: boolean;
  isValid: boolean;
}
*/

// Index signature type: allows any string, number, or symbol key with string values
// Note: This creates an index signature, not a standard mapped type over specific keys
type T6 = {
  [K in string | number | symbol]: string;
};
/* 
Resulting type T6 (equivalent to):
{
  [x: string]: string;
  [x: number]: string;
  [x: symbol]: string;
}
*/

// Generic utility type: converts all properties of any type T into arrays
type PropertyToArray<T> = {
  [P in keyof T]: T[P][];
};

type Result = PropertyToArray<User>;
/* 
Resulting type Result:
{
  name: string[];
  age: number[];
  designation: string[];
  isValid: boolean[];
}
*/

// Utility type to force TypeScript to expand/flatten complex mapped types in IDE tooltips
// Mapped types are lazy-evaluated; this helper makes the result visible in IntelliSense
type Expand<T> = {
  [K in keyof T]: T[K];
};

/**
 * Important Note:
 * - Mapped types (using [K in keyof T]) only work with type aliases, not interfaces.
 * - Interfaces are designed for static object structures and declaration merging.
 * - However, interfaces support index signatures for dynamic key-value patterns.
 */

interface U {
  [prop: string]: string; // Index signature: any string key maps to a string value
}
