/**
 * ==============================================================================
 * TYPESCRIPT GENERICS - PRACTICAL IMPLEMENTATIONS
 * ==============================================================================
 *
 * This file demonstrates how Generics can be used to build reusable,
 * type-safe utility functions similar to JavaScript's built-in methods.
 *
 * ------------------------------------------------------------------------------
 * CONTENTS
 * ------------------------------------------------------------------------------
 * 1. Generic Object Merge
 * 2. Generic Map Function
 * 3. Generic Filter Function
 *
 * ------------------------------------------------------------------------------
 * WHY GENERICS?
 * ------------------------------------------------------------------------------
 *
 * Imagine writing the same function multiple times:
 *
 * mergeNumberObjects()
 * mergeStringObjects()
 * mergeUserObjects()
 * mergeEmployeeObjects()
 *
 * Instead of creating separate versions for every type,
 * Generics allow us to write ONE reusable function that works
 * with ANY type while preserving complete type safety.
 *
 * Generics are represented using placeholders like:
 *
 *      <T>
 *      <U>
 *      <K>
 *
 * These placeholders are replaced by actual types
 * when the function is called.
 *
 * Example:
 *
 *      myFunc<number>()
 *      myFunc<string>()
 *      myFunc<User>()
 *
 * ============================================================================
 */

/* =============================================================================
   1. GENERIC OBJECT MERGE
   ============================================================================= */

/**
 * Merges two objects together.
 *
 * -----------------------------------------------------------------------------
 * Generic Parameters
 * -----------------------------------------------------------------------------
 *
 * T -> Type of first object
 * U -> Type of second object
 *
 * Return Type
 * -----------------------------------------------------------------------------
 *
 * T & U
 *
 * '&' means Intersection Type.
 *
 * The returned object contains ALL properties from
 * both T and U.
 *
 * Example:
 *
 * T = { name: string }
 *
 * U = { age: number }
 *
 * Returned Type:
 *
 * {
 *    name: string;
 *    age: number;
 * }
 *
 * -----------------------------------------------------------------------------
 * Flow
 * -----------------------------------------------------------------------------
 *
 * Step 1:
 * Receive first object
 *
 * Step 2:
 * Receive second object
 *
 * Step 3:
 * Spread both objects into a new object
 *
 * Step 4:
 * Return the merged object
 */

function mergeObjects<T, U>(a: T, b: U): T & U {
  return {
    ...a,
    ...b,
  };
}

/**
 * Type Inference
 *
 * TypeScript automatically infers:
 *
 * T = { name: string }
 *
 * U = { age: number }
 */

const result = mergeObjects({ name: "Varun" }, { age: 22 });

/*
result becomes

{
    name: "Varun",
    age: 22
}

Type:

{
    name: string;
    age: number;
}
*/

/* =============================================================================
   2. GENERIC MAP IMPLEMENTATION
   ============================================================================= */

function myFunc<T, U>(arr: T[], cb: (a: T) => U): U[] {
  let result: U[] = [];

  for (let item of arr) {
    result.push(cb(item));
  }

  return result;
}

const doubledNumbers = myFunc<number, number>(
  [1, 2, 3, 4],
  (value) => value * 2,
);

console.log(doubledNumbers);

