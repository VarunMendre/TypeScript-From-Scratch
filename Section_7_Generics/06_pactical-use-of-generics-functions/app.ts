/* =============================================================================
   1. GENERIC OBJECT MERGE
   ============================================================================= */

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

/**
 * ==============================================================================
 * Explanation
 * ==============================================================================
 *
 * <T, U>
 * Here we declare two Generic Type Parameters.
 *
 * i. T
 *    - Represents the type of the first object.
 *    - Parameter 'a' is of type T because it can be any object.
 *
 * ii. U
 *    - Represents the type of the second object.
 *    - Parameter 'b' is of type U because it can also be any object.
 *
 * Return Type -> T & U
 *
 * '&' (Intersection Type) combines both object types.
 *
 * Since we are merging object 'a' and object 'b',
 * the returned object contains all properties of T
 * as well as all properties of U.
 *
 * Example:
 *
 * T = { name: string }
 * U = { age: number }
 *
 * Return Type:
 *
 * {
 *   name: string;
 *   age: number;
 * }
 *
 * This makes mergeObjects reusable because it works with
 * any two object types while preserving complete type safety.
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
 * <T, U>
 * Here we define two Generic Type Parameters.
 *
 * i. T
 *    - Represents the type of the input array.
 *    - Since 'arr' is written as T[], every element inside
 *      the array is of type T.
 *
 * ii. U
 *    - Represents the type of the transformed value.
 *    - After the callback manipulates an element of type T,
 *      it may produce a completely different type.
 *    - Therefore, the result array stores elements of type U,
 *      making its type U[].
 *
 * Function Parameters
 *
 * arr: T[]
 *    - Input array whose every element is of type T.
 *
 * cb: (a: T) => U
 *    - 'a' is of type T because it represents one element
 *      taken from the input array T[].
 *    - You can think of 'a' as one instance (or one element)
 *      of the generic type T.
 *    - The callback performs some operation on 'a'
 *      and returns a new value of type U.
 *
 * Inside the Loop
 *
 * for (let item of arr)
 *
 *    item is automatically of type T because it comes from T[].
 *
 * cb(item)
 *
 *    - item (T) is passed to the callback.
 *    - The callback transforms T into U.
 *    - The returned value is therefore of type U.
 *
 * result.push(cb(item))
 *
 *    - Since cb(item) returns U,
 *      we push it into result, which is declared as U[].
 *
 * Return Type
 *
 * return result;
 *
 * Since result contains values of type U,
 * the function returns U[].
 *
 * This is exactly how JavaScript's map() works—
 * it transforms one type into another.
 *
 * Example:
 *
 * number[]  ----map---->  string[]
 * User[]    ----map---->  UserDTO[]
 * Product[] ----map---->  JSX.Element[]
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
 * <T>
 * Here we declare only one Generic Type Parameter.
 *
 * Why only one?
 *
 * Unlike map(), filter() does not transform one type into another.
 * It simply decides whether an existing element should be kept
 * or removed.
 *
 * Therefore, the input type and the output type remain the same.
 *
 * Function Parameters
 *
 * arr: T[]
 *    - Input array whose every element is of type T.
 *
 * callbackFn: (item: T) => boolean
 *    - 'item' is of type T because it represents one element
 *      from the input array.
 *    - The callback does not change the element.
 *    - It only returns true or false.
 *
 *      true  -> Keep the element.
 *      false -> Ignore the element.
 *
 * Inside the Loop
 *
 * for (let item of arr)
 *
 *    item is of type T.
 *
 * if (callbackFn(item))
 *
 *    The callback checks whether the element satisfies
 *    a particular condition.
 *
 * result.push(item)
 *
 *    Since the original item itself is pushed into result
 *    (without any modification),
 *    result also remains of type T[].
 *
 * Return Type
 *
 * return result;
 *
 * The returned array contains only selected elements,
 * but every element is still of type T.
 *
 * Example:
 *
 * number[] ----filter----> number[]
 * User[]   ----filter----> User[]
 * Product[]----filter----> Product[]
 *
 * The number of elements may change,
 * but the type of each element never changes.
 */
