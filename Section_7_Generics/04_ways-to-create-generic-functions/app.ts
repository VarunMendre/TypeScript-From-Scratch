/**
 * Generic Function Declaration
 * Defines a function that accepts an argument of any type T and returns the same type.
 * The type T is inferred at the time of the function call.
 */
function greet<T>(name: T): T {
  return name;
}

// Generic Function Expression
// Functionally identical to the declaration above, but assigned to a variable.
const greet1 = function <T>(a: T): T {
  return a;
};

// Generic Arrow Function
// Concise syntax for a generic function. The type parameter <T> precedes the arguments.
const greet2 = <T>(a: T): T => {
  return a;
};

/**
 * Generic Type Alias
 * Defines a reusable type for a generic function.
 * The <T> is part of the call signature, allowing the implementing function to be generic.
 */
type GreetType = <T>(a: T) => T;

/**
 * Generic Interface (Call Signature)
 * Defines an interface with a generic call signature.
 * This allows objects/functions implementing this interface to be generic.
 */
interface GreetInterface {
  <T>(a: T): T;
}

// Implementation using Type Alias
// The generic type <T> is inferred when greet3 is called.
const greet3: GreetType = function (a) {
  return a;
};

// Implementation using Interface
// The generic type <T> is inferred when greet4 is called.
const greet4: GreetInterface = function (a) {
  return a;
};

// Usage Example
// T is inferred as 'boolean' here.
const result = greet4(true);

/**
 * Generic Interface (Type Parameter on Interface)
 *
 * Correction: our original example `interface BaseInterface<T> { (a: T): T }`
 * is actually VALID in TypeScript, provided you supply the type argument when using it.
 *
 * Difference:
 * - GreetInterface: The function itself is generic (caller chooses T per call).
 * - BaseInterface<T>: The interface is generic (implementer chooses T once for the whole object).
 */
interface BaseInterface<T> {
  (a: T): T;
}

// Valid usage of BaseInterface: You must specify the type <T> when creating the variable.
const greet5: BaseInterface<string> = function (a) {
  return a;
};
// greet5("hello"); // OK
// greet5(123);     // Error: Type 'number' is not assignable to type 'string'.
