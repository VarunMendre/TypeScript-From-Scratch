// 1. Basic Typed Rest Parameters
// Enforces all arguments to be strings
function demoString(...myParams: string[]): void {
  console.log("String Rest:", myParams);
}

// 2. Rest Parameters with Mixed Types (using unknown or any)
// 'unknown' is safer than 'any' as it requires type checking before use
function demoMixed(a: number, b?: string, ...myParams: unknown[]): void {
  console.log("Mixed Rest:", { a, b, others: myParams });
}

// 3. Rest Parameters as Tuples
// Enforces exact order and types: [string, number, boolean]
function demoTuple(...myParams: [string, number, boolean]): void {
  console.log("Tuple Rest:", myParams);
}

// 4. Named Tuple Rest Parameters
// Same as above, but arguments are named for better documentation
function demoNamedTuple(
  ...myParams: [name: string, age: number, isActive: boolean]
): void {
  console.log("Named Tuple Rest:", myParams);
}

// 5. Rest Parameters with Union Types
// Enforces that every argument must be either a string or a number
function demoUnion(...rest: (string | number)[]): void {
  console.log("Union Rest:", rest);
}

// 6. Rest Parameters in Function Types
// Defines a function signature that accepts rest parameters
type Logger = (...message: (string | number)[]) => void;

const log: Logger = (...rest) => {
  console.log("Logger Type:", rest);
};

// --- Execution Examples ---

// Valid calls
demoString("1", "2", "3");
demoMixed(1, "Hii", 5, "Bye", false, undefined, null);
demoTuple("Hi", 1, false);
demoNamedTuple("Alice", 30, true);
demoUnion("Varun", 22, "Developer");
log("System", 404, "Error");

// Invalid calls (Uncomment to see TypeScript errors)
// demoString(1, 2, 3); // Error: numbers not assignable to string[]
// demoUnion(false);    // Error: boolean not assignable to string | number
// demoTuple("Hi", false, 1); // Error: Order/Type mismatch
// log("Varun", false); // Error: boolean not assignable to string | number
