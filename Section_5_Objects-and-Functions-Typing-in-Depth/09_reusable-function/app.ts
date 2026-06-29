/**
 * Defines a callable type using a type alias.
 * This specifies a function that takes two numbers and returns a number.
 *
 * Usage: Any function assigned to this type must match this signature.
 */
type MathOperation = (a: number, b: number) => number;

/**
 * Demonstrates TypeScript's structural typing for functions.
 *
 * Note: TypeScript allows functions with fewer parameters than the type definition
 * as long as the provided parameters match types. Extra parameters in the type
 * are ignored if the implementation doesn't use them. This is why a function
 * taking zero arguments is valid here, though it may lead to runtime issues
 * if called with arguments expecting a calculation.
 */
const add: MathOperation = function (): number {
  return 5; // Valid due to structural typing, but logically inconsistent for addition
};

const subtract: MathOperation = function (a: number, b: number): number {
  return a - b;
};

const divide: MathOperation = function (a: number, b: number): number {
  return a / b;
};

const multiply: MathOperation = function (a: number, b: number): number {
  return a * b;
};

/**
 * Defines a Union Type for specific string literals.
 * This restricts the input to exactly one of these three values.
 */
type FruitsOptions = "Banana" | "BlueBerry" | "Apple";

/**
 * Accepts only the specific fruit strings defined in FruitsOptions.
 * Passing any other string (e.g., "BlackBerry") will result in a compile-time error.
 *
 * @param fruit - The specific fruit name to print.
 * @returns The same fruit name.
 */
function printFruits(fruit: FruitsOptions): FruitsOptions {
  return fruit;
}

// --- Usage Examples ---

// Valid calls matching the Union Type
printFruits("Apple");
printFruits("Banana");
printFruits("BlueBerry");

// Invalid call (Uncommenting this line will cause a TypeScript error)
// printFruits("BlackBerry");
// Error: Argument of type '"BlackBerry"' is not assignable to parameter of type 'FruitsOptions'.
