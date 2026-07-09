/**
 * ============================================================================
 * TYPESCRIPT: UNION (|) vs INTERSECTION (&) — with structural typing notes
 * ============================================================================
 */

type T0 = {};
type T1 = { length: number };
type T2 = { length: number; name: string };
type T3 = { toString(): string };

/**
 * T4 = T0 | T1
 * -----------------------------------------------------------------------
 * Intuition says T4 should just be `{}` (since {} is the "biggest" set),
 * but hovering shows:
 *
 *   type T4 = {} | { length: number }
 *
 * Meaning: a value is valid for T4 if it's assignable to EITHER {} OR
 * { length: number }. Since literally anything is assignable to {},
 * any object works here.
 *
 * const obj: T4 = { age: 40 }; // valid
 */

type T4 = T1 | T2;

/**
 * T4 = T1 | T2
 * -----------------------------------------------------------------------
 * You'd expect the union to just "become" T1 (the larger/looser set),
 * but hovering shows both members preserved:
 *
 *   type T4 = { length: number } | { length: number; name: string }
 *
 * This means: a value assignable to T1 OR assignable to T2 is valid for T4.
 */

const obj: T4 = { length: 40, name: "Varun" }; // valid — matches T2 shape

// NOTE: You could NOT assign this same object directly annotated as T1,
// because T1 doesn't declare a `name` property... except structural typing
// allows it anyway (see below).

const a = {
  length: 40,
  name: "Varun",
};

// Structural typing: `a` has AT LEAST the properties T1 requires,
// so it's assignable to T1 even though T1 doesn't mention `name`.
const obj2: T1 = a;

// Since `a` is assignable to T1 (a member of the T4 union), it's also
// assignable to T4.
const obj3: T4 = a;

/**
 * T5 = T1 & T2
 * -----------------------------------------------------------------------
 * Intersection combines the REQUIRED properties of both types.
 * Since T2 is already "T1 + name", the intersection is effectively T2:
 *
 *   { length: number; name: string }
 *
 * Only values with BOTH `length` and `name` satisfy T5.
 */

type T5 = T1 & T2;

// const b = { length: 40, name: "John" }; // would also work

// Functions have a built-in `.length` (arity) and `.name` property,
// so a plain function structurally satisfies T5 too.
const b = function () {};
const obj4: T5 = b;

/**
 * T6 = T2 & T3
 * -----------------------------------------------------------------------
 * T3 = { toString(): string }
 *
 * Every plain JS object inherits `toString()` from Object.prototype,
 * so ANY object literal satisfying T2 automatically satisfies T3 as well
 * — IntelliSense won't complain even though `toString` isn't explicitly
 * declared.
 */

type T6 = T2 & T3;

const obj6: T6 = {
  length: 5,
  name: "Varun",
  // toString() is inherited from Object.prototype — no error here
};

/**
 * ============================================================================
 * CORE MENTAL MODEL
 * ============================================================================
 *
 * type T1 = { length: number };
 * type T2 = { length: number; name: string };
 *
 * ----------------------------------------------------------------------------
 * UNION (T1 | T2) — "must satisfy AT LEAST ONE type"
 * ----------------------------------------------------------------------------
 * Valid values:
 *   { length: 10 }                  ✔ satisfies T1
 *   { length: 10, name: "Varun" }   ✔ satisfies T2
 *
 * When you access properties on a variable typed T1 | T2, TypeScript only
 * guarantees properties present in EVERY member of the union:
 *
 *   Guaranteed:     ✔ length
 *   Not guaranteed: ✘ name   (a T1 value might not have it)
 *
 * Editor note: When building an object literal for a union type, VS Code
 * may still suggest properties from ALL members (e.g. `name`). These are
 * just suggestions to help you complete any valid member of the union —
 * they are NOT guaranteed to exist on every union value.
 *
 * ----------------------------------------------------------------------------
 * INTERSECTION (T1 & T2) — "must satisfy BOTH types simultaneously"
 * ----------------------------------------------------------------------------
 * Valid value:
 *   { length: 10, name: "Varun" }   ✔ satisfies T1 AND T2
 *
 * TypeScript guarantees ALL required properties from BOTH types:
 *
 *   Guaranteed: ✔ length
 *   Guaranteed: ✔ name
 *
 * Editor note: While building an object literal for an intersection type,
 * IntelliSense will require properties from every intersected type, since
 * the object must satisfy all of them at once.
 *
 * ============================================================================
 * WHY THIS HAPPENS — from the "Everyday TypeScript" documentation
 * ============================================================================
 * A union of types can *feel* like it has the intersection of those types'
 * properties — and that's not an accident. The term "union" comes from set
 * theory: `number | string` is the union of the values from each type.
 *
 * Given two sets with facts about each, only the facts common to BOTH sets
 * apply to their union. Analogy: a room of tall people wearing hats, and a
 * room of Spanish speakers wearing hats — once combined, the only fact true
 * of everyone is that they're wearing a hat.
 *
 * ============================================================================
 * A BIGGER EXAMPLE: Person1 & Person2
 * ============================================================================
 */