/**
 * ==============================================================================
 * Explanation
 * ==============================================================================
 *
 * myFunc() is a generic implementation of JavaScript's built-in Array.map().
 * It transforms every element of an array into a new value using a callback
 * function and returns a new array containing those transformed values.
 *
 * ------------------------------------------------------------------------------
 * Understanding the Generics
 * ------------------------------------------------------------------------------
 *
 * T -> Represents the type of the input array elements.
 * U -> Represents the type returned by the callback function.
 *
 * Since the callback can return a completely different type, we use two generic
 * parameters instead of one.
 *
 * ------------------------------------------------------------------------------
 * Flow
 * ------------------------------------------------------------------------------
 *
 * Step 1:
 * The function receives an array of type T[] and a callback function.
 *
 * Step 2:
 * An empty array of type U[] is created to store transformed values.
 *
 * Step 3:
 * Every element of the input array is passed to the callback.
 *
 * Step 4:
 * The callback returns a value of type U.
 *
 * Step 5:
 * That returned value is pushed into the result array.
 *
 * Step 6:
 * After processing all elements, the transformed array is returned.
 *
 * ------------------------------------------------------------------------------
 * Example
 * ------------------------------------------------------------------------------
 *
 * Input:
 *      [1, 2, 3, 4]
 *
 * Callback:
 *      value => value * 2
 *
 * Execution:
 *
 *      1 -> 2
 *      2 -> 4
 *      3 -> 6
 *      4 -> 8
 *
 * Output:
 *      [2, 4, 6, 8]
 *
 * ------------------------------------------------------------------------------
 * Why Two Generics?
 * ------------------------------------------------------------------------------
 *
 * Input Type (T):
 *      number
 *
 * Output Type (U):
 *      number
 *
 * But they don't have to be the same.
 *
 * Example:
 *
 * myFunc<number, string>(
 *      [1,2,3],
 *      value => `Number: ${value}`
 * )
 *
 * Result:
 *      ["Number: 1", "Number: 2", "Number: 3"]
 *
 * Here,
 *      T = number
 *      U = string
 */



/* =============================================================================
   3. GENERIC FILTER IMPLEMENTATION
   ============================================================================= */

function myFilter<T>(arr: T[], callbackFn: (item: T) => boolean): T[] {
  let result: T[] = [];

  for (let item of arr) {
    if (callbackFn(item)) {
      result.push(item);
    }
  }

  return result;
}

const filteredArray = myFilter<number>(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  (value) => value % 2 === 0,
);

console.log(filteredArray);

/**
 * ==============================================================================
 * Explanation
 * ==============================================================================
 *
 * myFilter() is a generic implementation of JavaScript's built-in
 * Array.filter(). Unlike map(), filter() does not transform elements.
 * It simply decides whether an element should remain in the final array.
 *
 * ------------------------------------------------------------------------------
 * Understanding the Generic
 * ------------------------------------------------------------------------------
 *
 * T represents the type of elements inside the array.
 *
 * Only one generic is required because filtering never changes the data type.
 *
 * Input:
 *      T[]
 *
 * Output:
 *      T[]
 *
 * ------------------------------------------------------------------------------
 * Understanding the Callback
 * ------------------------------------------------------------------------------
 *
 * The callback receives one element at a time and returns a boolean.
 *
 * true  -> Keep the element.
 * false -> Discard the element.
 *
 * ------------------------------------------------------------------------------
 * Flow
 * ------------------------------------------------------------------------------
 *
 * Step 1:
 * Receive the input array.
 *
 * Step 2:
 * Create an empty array to store the filtered elements.
 *
 * Step 3:
 * Visit every element of the array.
 *
 * Step 4:
 * Execute the callback.
 *
 * Step 5:
 * If the callback returns true, store that element.
 *
 * Step 6:
 * If it returns false, ignore the element.
 *
 * Step 7:
 * Return the filtered array.
 *
 * ------------------------------------------------------------------------------
 * Example
 * ------------------------------------------------------------------------------
 *
 * Input:
 *      [1,2,3,4,5,6,7,8,9,10]
 *
 * Callback:
 *      value => value % 2 === 0
 *
 * Evaluation:
 *
 *      1 -> false
 *      2 -> true
 *      3 -> false
 *      4 -> true
 *      ...
 *
 * Output:
 *
 *      [2,4,6,8,10]
 *
 * ------------------------------------------------------------------------------
 * Difference Between map() and filter()
 * ------------------------------------------------------------------------------
 *
 * map()
 * -----
 * Transforms every element into a new value.
 *
 * Example:
 *      [1,2,3] -> [2,4,6]
 *
 *
 * filter()
 * --------
 * Keeps or removes elements based on a condition.
 *
 * Example:
 *      [1,2,3,4] -> [2,4]
 */