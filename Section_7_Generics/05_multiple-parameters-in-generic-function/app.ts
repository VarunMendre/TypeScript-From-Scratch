/**
 * Dynamic Intersection Type
 * Combines two types T and U.
 *
 * Logic:
 * - If T and U have overlapping properties, the result is the intersection.
 * - If T and U are primitive types with no overlap (e.g., string & number),
 *   the result is 'never' because no value can be both a string and a number simultaneously.
 */
type DynamicType<T, U> = T & U;

// 'never' type: No value can satisfy being both a string AND a number.
let a1: DynamicType<string, number>; // Type: never

// 'A' is a subtype of string. Since "A" is a string, the intersection of string & "A" is just "A".
let a2: DynamicType<string, "A">; // Type: "A"

/**
 * Dynamic Array Type
 * Creates an array type where all elements must be of type T.
 */
type DynamicArray<T> = T[];

const arr1: DynamicArray<string> = ["A", "B", "C", "D"]; // Type: string[]
const arr2: DynamicArray<number> = [1, 2, 3, 4, 5]; // Type: number[]

/**
 * Dynamic Tuple Type
 * Creates a fixed-length array where specific positions have specific types.
 * Order matters: [Type1, Type2, Type3]
 */
type DynamicTuple<T, U, V> = [T, U, V];

// b is strictly typed as [string, number, number]
let b: DynamicTuple<string, number, number> = ["Varun", 22, 77];

/**
 * Dynamic Object Type
 * Constructs an object type with generic property values.
 */
type DynamicObject<T, U> = {
  name: T;
  age: U;
};

const obj1: DynamicObject<string, number> = {
  age: 22,
  name: "Varun",
};
// Type inferred: { name: string; age: number; }

/**
 * Dynamic Object with Generic Method
 * Combines generic properties with a generic method signature.
 * The method 'echo' accepts and returns a value of type V, independent of T and U.
 */
type DynamicMethod<T, U, V> = {
  name: T;
  age: U;
  echo(a: V): V;
};

const obj2: DynamicMethod<string, number, string> = {
  age: 22,
  name: "Varun",
  echo(a) {
    return a; // 'a' is inferred as string based on the generic <V> being set to string
  },
};

/*
 ** Final Type of obj2 **
 const obj2: {
   name: string;
   age: number;
   echo(a: string): string;
 }
 */

/**
 * Generic Tuple Swap Function
 * Accepts two arguments of potentially different types (T and U)
 * and returns them as a tuple with the order reversed: [U, T].
 */
function swapTuple<T, U>(a: T, b: U): [U, T] {
  return [b, a];
}

let f: number = 2;
let s: string = "4";

// Explicitly passing types <number, string>, though TypeScript could infer them automatically.
const [first, second] = swapTuple<number, string>(f, s);

// Output: { first: "4", second: 2 }
// 'first' receives 'b' (string), 'second' receives 'a' (number)
console.log({ first, second });