type Person1 = {
  name: string;
  age: number;
  password: string;
};

type Person2 = {
  name: string;
  age: number;
  email: string;
  city: string;
};

type Person = Person1 & Person2;

// const o1: Person1 = {
//   name: "Varun",
//   age: 22,
//   password: "123",
// };

const o = {
  name: "Varun",
  age: 22,
  password: "123",
  city: "Pune",
  email: "v@gmail.com",
};

// Person = Person1 & Person2, so a value must have EVERY required
// property from BOTH types: name, age, password, city, email.
const o1: Person = o;

/**
 * Person1 | Person2  → guarantees only the properties common to both:
 *   name: string
 *   age: number
 *
 * Person1 & Person2  → guarantees every property from both:
 *   name, age, password, city, email   (5 total)
 *
 * Why? Union = "value could be either shape" → TS only trusts what's
 * common to all shapes. Intersection = "value must be both shapes at
 * once" → TS trusts every requirement from every shape.
 *
 * const obj: Person1 | Person2 = {}; // invalid — must satisfy at least one fully
 *
 * ----------------------------------------------------------------------------
 * PLAIN-ENGLISH SUMMARY
 * ----------------------------------------------------------------------------
 * - OR  → union (|)         → value satisfies AT LEAST ONE member type
 * - AND → intersection (&)  → value satisfies ALL member types at once
 *
 * - A union only guarantees properties common to every member (since TS
 *   doesn't know which member the value actually is).
 * - An intersection guarantees every required property from every member.
 *
 * Rule of thumb:
 *   Union of types      → intersection of guaranteed properties
 *   Intersection of types → union of guaranteed properties
 *//**
 * ============================================================================
 * TYPESCRIPT: UNION (|) vs INTERSECTION (&) — with structural typing notes
 * ============================================================================
 */

type T0 = {};
type T1 = { length: number };
type T2 = { length: number; name: string };
type T3 = { toString(): string };

/**
 * T4 = T0 | T1
 * -----------------------------------------------------------------------
 * Intuition says T4 should just be `{}` (since {} is the "biggest" set),
 * but hovering shows:
 *
 *   type T4 = {} | { length: number }
 *
 * Meaning: a value is valid for T4 if it's assignable to EITHER {} OR
 * { length: number }. Since literally anything is assignable to {},
 * any object works here.
 *
 * const obj: T4 = { age: 40 }; // valid
 */

type T4 = T1 | T2;

/**
 * T4 = T1 | T2
 * -----------------------------------------------------------------------
 * You'd expect the union to just "become" T1 (the larger/looser set),
 * but hovering shows both members preserved:
 *
 *   type T4 = { length: number } | { length: number; name: string }
 *
 * This means: a value assignable to T1 OR assignable to T2 is valid for T4.
 */

const obj: T4 = { length: 40, name: "Varun" }; // valid — matches T2 shape

// NOTE: You could NOT assign this same object directly annotated as T1,
// because T1 doesn't declare a `name` property... except structural typing
// allows it anyway (see below).

const a = {
  length: 40,
  name: "Varun",
};

// Structural typing: `a` has AT LEAST the properties T1 requires,
// so it's assignable to T1 even though T1 doesn't mention `name`.
const obj2: T1 = a;

// Since `a` is assignable to T1 (a member of the T4 union), it's also
// assignable to T4.
const obj3: T4 = a;

/**
 * T5 = T1 & T2
 * -----------------------------------------------------------------------
 * Intersection combines the REQUIRED properties of both types.
 * Since T2 is already "T1 + name", the intersection is effectively T2:
 *
 *   { length: number; name: string }
 *
 * Only values with BOTH `length` and `name` satisfy T5.
 */

type T5 = T1 & T2;

// const b = { length: 40, name: "John" }; // would also work

