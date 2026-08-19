// Indexed Access Types
//
// Indexed Access Types allow us to access the type of a specific
// property, tuple element, or array element using the [] syntax.
//
// Syntax:
// type Result = Type["property"];

// --------------------------------------------------
// 1. Accessing an Object Property Type
// --------------------------------------------------

type User = {
  name: string;
  age: number;
  email: boolean;
  address: {
    city: string;
  };
};

const user = {
  name: "Varun",
  age: 22,
};

user["age"]; // Bracket notation: accesses the value of the "age" property.

// Indexed Access Type:
// Extracts the type of the "name" property from User.
type UserName = User["name"]; // string

// Extracts the type of the "address" property.
type UserAddress = User["address"]; // { city: string }

// We can also access nested property types.
type UserCity = User["address"]["city"]; // string

// --------------------------------------------------
// 2. Indexed Access Types with Tuples
// --------------------------------------------------

type Developer = ["Varun", 22, "Backend-Developer"];

// Accessing a tuple element by its index gives its exact literal type.
type DeveloperName = Developer[0]; // "Varun"
type DeveloperAge = Developer[1]; // 22
type DeveloperRole = Developer[2]; // "Backend-Developer"

// --------------------------------------------------
// 3. Indexed Access Types with Arrays
// --------------------------------------------------

type StringArray = string[];

// "length" is a property of an array whose type is number.
type ArrayLength = StringArray["length"]; // number

// "includes" is a method of string[].
// Therefore, accessing its type gives the method's function signature.
type ArrayIncludes = StringArray["includes"];
// (searchElement: string, fromIndex?: number) => boolean

// --------------------------------------------------
// 4. Indexed Access Types with Primitive Types
// --------------------------------------------------

// Number's "toFixed" method returns a string.
type NumberToFixed = number["toFixed"];
// (fractionDigits?: number) => string

// Number's "toString" method returns a string.
type NumberToString = number["toString"];
// (radix?: number) => string

// Boolean's "valueOf" method returns a boolean.
type BooleanValueOf = boolean["valueOf"];
// () => boolean

// --------------------------------------------------
// 5. Accessing Array Elements Using [number]
// --------------------------------------------------

// For an array, using [number] means:
// "Give me the type of an element at any numeric index."

type StringElement = string[][number]; // string

// Since every element of string[] is a string,
// accessing any numeric index gives string.

type ObjectArray = {}[];

// --------------------------------------------------
// 6. Tuples and [number]
// --------------------------------------------------

// [number] extracts the union of all possible element types
// from a tuple.

type Status = ["hi" | "bye"][number];
// "hi" | "bye"

// --------------------------------------------------
// 7. keyof + Indexed Access Types
// --------------------------------------------------

// keyof User produces a union of all property names.
type UserKeys = keyof User;
// "name" | "age" | "email" | "address"

// We can use those keys to extract the corresponding property types.
type UserValues = User[UserKeys];
// string | number | boolean | { city: string }

// This is equivalent to:
type UserValuesAlternative = User[keyof User];

// --------------------------------------------------
// 8. Accessing Multiple Properties
// --------------------------------------------------

// We can provide a union of property names inside [].
// The result is the union of the corresponding property types.

type NameOrAge = User["name" | "age"];
// string | number

type StringMethods = string["substring" | "length"];
// ((start: number, end?: number) => string) | number

// --------------------------------------------------
// 9. Array Indexed Access
// --------------------------------------------------

// Any numeric index of string[] contains a string.
type StringElementAtAnyIndex = string[][1]; // string

// Equivalent concept:
type StringElementUsingNumber = string[][number]; // string

// --------------------------------------------------
// 10. Numeric Literal Indexed Access
// --------------------------------------------------

// Primitive types also expose their properties and methods.
type NumberToStringMethod = 78["toString"];
// (radix?: number) => string

// When accessing a property that exists on both members of a union,
// TypeScript allows the access and combines the resulting types.

type UnionToString = (40 | "Hi")["toString"];
// () => string

// --------------------------------------------------
// 11. Indexed Access with keyof
// --------------------------------------------------

type AllUserProperties = User[keyof User];

/*
User[keyof User] works in two steps:

1. keyof User gives:
   "name" | "age" | "email" | "address"

2. User[...] extracts the type of each property:
   User["name"]    -> string
   User["age"]     -> number
   User["email"]   -> boolean
   User["address"] -> { city: string }

The final result is their union:

string | number | boolean | { city: string }
*/

// --------------------------------------------------
// 12. Important Note About never
// --------------------------------------------------

// `never` represents a type that has no possible values.
//
// Unlike `any` or `unknown`, you cannot generally access arbitrary
// properties from `never` in this way.
//
// Therefore, avoid examples such as:
// type Invalid = never["fc"];
//
// They are not useful for demonstrating Indexed Access Types.

// --------------------------------------------------
// Summary
// --------------------------------------------------

/*
Indexed Access Types use [] to extract types from another type.

Examples:

type Name = User["name"];
// string

type City = User["address"]["city"];
// string

type First = Developer[0];
// "Varun"

type Element = string[][number];
// string

type Keys = keyof User;
// "name" | "age" | "email" | "address"

type Values = User[keyof User];
// string | number | boolean | { city: string }
*/

// Visit app2.ts
