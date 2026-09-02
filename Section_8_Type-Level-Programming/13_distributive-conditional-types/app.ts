
// ============================================================
// 1. Distributive Conditional Types
// ============================================================

// A distributive conditional type applies the conditional check
// independently to each member of a union and then unions
// all the resulting types together.

type Test<T> = T extends string ? never : T;

type Test2 = Test<string | number | boolean | undefined>;
// type Test2 = number | boolean | undefined


/*
Conceptually, TypeScript distributes the union like this:

Test<string>      -> never
Test<number>      -> number
Test<boolean>     -> boolean
Test<undefined>   -> undefined

So:

Test2
= never | number | boolean | undefined

Since `never` contributes nothing to a union:

never | number | boolean | undefined
= number | boolean | undefined
*/


// ============================================================
// 2. How to Disable Distributive Behavior
// ============================================================

// A conditional type becomes distributive when the type parameter
// is "naked" on the left side of `extends`:
//
// T extends string ? ... : ...
//
// We can prevent distribution by wrapping T in a tuple.

type Distributive<T> = [T] extends [string] ? never : T;

type DistriUnion =
  Distributive<string | number | boolean | undefined>;

// Here the entire union is checked as one type.
//
// [string | number | boolean | undefined] extends [string]
// -> false
//
// Therefore the false branch is returned:
//
// string | number | boolean | undefined


// ============================================================
// 3. Distributive Conditional Types with `boolean`
// ============================================================

type Check<T> = T extends true ? "Yes" : "No";

type V = boolean extends true ? "Yes" : "No";
// type V = "No"

type V1 = never extends true ? "Yes" : "No";
// type V1 = "Yes"


// However, when `boolean` is passed through a distributive
// conditional type, TypeScript produces both possible results.

type X = Check<boolean>;
// type X = "No" | "Yes"

type Y = Check<never>;
// type Y = never


/*
Why does Check<boolean> become "Yes" | "No"?

Conceptually, `boolean` represents the two possible boolean
values: `true` and `false`.

So TypeScript can evaluate the conditional for both possibilities:

Check<true>
-> true extends true
-> "Yes"

Check<false>
-> false extends true
-> "No"

Therefore:

Check<boolean>
= "Yes" | "No"


IMPORTANT:

This does NOT mean that TypeScript literally rewrites
`boolean` into `true | false` in every situation.

For example:

boolean extends true ? "Yes" : "No"
-> "No"

The `"Yes" | "No"` result happens because `Check<T>` is a
distributive conditional type and `boolean` can produce both
possible boolean outcomes.
*/


// ============================================================
// 4. How `never` behaves
// ============================================================

/*
There is an important difference between:

never extends true ? "Yes" : "No"

and:

Check<never>


The first one is NOT being distributed because there is no
type parameter involved:

never extends true ? "Yes" : "No"
-> "Yes"


But `Check<never>` uses a distributive conditional type:

type Check<T> = T extends true ? "Yes" : "No";

When T = never, there are no union members to distribute over.

So:

Check<never>
-> never


Think of it as:

Check<A | B>
-> Check<A> | Check<B>

But:

Check<never>
-> there is nothing to distribute
-> never
*/


// ============================================================
// 5. `extends {}` and `unknown`
// ============================================================

type Z<T> = T extends {} ? "Yes" : "No";

type Z2 = Z<[] | {} | undefined>;
// type Z2 = "Yes" | "No"


/*
Distribution happens:

Z<[]>
-> [] extends {}
-> "Yes"

Z<{}>
-> {} extends {}
-> "Yes"

Z<undefined>
-> undefined extends {}
-> "No"

Therefore:

"Yes" | "Yes" | "No"
= "Yes" | "No"
*/


type Z3 = Z<[] | {} | unknown>;
// type Z3 = "No"


/*
Because `unknown` is part of the union:

Z<[]>
-> "Yes"

Z<{}>
-> "Yes"

Z<unknown>
-> unknown extends {}
-> "No"

So we might initially expect:

"Yes" | "No"

However, `unknown` absorbs the union:

[] | {} | unknown
= unknown

Therefore:

Z<unknown>
-> unknown extends {}
-> "No"
*/


// ============================================================
// 6. Actual Use #1: Filtering Out Strings
// ============================================================

type FilterStrings<T> = T extends string ? T : never;

type Result = FilterStrings<string | number | undefined>;
// type Result = string


/*
Distribution:

FilterStrings<string>
-> string extends string ? string : never
-> string

FilterStrings<number>
-> number extends string ? number : never
-> never

FilterStrings<undefined>
-> undefined extends string ? undefined : never
-> never


Therefore:

string | never | never
= string
*/


// ============================================================
// 7. Actual Use #2: Removing a Type
// ============================================================

// Remove all string types from a union.

type RemoveTypeString<T> = T extends string ? never : T;

type WithoutString =
  RemoveTypeString<string | number | boolean>;

// type WithoutString = number | boolean


/*
Distribution:

string  -> never
number  -> number
boolean -> boolean

Result:

never | number | boolean
= number | boolean
*/


// ============================================================
// 8. Actual Use #3: Transforming Every Type
// ============================================================

// Transform every member of a union into an object.

type TransformType<T> = T extends any ? { value: T } : never;

type TransformResult =
  TransformType<number | string | undefined>;


/*
Distribution:

TransformType<number>
-> { value: number }

TransformType<string>
-> { value: string }

TransformType<undefined>
-> { value: undefined }


Final result:

type TransformResult =
  | { value: number }
  | { value: string }
  | { value: undefined }
*/


// ============================================================
// 9. How to Disable Distributive Behavior
// ============================================================

// Wrapping the type parameter in a tuple prevents distribution.
//
// The type parameter is no longer "naked":
//
// [T] extends [string]
//       ↑
//     wrapped

type V2<T> = [T] extends [string] ? "Yes" : "No";

type V2Result = V2<boolean>;
// type V2Result = "No"


/*
Here TypeScript checks the entire type as one unit:

[boolean] extends [string]
-> false
-> "No"


Compare:

// Distributive
type A<T> = T extends string ? "Yes" : "No";

// Non-distributive
type B<T> = [T] extends [string] ? "Yes" : "No";


The tuple prevents TypeScript from distributing the union.
*/


// ============================================================
// KEY RULE TO REMEMBER
// ============================================================

/*
Distributive Conditional Type:

type Test<T> = T extends X ? A : B;

When T is a naked type parameter and we pass a union:

Test<A | B | C>

TypeScript conceptually does:

Test<A> | Test<B> | Test<C>

Then it evaluates each member independently and unions
all the results together.

To disable distribution:

[T] extends [X]

Now the entire union is checked as one type.
*/
```
