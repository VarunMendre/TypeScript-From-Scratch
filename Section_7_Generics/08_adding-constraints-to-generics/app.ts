/*
|--------------------------------------------------------------------------
| Generic Constraints (extends)
|--------------------------------------------------------------------------
|
| By default, a generic type parameter can represent ANY type.
|
| Example:
|   T can be:
|   - string
|   - number
|   - boolean
|   - object
|   - function
|   - array
|   - etc.
|
| Sometimes we don't want every possible type.
| We want T to satisfy a particular shape or inherit from another type.
|
| That's where Generic Constraints come in.
|
| Syntax:
|   <T extends SomeType>
|
| Read it as:
|   "T must be assignable to SomeType."
|
| or
|
|   "T must satisfy the structure of SomeType."
|
| The word "extends" here DOES NOT mean class inheritance.
| It simply means "assignable to" (structural compatibility).
|
*/

// -------------------------------------------------------------------------
// Without constraints
// -------------------------------------------------------------------------

type DType<T> = T;

/*
  Here T has no restrictions.

  Therefore T can be absolutely anything.

  Example:
    DType<string>
    DType<number>
    DType<boolean>
    DType<{}>
    DType<() => void>
    DType<[]>

  Everything is allowed.
*/

// -------------------------------------------------------------------------
// Adding a constraint
// -------------------------------------------------------------------------

type DObj<T extends { name: string }> = T;

/*
  Here we've restricted T.

  Now T is no longer "any type".

  Instead, T must be assignable to:

      {
        name: string
      }

  In other words,

  Whatever type replaces T MUST contain
  at least one property:

      name: string

  It may contain additional properties,
  and that's perfectly fine.
*/

// -------------------------------------------------------------------------
// Object with extra properties
// -------------------------------------------------------------------------

const dynamicObject1: DObj<{
  name: string;
  age: number;
}> = {
  name: "Varun",
  age: 22,
};

/*
  ✅ Valid

  Required structure:

      {
        name: string
      }

  Provided structure:

      {
        name: string;
        age: number;
      }

  Since it contains the required property (name),
  it satisfies the constraint.

  Think of it like this:

  Required:
      name

  Given:
      name + age

  Extra properties are always allowed when
  checking generic constraints.
*/

// -------------------------------------------------------------------------
// Functions are objects in JavaScript
// -------------------------------------------------------------------------

const dynamicObject2: DObj<{ name: string }> = function () {};

/*
  ✅ Valid

  This surprises many people.

  Why?

  Because in JavaScript,
  functions are objects.

  Every function object has built-in properties,
  including:

      name
      length
      prototype

  Example:

      function demo(a, b) {}

      demo.name
      // "demo"

      demo.length
      // 2

  Even an anonymous function expression is still
  represented as a function object that has a
  string-valued `name` property assigned by the
  JavaScript engine.

  Since the constraint only requires:

      {
        name: string
      }

  a function satisfies it.

  IMPORTANT:

  The reason is NOT because
  "{ name: string } is a superset."

  The real reason is:

  A function object structurally contains
  a compatible "name" property.
*/

// -------------------------------------------------------------------------
// Constraint using length
// -------------------------------------------------------------------------

type DObj2<T extends { length: number }> = T;

/*
  Now T must have:

      length: number
*/

let dynamicObject3: DObj2<{ length: number }> = "";

/*
  ✅ Valid

  Strings have:

      length: number
*/

let dynamicObject4: DObj2<{ length: number }> = function () {};

/*
  ✅ Valid

  Functions have a built-in:

      length

  which represents the number of declared parameters.
*/

let dynamicObject5: DObj2<{ length: number }> = [];

/*
  ✅ Valid

  Arrays also have:

      length: number
*/

// -------------------------------------------------------------------------
// Constraint using methods
// -------------------------------------------------------------------------

type HasToString = {
  toString(): string;
};

