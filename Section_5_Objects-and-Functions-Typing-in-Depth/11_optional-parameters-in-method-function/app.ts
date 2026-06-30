/**
 * --- SCENARIO 1: Basic Optional Parameters ---
 * Using the '?' operator makes a parameter optional.
 * If omitted, the value becomes 'undefined'.
 * Type inside function: (parameter) name: string | undefined
 */
function greetOptional(name?: string) {
  // Must handle undefined case (e.g., using || or ??)
  console.log("Hii, I'm ", name || "");
}

greetOptional("Varun"); // Passes "Varun"
greetOptional(); // Passes undefined -> logs "Hii, I'm "

/**
 * --- SCENARIO 2: Default Parameters (ES6+) ---
 * Preferred when you have a sensible fallback value.
 * The parameter type inside the function is just 'string' (not undefined).
 * No need for '?' operator when using defaults.
 */
function greetDefault(name: string = "") {
  // 'name' is guaranteed to be a string here
  console.log("Hii, I'm ", name);
}

greetDefault(); // Uses default "" -> logs "Hii, I'm "

/**
 * --- RULE: Parameter Ordering ---
 * Required parameters MUST come before optional/default parameters.
 * TypeScript enforces this to avoid ambiguity in argument mapping.
 */
// ✅ Correct: Required (name1) then Optional (name2)
function greetOrder(name1: string, name2?: string) {
  console.log("Hii, I'm ", name1, name2 || "");
}

// ❌ Incorrect: (name1?: string, name2: string) would cause a compile error.

/**
 * --- SCENARIO 3: The "Options Object" Pattern ---
 * Trick to make "first" arguments optional: Wrap them in an object.
 * This avoids the ordering restriction and scales better for many options.
 */
interface Names {
  name1?: string; // Optional property
  name2?: string; // Optional property
  name3: string; // Required property
}

// Define a function type that takes the 'Names' object
type Greet = (name: Names) => void;

// Implement the function using destructuring
const greet: Greet = function ({ name1, name2, name3 }: Names) {
  // name1 and name2 might be undefined; name3 is guaranteed string
  console.log(`Hii, ${name1 || "Guest"}`);
  console.log(`How are u? ${name3}`);
};

// Usage: Can skip 'name1' entirely because it's optional in the interface
greet({ name2: "John", name3: "mama" });

/**
 * --- SCENARIO 4: Optional Methods in Interfaces ---
 * Methods inside interfaces can also have optional parameters.
 */
interface Obj {
  name: string;
  age: number;
  // 'age' parameter in greet method is optional
  greet(name: string, age?: number): void;
}

const obj: Obj = {
  name: "Varun",
  age: 22,
  // Implementation must match signature.
  // 'age' is inferred as 'number | undefined'
  greet(name, age) {
    console.log(`Hello ${name}, age: ${age ?? "unknown"}`);
  },
};
