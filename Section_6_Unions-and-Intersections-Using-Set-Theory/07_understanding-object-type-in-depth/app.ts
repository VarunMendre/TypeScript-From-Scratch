type T1 = { length: number };
type T2 = { length: number; name: string };

// From the above two sets, which set is bigger?
// The correct answer is: T1 is the bigger set.

/*
Earlier, we learned about property-based sets.

When we add more properties to a type, the set becomes smaller because
more conditions must be satisfied.

Therefore, T1 represents a bigger set.

Think of it this way: if we're trying to satisfy the properties of these sets,
there is a much higher chance that any JavaScript value has a `length` property.
So, the T1 set contains more possible values.

On the other hand, T2 requires both `length` and `name`.
Since it has more conditions, fewer values can satisfy it,
making the resulting set smaller.
*/

// const obj1: T1 = {
//     length: 50,
//     age: 22 // Adding an extra property here causes an error because of Excess Property Checking.
// }

// This is called structural type checking.
// It bypasses Excess Property Checking while still ensuring that all required properties exist.
const a = {
  length: 60,
  age: 22,
};

const obj1: T1 = a; // Valid because Excess Property Checking is not applied here.

type Person1 = { name: string };
type Person2 = { name: string; age: number; city: "Pune" };

// Person1 says that any value containing `name: string` can belong to this set.
// Therefore, Person1 is a much bigger set.
//
// On the other hand, Person2 has more required properties (more conditions in Set Theory).
// Since more conditions must be satisfied, its resulting set is naturally smaller than Person1.

// As we know, T1 accepts any JavaScript value that has a `length` property.
//
// That's why a string is assignable to T1 because strings have a `length` property.
//
// This means the T1 set contains all JavaScript values that have a `length` property.

// const obj2: T1 = "hi";
// const obj2: T1 = []; // Valid because arrays also have a `length` property.

const obj2: T1 = function () {}; // Functions also have a `length` property, which returns the number of declared parameters.

const obj3: T2 = function () {}; // Functions also have a `name` property, which returns the function's name.

console.log(obj2.length); // Valid JavaScript.

// When we define a type in TypeScript, it simply checks whether
// the JavaScript value contains the required properties.

// const obj3: T1 = 2; // Not assignable because numbers do not have a `length` property.

type T3 = { toString(): string };

// All of these JavaScript values have a `toString()` method.
const t1: T3 = {};
const t2: T3 = [];
const t3: T3 = false;
const t4: T3 = 2;

// When we define a type using curly braces `{}`,
// it does not necessarily represent an object.
//
// Instead, it represents any JavaScript value that contains
// the specified properties or methods.

type T0 = {};

// const t: T0 = true; // Valid
// const t: T0 = 0; // Valid
// const t: T0 = {}; // Valid
// const t: T0 = []; // Valid

// const t: T0 = null; // Invalid because `null` and `undefined` represent the absence of a value.
// They don't contain any properties, and accessing properties on them results in a runtime error.

const t: T0 = true;

// console.log(t.test); // `undefined` (no runtime error)
