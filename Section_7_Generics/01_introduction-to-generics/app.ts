/**
 * ==============================================================================
 * TYPESCRIPT GENERICS: DEFINITION & OVERVIEW
 * ==============================================================================
 *
 * Definition:
 * Generics in TypeScript are a mechanism that allows you to write reusable,
 * type-safe components (functions, classes, interfaces, or types) that can work
 * with a variety of data types rather than a single fixed one.
 *
 * Instead of hardcoding a specific type (like `string` or `number`), you define
 * a "type parameter" (commonly named `T`, but can be any valid identifier) that
 * acts as a placeholder. This placeholder is replaced with an actual type when
 * the component is used.
 *
 * Key Benefits:
 * 1. Reusability: Write logic once and use it with multiple types.
 * 2. Type Safety: The compiler enforces correct types at compile-time, preventing
 *    runtime errors while maintaining flexibility.
 * 3. Inference: TypeScript can often automatically deduce the type argument based
 *    on the input values, reducing the need for explicit type annotations.
 *
 * Syntax:
 * Type parameters are declared inside angle brackets `<T>` immediately after the
 * name of the function, class, interface, or type alias.
 */

// ------------------------------------------------------------------------------
// 1. BASIC GENERIC TYPE ALIAS
// ------------------------------------------------------------------------------

/**
 * DynamicType<T> is a generic type alias.
 *
 * - `T` is a type parameter (a placeholder).
 * - When you use `DynamicType`, you must provide a concrete type for `T`.
 * - In this example, `DynamicType<T>` resolves to an array of that type (`T[]`).
 *
 * @template T - The type of elements the array will hold.
 */
type DynamicType<T> = T[];

// Usage Examples:
// Here, `T` is inferred as `number`, so `a` becomes `number[]`.
let a: DynamicType<number> = [10, 20];

// Here, `T` is inferred as `string | number`, so `b` becomes `(string | number)[]`.
let b: DynamicType<string | number> = ["10", "20"];

// You can also explicitly pass a type. Here `T` is `{}`, so `o` becomes `{}[]`.
let o: DynamicType<{}>;

// ------------------------------------------------------------------------------
// 2. GENERIC OBJECT TYPES
// ------------------------------------------------------------------------------

/**
 * DynamicObject<T> defines an object structure with a single property `value`.
 * The type of `value` is determined by the generic parameter `T`.
 *
 * @template T - The type of the `value` property.
 */
type DynamicObject<T> = {
  value: T;
};

// Example Usage:
// We have an object `oj` with extra properties (`age`), but we assign it to
// `DynamicObject<string>`. TypeScript only cares that `oj` has a `value` property
// compatible with `string`. Excess properties like `age` are ignored in this
// structural assignment context (unless strict excess property checks apply).
const oj = {
  value: "Hello!",
  age: 22,
};

// `obj` expects a structure where `value` is a string.
const obj: DynamicObject<string> = oj;

// ------------------------------------------------------------------------------
// 3. GENERIC FUNCTIONS
// ------------------------------------------------------------------------------

/**
 * Swaps the values of two variables of the same type.
 *
 * - `<T>`: Declares a generic type parameter for the function scope.
 * - `(a: T, b: T)`: Ensures both arguments `a` and `b` must be of the SAME type `T`.
 * - `: [T, T]`: Returns a tuple containing two values of type `T`.
 *
 * Why Generics here?
 * Without generics, we would either have to use `any` (losing type safety) or
 * write separate functions for numbers, strings, etc. Generics allow one function
 * to handle all types while preserving the specific type information.
 *
 * @template T - The type of the values being swapped.
 * @param a - The first value.
 * @param b - The second value.
 * @returns A tuple containing the values in reversed order: [b, a].
 */
function swap<T>(a: T, b: T): [T, T] {
  return [b, a];
}

// Usage:
let first = "1";
let second = "2";

// TypeScript infers `T` as `string` based on the arguments.
// Destructuring assignment updates the original variables.
[first, second] = swap(first, second);

console.log(`first: ${first}, second: ${second}`);

// ------------------------------------------------------------------------------
// 4. GENERIC TUPLES
// ------------------------------------------------------------------------------

/**
 * Dynamic<T> defines a generic tuple type containing exactly one element of type `T`.
 *
 * @template T - The type of the single element in the tuple.
 */
type Dynamic<T> = [T];

// Usage:
// `t1` is a tuple that must contain exactly one element, which can be a string or number.
const t1: Dynamic<number | string> = ["2"];

// ------------------------------------------------------------------------------
// 5. REAL-WORLD EXAMPLE: GENERIC FORM DATA
// ------------------------------------------------------------------------------

/**
 * FormData<Data> is a generic interface/type for handling form state.
 *
 * - `isValid`: A boolean indicating form validity (fixed type).
 * - `data`: Holds the actual form values. Its type is dynamic and depends on
 *   the `Data` type parameter provided when using `FormData`.
 *
 * This pattern avoids creating separate types like `RegistrationFormState`,
 * `LoginFormState`, etc., for every form in your application.
 *
 * @template Data - The specific shape of the form data payload.
 */
type FormData<Data> = {
  isValid: boolean;
  data: Data;
};

// Define specific data shapes for different forms:
type RegistrationForm = {
  name: string;
  email: string;
  password: string;
};

type LoginForm = {
  email: string;
  password: string;
};

type CreatePostForm = {
  content: string;
};

// Usage:
// For registration, `Data` becomes `RegistrationForm`.
// The `data` property is now strictly typed to require `name`, `email`, and `password`.
const registrationForm: FormData<RegistrationForm> = {
  isValid: true,
  data: {
    name: "Varun",
    email: "varun@gmail.com",
    password: "varun223",
  },
};

// For login, `Data` becomes `LoginForm`.
// The `data` property now only requires `email` and `password`.
const loginForm: FormData<LoginForm> = {
  isValid: true,
  data: {
    email: "varun@gmail.com",
    password: "varun223",
  },
};

// This ensures type safety: if you try to access `registrationForm.data.name`
// on `loginForm`, TypeScript will throw an error because `LoginForm` has no `name`.

export {};