type DObj3<T extends HasToString> = T;

/*
  Now T must contain:

      toString(): string
*/

let dynamicObject6: HasToString = {};

/*
  ✅ Valid

  Even though {} appears empty,

  every normal object inherits toString()
  from Object.prototype.

  Therefore it satisfies HasToString.
*/

let dynamicObject7: HasToString = [];

/*
  ✅ Valid

  Arrays also inherit toString(),
  therefore they satisfy the constraint.
*/

// -------------------------------------------------------------------------
// Multiple required members
// -------------------------------------------------------------------------

type HasToLengthAndString = {
  toString(): string;
  length: number;
};

/*
  A valid type must now contain BOTH:

      length
      toString()
*/

// -------------------------------------------------------------------------
// Primitive constraint
// -------------------------------------------------------------------------

type Person1<T extends string> = T;

/*
  Read this as:

      T must be assignable to string.

  or

      T must be a subtype of string.

  Examples:

      "Hello"
      "ABC"

  are valid.

  number, boolean, etc.
  are not.
*/

// -------------------------------------------------------------------------
// Constraint using another object
// -------------------------------------------------------------------------

type Person<T extends HasToLengthAndString> = T;

let array1: Person<[]> = [];

/*
  ✅ Valid

  Arrays have:

      length

  and

      toString()

  Therefore they satisfy the constraint.
*/

// let array2: Person<{}> = {};

/*
  ❌ Invalid

  {} has toString()

  BUT

  it does NOT have:

      length

  Therefore the constraint is not satisfied.
*/

// -------------------------------------------------------------------------
// Generic constraint depending on another generic
// -------------------------------------------------------------------------

type HasNameAndLength = {
  length: number;
  name: string;
};

type DynamicFunc<T extends U, U> = T;

/*
  This is a dynamic constraint.

  Read it as:

      T must be assignable to U.

  Notice that U itself is generic.

  Instead of writing a fixed type,

      T extends { ... }

  we're saying

      T extends U

  so the constraint changes depending on
  whatever U becomes.
*/

let a: DynamicFunc<"hi", string>;

/*
  U becomes:

      string

  T becomes:

      "hi"

  Since

      "hi"

  is assignable to string,

  the constraint is satisfied.
*/

// let b: DynamicFunc<"hi", number>;

/*
  ❌ Invalid

  "hi"

  is NOT assignable to number.
*/

let c: DynamicFunc<() => void, HasNameAndLength>;

/*
  ✅ Valid

  Functions have:

      name
      length

  Therefore the function type satisfies
  HasNameAndLength.
*/

// -------------------------------------------------------------------------
// Constraints also work on functions
// -------------------------------------------------------------------------

type HasNameAndLength2 = {
  length: number;
  name: string;
};

// function print<T extends HasNameAndLength2>(a: T) {
//     return a;
// }

/*
  Here the parameter type T is restricted.

  Whatever argument is passed must satisfy:

      {
        length: number
        name: string
      }
*/

// print(() => {});
// ✅ Valid

/*
  Functions contain both:

      name
      length
*/

// print({
//     length: 2,
//     name: "Varun"
// });
// ✅ Valid

/*
  The object also satisfies
  the required structure.
*/

// -------------------------------------------------------------------------
// Dynamic generic constraints in functions
// -------------------------------------------------------------------------

function print<T extends U, U>(a: T) {
  return a;
}

/*
  Read this as:

      T must be assignable to U.

  Since U is generic,
  the constraint depends on
  the type supplied for U.
*/

print<() => void, HasNameAndLength2>(() => {});

/*
  T = () => void

  U = HasNameAndLength2

  Functions contain:

      name
      length

  Therefore this is valid.
*/

print<{ length: number; name: string }, HasNameAndLength2>({
  length: 2,
  name: "Varun",
});

/*
  T contains exactly the required members.

  Therefore it satisfies U
  and the call is valid.
*/
