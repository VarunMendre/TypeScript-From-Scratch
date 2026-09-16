// ======================================================
// 1. Deep Type Extractor
// Removes nested array levels until a non-array type remains
// ======================================================

type DeepTypeExtractor<T> = T extends (infer I)[]
  ? DeepTypeExtractor<I> // If T is an array, extract its element type and recurse
  : T; // If T is not an array, return it

type ArrayType1 = DeepTypeExtractor<string[][][]>;
// Result: string

/*
DeepTypeExtractor<string[][][]>
-> I: string[][]
-> DeepTypeExtractor<string[][]>

DeepTypeExtractor<string[][]>
-> I: string[]
-> DeepTypeExtractor<string[]>

DeepTypeExtractor<string[]>
-> I: string
-> DeepTypeExtractor<string>

DeepTypeExtractor<string>
-> string is NOT an array
-> return T
-> string
*/

/*
This would cause infinite recursion because both branches recurse.

type DeepTypeExtractor2<T> =
    T extends (infer I)[]
        ? DeepTypeExtractor2<I>
        : DeepTypeExtractor2<I>;

Error:
Type instantiation is excessively deep and possibly infinite.
*/

// ======================================================
// 2. infer with Promise
// ======================================================

// Extracts one Promise level
type P = Promise<Promise<"string">> extends Promise<infer I> ? I : never;

// Result:
// Promise<"string">

// ======================================================
// 3. Unwrap Nested Promises
// Recursively removes Promise layers
// ======================================================

type UnWrapPromise<T> =
  T extends Promise<infer Value>
    ? UnWrapPromise<Value> // Extract Promise value and recurse
    : T; // Stop when T is no longer a Promise

type PromiseResult = UnWrapPromise<
  Promise<
    Promise<{
      name: "Varun";
      age: 22;
    }>
  >
>;

// Result:
// {
//   name: "Varun";
//   age: 22;
// }

// ======================================================
// 4. Reverse an Array / Tuple
// ======================================================

type ReverseArray<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? [...ReverseArray<Rest>, First] // Reverse Rest first, then append First
  : []; // Empty tuple = base case

type Arr = ReverseArray<[1, 2, 3, 4]>;

// Result:
// [4, 3, 2, 1]

/*
ReverseArray<[1, 2, 3, 4]>
-> First: 1
-> Rest: [2, 3, 4]
-> [...ReverseArray<[2, 3, 4]>, 1]

ReverseArray<[2, 3, 4]>
-> First: 2
-> Rest: [3, 4]
-> [...ReverseArray<[3, 4]>, 2]

ReverseArray<[3, 4]>
-> First: 3
-> Rest: [4]
-> [...ReverseArray<[4]>, 3]

ReverseArray<[4]>
-> First: 4
-> Rest: []
-> [...ReverseArray<[]>, 4]

ReverseArray<[]>
-> [] does NOT match [infer First, ...infer Rest]
-> return []


Now recursion unwinds:

ReverseArray<[]>
-> []

ReverseArray<[4]>
-> [...[], 4]
-> [4]

ReverseArray<[3, 4]>
-> [...[4], 3]
-> [4, 3]

ReverseArray<[2, 3, 4]>
-> [...[4, 3], 2]
-> [4, 3, 2]

ReverseArray<[1, 2, 3, 4]>
-> [...[4, 3, 2], 1]
-> [4, 3, 2, 1]
*/

// Same idea in JavaScript

/*
function reverse([first, ...rest]) {
    return first !== undefined
        ? [...reverse(rest), first]
        : [];
}

console.log(reverse([1, 2, 3, 4, 5]));
*/

// ======================================================
// 5. Trim Left Spaces
// Removes spaces from the start of a string
// ======================================================

type TrimLeft<T extends string> = T extends ` ${infer Rest}`
  ? TrimLeft<Rest> // Remove one leading space and recurse
  : T;

type Trim1 = TrimLeft<"  Hello">;

// Result:
// "Hello"

// ======================================================
// 6. Trim Right Spaces
// Removes spaces from the end of a string
// ======================================================

type TrimRight<T extends string> = T extends `${infer Rest} `
  ? TrimRight<Rest> // Remove one trailing space and recurse
  : T;

type Trim2 = TrimRight<"Hello   ">;

// Result:
// "Hello"

// ======================================================
// 7. Trim Both Sides
// First trims right side, then left side
// ======================================================

type TrimAll<T extends string> = TrimLeft<TrimRight<T>>;

type Trim3 = TrimAll<"    Hello   ">;

// Result:
// "Hello"

// ======================================================
// 8. Replace Spaces with Underscores
// Finds one space, replaces it with "_", then processes the rest
// ======================================================

type ReplaceSpaces<S extends string> = S extends `${infer Left} ${infer Right}`
  ? `${Left}_${ReplaceSpaces<Right>}`
  : S;

type ReplaceResult = ReplaceSpaces<"Hello Im Varun Mendre">;

// Result:
// "Hello_Im_Varun_Mendre"
