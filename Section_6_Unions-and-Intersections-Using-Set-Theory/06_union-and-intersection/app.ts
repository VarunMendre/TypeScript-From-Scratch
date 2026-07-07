/**
 * TypeScript Set Theory: Union (|) and Intersection (&) Types
 * 
 * Concepts:
 * - Union (|): Represents a value that can be one of several types (Logical OR).
 *   - Set Theory: Combines all possible values from both sets.
 *   - Behavior: The resulting type is the "superset" (wider type).
 * 
 * - Intersection (&): Represents a value that must satisfy all types simultaneously (Logical AND).
 *   - Set Theory: Contains only values present in both sets.
 *   - Behavior: The resulting type is the "subset" (narrower type).
 */

// --- Basic Primitives ---

// Union: string is the superset of the literal "Hi".
// Result: type T = string
type T1 = string | "Hi";

// Intersection: "Hi" is the only value common to both string and the literal "Hi".
// Result: type T = "Hi"
type T2 = string & "Hi";

// Union: boolean includes true and false.
// Result: type T3 = boolean
type T3 = boolean | false;

// Intersection: false is the only common value.
// Result: type T4 = false
type T4 = boolean & false;

// --- Advanced Set Operations ---

// Exclude<T, U>: Equivalent to set difference (T \ U).
// Removes false from boolean, leaving only true.
// Result: type T5 = true
type T5 = Exclude<boolean, false>;

// Intersection with Unions: Distributes over the union.
// (number | string) & string => (number & string) | (string & string) => never | string => string
// Result: type T6 = string
type T6 = (number | string) & string;

// Intersection of Unions: Finds common types between groups.
// Common type between (number | string) and (string | boolean) is string.
// Result: type T7 = string
type T7 = (number | string) & (string | boolean);

// Union of Unions: Combines all unique types.
// Result: type T8 = string | number | boolean
type T8 = (number | string) | (string | boolean);

// Complex Intersection
// Common types between (number | string | boolean) and (string | boolean) are string and boolean.
// Result: type T9 = string | boolean
type T9 = (number | string | boolean) & (string | boolean);

// --- Special Types: unknown, any, never ---

// Union with unknown: unknown is the top type (universal set).
// Any type combined with unknown via union results in unknown.
// Result: type T10 = unknown
type T10 = unknown | string;

// Intersection with unknown: unknown accepts any value, so the constraint becomes the specific type.
// Result: type T11 = string
type T11 = unknown & string;

// Disjoint Types: No value can be both a string and a number simultaneously.
// Result: type T12 = never (empty set)
type T12 = string & number;

// Identity with never:
// Intersection with never always results in never (empty set intersection).
// Result: type T13 = never
type T13 = never & "string";

// Union with never: never adds no values to the set.
// Result: type T14 = "string"
type T14 = never | "string";

// --- Variable Assignment & IntelliSense ---

let a: number;
let b: string;
// c can be either number or string.
let c: string | number;

// Accessing properties on 'c' is restricted.
// IntelliSense will only suggest methods common to BOTH string and number (e.g., toString()).
// To access specific methods (like .toUpperCase()), you must narrow the type using a type guard.
// const result = c.toString(); // OK
// const upper = c.toUpperCase(); // Error: Property 'toUpperCase' does not exist on type 'string | number'.

// --- Interaction with 'any' ---

// 'any' breaks set theory rules. It is not a true universal set like 'unknown'.
// 'any' disables type checking entirely.
// Union with any: Result is any.
type T15 = unknown | any; // type T15 = any

// Intersection with any: Result is any.
type T16 = unknown & any; // type T16 = any

// Best Practice: Avoid using 'any'.
// Use 'unknown' for values of uncertain type, as it enforces type checks before usage.   