/* =============================================================================
                                ARRAYS IN TYPESCRIPT
============================================================================= */

/*
--------------------------------------------------------------------------------
UNION OF ARRAYS (|)
--------------------------------------------------------------------------------

type T1 = number[];
type T2 = string[];

type T3 = T1 | T2;

Meaning:
--------
An array must be assignable to at least ONE member type.

In other words:
- It can be a complete number[]
OR
- It can be a complete string[]

This creates a HOMOGENEOUS array.

Examples:
*/

type T1 = number[];
type T2 = string[];

type T3 = T1 | T2;

const arr1: T3 = [1, 2, 3]; // ✔ number[]
const arr2: T3 = ["1", "2", "3"]; // ✔ string[]

/*
Not Allowed:
*/

const arr3: T3 = [1, 2, "3"];

/*
Error:

Type '(number | string)[]' is not assignable to
'type number[] | string[]'.

Reason:
-------
The array is neither

number[]

nor

string[]

It is actually

(number | string)[]

which is a completely different type.
*/

/*
If you want an array that can contain BOTH numbers and strings,
write:
*/

const arr4: (number | string)[] = [1, "2", 3, "4"];

/*
(number[] | string[])
---------------------------------
Homogeneous Array

The ENTIRE array is either:
- number[]
OR
- string[]


(number | string)[]
---------------------------------
Heterogeneous Array

Each individual element may be:
- number
OR
- string
*/

/*
--------------------------------------------------------------------------------
INTERSECTION OF ARRAYS (&)
--------------------------------------------------------------------------------

type T3 = number[] & string[];

Meaning:
--------
An array must be assignable to BOTH

number[]

AND

string[]

simultaneously.

Question:
---------
Can a value be both

number

AND

string ?

No.

number & string = never

Therefore,

number[] & string[]

becomes

never[]

(i.e. an array whose elements are of type never)

Examples:
*/

type T5 = number[] & string[];

const empty: T5 = []; // ✔ Valid (empty array satisfies never[])
/*
Only values of type 'never' can exist inside the array.

Since no actual value has type never,
you cannot store numbers or strings.
*/

// let a: never;
// let b: never;

// const arr5: T5 = [a!, b!];

/*
The non-null assertion (!) is only used above to silence definite
assignment checks. The variables are still of type 'never'.
*/

/*
--------------------------------------------------------------------------------
INTERSECTION WITH OBJECT TYPES
--------------------------------------------------------------------------------

Arrays are objects in JavaScript.

Therefore they can be intersected with object types.

Example:
*/

type Numbers = number[] & {
  test: "testing";
};

/*
Meaning:

The value must satisfy BOTH:

1. It must be a number[].
2. It must also contain the property

test: "testing"
*/

const nums = [1, 2, 3] as Numbers;

nums.test; // ✔ "testing"
nums.push(4); // ✔ Array methods still work

/* =============================================================================
                            FUNCTION TYPES IN TYPESCRIPT
============================================================================= */

/*
A function type represents the set of all functions having
a particular call signature.

Example:
*/

type F1 = (a: number) => number;
type F2 = (a: string) => string;

/*
--------------------------------------------------------------------------------
UNION OF FUNCTION TYPES (|)
--------------------------------------------------------------------------------

type F = F1 | F2

Meaning:
--------
A value must be assignable to AT LEAST ONE function type.

So the value may be

(number) => number

OR

(string) => string

TypeScript does not know which one it actually is.

Therefore, calling the function is only allowed when the
arguments are safe for EVERY possible function.

Example:

declare const fn: F;

fn(10);      // ❌ Unsafe
fn("hi");    // ❌ Unsafe

Reason:
-------
If fn is actually F2,
passing a number is invalid.

If fn is actually F1,
passing a string is invalid.

So TypeScript refuses both calls.
*/

/*
--------------------------------------------------------------------------------
INTERSECTION OF FUNCTION TYPES (&)
--------------------------------------------------------------------------------

type F = F1 & F2

Meaning:
--------
A value must be assignable to BOTH function types
simultaneously.

Therefore the function must support BOTH call signatures.

This behaves similarly to function overloading.

Equivalent idea:

(number) => number

AND

(string) => string

↓

A function callable with BOTH signatures.
*/

type Both = F1 & F2;

/*
Example implementation:
*/

function identity(a: number): number;
function identity(a: string): string;
function identity(a: number | string) {
  return a;
}

/*
This satisfies both call signatures.
*/

/*
--------------------------------------------------------------------------------
SUMMARY
--------------------------------------------------------------------------------

ARRAYS

number[] | string[]
---------------------------------
Entire array is either:
✔ number[]
OR
✔ string[]

(number | string)[]
---------------------------------
Each element is either:
✔ number
OR
✔ string

number[] & string[]
---------------------------------
Element type becomes

number & string

↓

never

↓

never[]


FUNCTIONS

(number)=>number | (string)=>string
-----------------------------------
A value may be either function.

Safe calls are limited because TypeScript
doesn't know which function it actually is.

(number)=>number & (string)=>string
-----------------------------------
A value must satisfy BOTH call signatures.

Behaves like an overloaded function.


Golden Rule
-----------

Object Types
------------
Union (|)
→ At least one object type must be satisfied.

Intersection (&)
→ Every object type must be satisfied.


Function Types
--------------
Union (|)
→ At least one call signature.

Intersection (&)
→ Every call signature.


Array Types
-----------
number[] | string[]
→ Entire array is one type.

(number | string)[]
→ Individual elements may differ.

number[] & string[]
→ never[]
*/
