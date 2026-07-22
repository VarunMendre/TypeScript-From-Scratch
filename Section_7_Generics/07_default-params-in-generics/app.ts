/*
|--------------------------------------------------------------------------
| Generic Default Type Parameters
|--------------------------------------------------------------------------
|
| Normally, whenever we create a generic type, TypeScript expects us to
| provide the type argument while using it.
|
| Example:
|   type Box<T> = T;
|
| If we don't pass T, TypeScript throws an error because it doesn't know
| what type should replace T.
|
| To solve this, TypeScript allows us to provide a DEFAULT TYPE.
| If the user doesn't specify a type argument, TypeScript automatically
| uses the default one.
|
| Syntax:
|   <T = DefaultType>
|
| Explicitly passing a type argument always overrides the default.
|
*/

type DynamicType<T> = T[];

let Darray1: DynamicType<string> = ["1", "2", "3"]; // ✅ T becomes string

// const Darray2: DynamicType<> = [];
// ❌ Error:
// Generic type 'DynamicType' requires 1 type argument(s)
// because no default type was provided.


// -------------------------------------------------------------------------
// Providing a default generic type
// -------------------------------------------------------------------------

type DynamicType2<T = string> = T[];

/*
  Here we've assigned a default type to T.

  Meaning:
  If no type argument is supplied,
  TypeScript automatically replaces T with string.
*/

let D2array1: DynamicType2 = [];
// Same as:
let D2array2: DynamicType2<string> = [];


// -------------------------------------------------------------------------
// Rule: Required generic parameters cannot appear after optional ones
// -------------------------------------------------------------------------

// type DynamicType3<T = number, U> = T & U;

/*
  ❌ Error:
  Required type parameters may not follow optional type parameters.

  Why?

  Once a generic has a default value, it becomes OPTIONAL.

  So after making T optional,
  every generic parameter that comes after it
  must also be optional (must have a default value).
*/


// -------------------------------------------------------------------------
// Both generic parameters have default values
// -------------------------------------------------------------------------

type DynamicType4<T = number[], U = string[]> = T | U;

/*
  Default values:
    T -> number[]
    U -> string[]

  Final default type:
    number[] | string[]
*/

let D4Array: DynamicType4 = [];

/*
  Since we didn't provide any generic arguments,
  TypeScript uses both default types.

  Type of D4Array:
    number[] | string[]
*/


// -------------------------------------------------------------------------
// We can still override default generic types
// -------------------------------------------------------------------------

let D5Array: DynamicType4<boolean, unknown> = [];

/*
  Here the defaults are completely ignored.

  T -> boolean
  U -> unknown

  Final type:
    boolean | unknown

  Since:
    boolean | unknown  => unknown

  Therefore D5Array is inferred as:
    unknown
*/


// -------------------------------------------------------------------------
// Default generics also work with interfaces
// -------------------------------------------------------------------------

interface DynamicType5<
  T = string,
  U = number,
  V = string[]
> {
  name: T;
  age: U;
  favPlaces: V;
}

/*
  Default types:

  name      -> string
  age       -> number
  favPlaces -> string[]
*/

const obj1: DynamicType5 = {
  name: "Varun",
  age: 22,
  favPlaces: [
    "Pune",
    "Ireland",
    "Switzerland",
    "Netherland",
    "",
  ],
};

/*
  Since no generic arguments were supplied,
  TypeScript automatically used:

  DynamicType5<string, number, string[]>
*/


// -------------------------------------------------------------------------
// Default generics with functions
// -------------------------------------------------------------------------

function greet<T = number>(name: T): string {
  return `Hello, ${name};`;
}

/*
  Default type:
    T -> number

  But default types are only used
  when TypeScript cannot infer T.
*/

greet<string>("Varun");

/*
  Here we explicitly passed string.

  So:
    T = string

  The default (number) is ignored.
*/


// -------------------------------------------------------------------------
// Why doesn't the default generic get used here?
// -------------------------------------------------------------------------

// function echo<T>(para: T) {
//   return para;
// }

// const result = echo();

/*
  ❌ Error

  Even though T could have had a default,
  the function requires one argument.

  Since no argument was supplied,
  TypeScript cannot infer T,
  and the function call itself is invalid.

  (If T had a default but the parameter was still required,
  calling echo() without an argument would still fail because
  the missing function argument is the real problem.)
*/


// -------------------------------------------------------------------------
// Making the parameter optional
// -------------------------------------------------------------------------

function echo<T = string>(para?: T) {
  return para;
}

/*
  Now two things happen:

  1. The function parameter is optional,
     so calling echo() is valid.

  2. Since no generic argument was supplied,
     TypeScript uses the default:
       T -> string
*/

const result = echo();

/*
  Type of result:

    string | undefined

  Why?

  T becomes string,
  but because the parameter is optional,
  para may not exist.

  Therefore the return type becomes:

    string | undefined
*/