// Functions have a built-in `.length` (arity) and `.name` property,
// so a plain function structurally satisfies T5 too.
const b = function () {};
const obj4: T5 = b;

/**
 * T6 = T2 & T3
 * -----------------------------------------------------------------------
 * T3 = { toString(): string }
 *
 * Every plain JS object inherits `toString()` from Object.prototype,
 * so ANY object literal satisfying T2 automatically satisfies T3 as well
 * — IntelliSense won't complain even though `toString` isn't explicitly
 * declared.
 */

type T6 = T2 & T3;

const obj6: T6 = {
  length: 5,
  name: "Varun",
  // toString() is inherited from Object.prototype — no error here
};

/**
 * ============================================================================
 * CORE MENTAL MODEL
 * ============================================================================
 *
 * type T1 = { length: number };
 * type T2 = { length: number; name: string };
 *
 * ----------------------------------------------------------------------------
 * UNION (T1 | T2) — "must satisfy AT LEAST ONE type"
 * ----------------------------------------------------------------------------
 * Valid values:
 *   { length: 10 }                  ✔ satisfies T1
 *   { length: 10, name: "Varun" }   ✔ satisfies T2
 *
 * When you access properties on a variable typed T1 | T2, TypeScript only
 * guarantees properties present in EVERY member of the union:
 *
 *   Guaranteed:     ✔ length
 *   Not guaranteed: ✘ name   (a T1 value might not have it)
 *
 * Editor note: When building an object literal for a union type, VS Code
 * may still suggest properties from ALL members (e.g. `name`). These are
 * just suggestions to help you complete any valid member of the union —
 * they are NOT guaranteed to exist on every union value.
 *
 * ----------------------------------------------------------------------------
 * INTERSECTION (T1 & T2) — "must satisfy BOTH types simultaneously"
 * ----------------------------------------------------------------------------
 * Valid value:
 *   { length: 10, name: "Varun" }   ✔ satisfies T1 AND T2
 *
 * TypeScript guarantees ALL required properties from BOTH types:
 *
 *   Guaranteed: ✔ length
 *   Guaranteed: ✔ name
 *
 * Editor note: While building an object literal for an intersection type,
 * IntelliSense will require properties from every intersected type, since
 * the object must satisfy all of them at once.
 *
 * ============================================================================
 * WHY THIS HAPPENS — from the "Everyday TypeScript" documentation
 * ============================================================================
 * A union of types can *feel* like it has the intersection of those types'
 * properties — and that's not an accident. The term "union" comes from set
 * theory: `number | string` is the union of the values from each type.
 *
 * Given two sets with facts about each, only the facts common to BOTH sets
 * apply to their union. Analogy: a room of tall people wearing hats, and a
 * room of Spanish speakers wearing hats — once combined, the only fact true
 * of everyone is that they're wearing a hat.
 *
 * ============================================================================
 * A BIGGER EXAMPLE: Person1 & Person2
 * ============================================================================
 */

type Person1 = {
  name: string;
  age: number;
  password: string;
};

type Person2 = {
  name: string;
  age: number;
  email: string;
  city: string;
};

type Person = Person1 & Person2;

// const o1: Person1 = {
//   name: "Varun",
//   age: 22,
//   password: "123",
// };

const o = {
  name: "Varun",
  age: 22,
  password: "123",
  city: "Pune",
  email: "v@gmail.com",
};

// Person = Person1 & Person2, so a value must have EVERY required
// property from BOTH types: name, age, password, city, email.
const o1: Person = o;

/**
 * Person1 | Person2  → guarantees only the properties common to both:
 *   name: string
 *   age: number
 *
 * Person1 & Person2  → guarantees every property from both:
 *   name, age, password, city, email   (5 total)
 *
 * Why? Union = "value could be either shape" → TS only trusts what's
 * common to all shapes. Intersection = "value must be both shapes at
 * once" → TS trusts every requirement from every shape.
 *
 * const obj: Person1 | Person2 = {}; // invalid — must satisfy at least one fully
 *
 * ----------------------------------------------------------------------------
 * SUMMARY
 * ----------------------------------------------------------------------------
 * - OR  → union (|)         → value satisfies AT LEAST ONE member type
 * - AND → intersection (&)  → value satisfies ALL member types at once
 *
 * - A union only guarantees properties common to every member (since TS
 *   doesn't know which member the value actually is).
 * - An intersection guarantees every required property from every member.
 *
 * Rule of thumb:
 *   Union of types      → intersection of guaranteed properties
 *   Intersection of types → union of guaranteed properties
 */