/**
 * TYPE SAFETY DEMONSTRATION
 *
 * The 'object' type in TypeScript refers to any non-primitive value (anything that is
 * not string, number, boolean, symbol, null, or undefined).
 *
 * WHY AVOID 'object'?
 * 1. ❌ No Property Access: You cannot access properties (e.g., obj.name) without errors.
 * 2. ❌ Loss of IntelliSense: Editors cannot suggest properties or methods.
 * 3. ❌ Too Broad: It accepts arrays, functions, dates, and regexes indiscriminately.
 *
 * BEST PRACTICE:
 * Always use specific types (interfaces, type aliases, or built-in types) to describe
 * the exact shape of your data.
 */

// ✅ CORRECT: Specific Object Literal Type
// Describes exactly what properties exist and their types.
const obj1: { name: string; age: number } = {
  name: "Varun",
  age: 22,
};
// Now you can safely access properties: console.log(obj1.name);

// ✅ CORRECT: Specific Array Type
// Use T[] or Array<T> instead of 'object'.
const obj2: number[] = [];

// ✅ CORRECT: Specific Built-in Class Type
// Use the class name directly (Date, RegExp, Map, etc.).
const obj3: Date = new Date();

// ✅ CORRECT: Empty Object with Defined Shape
// If empty now, define the expected future shape via an interface.
interface EmptyObj {
  // Add expected properties here later
}
const obj4: EmptyObj = {};

// ✅ CORRECT: Specific Function Type
// Describes arguments and return type (void means returns nothing).
const obj5: () => void = function () {};

// ✅ CORRECT: Specific RegExp Type
const obj6: RegExp = /a/;

/**
 * ALTERNATIVE: Using Interfaces for Reusability
 * Interfaces are preferred for complex object shapes.
 */
interface Person {
  name: string;
  age: number;
}

// Using the interface ensures consistency
const personObj: Person = {
  name: "Varun",
  age: 22,
};

/**
 * WHEN TO USE 'object'?
 * Rarely. It is mostly used in generic constraints where you only care
 * that a value is non-primitive, but don't care about its specific shape.
 *
 * Example: function logId<T extends object>(arg: T) { ... }
 */
