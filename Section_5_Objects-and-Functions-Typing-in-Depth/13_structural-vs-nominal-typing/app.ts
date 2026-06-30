/**
 * TypeScript Structural Typing & Excess Property Checks Demo
 * 
 * Key Concepts:
 * 1. Structural Typing: TypeScript checks if an object has the required structure (properties), 
 *    not if it matches a specific named type (Nominal Typing).
 * 2. Excess Property Checks: A specific safety mechanism that only triggers when assigning 
 *    object literals directly to a typed variable or parameter.
 * 3. The `{}` Type: Represents any non-nullish value (excluding null and undefined).
 */

// 1. Interface Definitions
// 'User' requires both 'name' and 'age'
interface User {
    name: string;
    age: number;
}

// 'Employee' only requires 'name'. 
// Due to structural typing, any object with at least a 'name' property can be assigned to this.
interface Employee {
    name: string;
}

// 2. Variable Declaration (Inferred Type)
// 'obj' is inferred to have properties: { name: string, age: number, email: string }
const obj = {
    name: "Varun",
    age: 20,
    email: "varun@gmail.com"
};

// 3. Excess Property Checks (The "Freshness" Check)
// -----------------------------------------------------------------------------
// CASE A: Direct Assignment (Triggers Excess Property Check)
// If we uncomment the line below, TypeScript will throw an ERROR:
// "Object literal may only specify known properties, and 'email' does not exist in type 'User'."
// This is a safety feature to prevent typos when creating objects on the fly.
//
// const userDirect: User = {
//     name: "Varun",
//     age: 20,
//     email: "varun@gmail.com" // Error: 'email' is an excess property
// };

// CASE B: Indirect Assignment (No Excess Property Check)
// When assigning a variable (like 'obj') that was previously defined, TypeScript only checks
// if it meets the *minimum* requirements (structural compatibility). It ignores extra properties.
const user: User = obj; // ✅ Valid: 'obj' has 'name' and 'age'. Extra 'email' is ignored.

// Valid direct assignment (no excess properties)
const userLiteral: User = {
    name: "Varun",
    age: 32
};

// 4. Structural Typing (Width Compatibility)
// -----------------------------------------------------------------------------
// TypeScript allows assigning a "wider" object (more properties) to a "narrower" type
// as long as the required properties match.
// 'user' has { name, age }. 'Employee' needs { name }.
// Since 'user' has at least 'name', the assignment is valid.
const emp: Employee = user; // ✅ Valid: Structural compatibility confirmed.

// This demonstrates Structural Typing:
// Unlike nominal languages (Java/C#) where types must have the exact same name/inheritance,
// TS only cares about the shape of the data.

// 5. Function Parameters & Excess Property Checks
// -----------------------------------------------------------------------------
function logEmployee(x: Employee) {
    console.log(x);
}

// CASE A: Passing Object Literal Directly
// Triggers Excess Property Check. 'age' is not in 'Employee', so this throws an error.
// logEmployee({ name: "John", age: 25 }); 
// ❌ Error: Object literal may only specify known properties, and 'age' does not exist in type 'Employee'.

// CASE B: Passing a Variable
// We assign the literal to a variable first. The excess check is skipped during assignment 
// (since the variable has no explicit type restriction yet), and only structural check 
// happens when passing to the function.
const demoObj = { name: "Jane", age: 22 }; 
logEmployee(demoObj); // ✅ Valid: 'demoObj' has at least the required 'name' property.

// 6. The `{}` Type (Empty Object Type)
// -----------------------------------------------------------------------------
// In TypeScript, `{}` does NOT mean "an object with no properties".
// It means "any non-nullish value". It excludes only `null` and `undefined`.
// This is why primitives (string, number, boolean) and functions are assignable to it.

const test1: {} = 9;            // ✅ Valid (number is non-nullish)
const test2: {} = "Hi";         // ✅ Valid (string is non-nullish)
const test3: {} = false;        // ✅ Valid (boolean is non-nullish)
const test4: {} = [];           // ✅ Valid (array is an object/non-nullish)
const test5: {} = function () { }; // ✅ Valid (function is an object/non-nullish)
const test6: {} = /a/;          // ✅ Valid (regex is an object/non-nullish)

// These fail because `null` and `undefined` are explicitly excluded from `{}`
// const test7: {} = undefined; // ❌ Error: Type 'undefined' is not assignable to type '{}'
// const test8: {} = null;      // ❌ Error: Type 'null' is not assignable to type '{}'

// Note: If you want to strictly type an object with NO properties, use:
// type Empty = Record<PropertyKey, never>;   