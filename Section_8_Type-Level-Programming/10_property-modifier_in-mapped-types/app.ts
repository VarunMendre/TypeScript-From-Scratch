/**
 * Base interface with an optional property.
 */
type User = {
  name: string;
  age: number;
  password?: string; // Optional property
};

// -----------------------------------------------------------------------------
// 1. Removing Optionality (-?)
// -----------------------------------------------------------------------------

/**
 * T1 forces all properties from User to be required.
 * 
 * Syntax: [K in keyof Type]-?
 * The '-?' modifier explicitly removes the optional (?) flag.
 * Without this, mapped types preserve the original optionality.
 */
type T1 = {
  [K in keyof User]-?: User[K];
};

// Resulting Type T1:
// {
//   name: string;
//   age: number;
//   password: string; // Now required
// }

// -----------------------------------------------------------------------------
// 2. Adding Readonly (+readonly)
// -----------------------------------------------------------------------------

type User1 = {
  name: string;
  age: number;
  readonly password: string; // Already readonly
};

/**
 * T2 forces ALL properties to be readonly.
 * 
 * Syntax: readonly [K in keyof Type]
 * Placing 'readonly' before the key iteration adds the modifier to every property.
 * It overrides existing mutability, making even 'name' and 'age' immutable.
 */
type T2 = {
  readonly [K in keyof User1]: User1[K];
};

// Resulting Type T2:
// {
//   readonly name: string;
//   readonly age: number;
//   readonly password: string;
// }

// -----------------------------------------------------------------------------
// 3. Removing Readonly (-readonly)
// -----------------------------------------------------------------------------

type User2 = {
  name: string;
  age: number;
  readonly password: string;
};

/**
 * T3 removes the readonly modifier from all properties.
 * 
 * Syntax: -readonly [K in keyof Type]
 * The '-readonly' prefix strips immutability, making all properties writable.
 * This is useful for creating mutable drafts of frozen state objects.
 */
type T3 = {
  -readonly [K in keyof User2]: User2[K];
};

// Resulting Type T3:
// {
//   name: string;
//   age: number;
//   password: string; // Now writable
// }

// -----------------------------------------------------------------------------
// 4. Generic Utility Pattern
// -----------------------------------------------------------------------------

/**
 * A reusable generic utility type that makes all properties of T readonly.
 * This mimics the built-in 'Readonly<T>' utility type.
 * 
 * @template T - The input type to transform.   