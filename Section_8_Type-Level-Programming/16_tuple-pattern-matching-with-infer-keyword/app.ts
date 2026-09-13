// Combine two tuples using tuple spread
type A = [1, 2, 3];
type B = [4, 5, 6];
type Result = [...A, ...B]; // [1, 2, 3, 4, 5, 6]

// Extract tuple elements and use them in an object type
type T = ["Varun", 22] extends [infer Name, infer Age]
  ? { name: Name; age: Age }
  : never;

/*
type T = {
  name: "Varun";
  age: 22;
};
*/

// Extract the first element
type First = [1, 5, 6] extends [infer F, ...unknown[]] ? F : never; // 1

// Extract the second element
type Second = [1, 5, 6] extends [unknown, infer S, ...unknown[]] ? S : never; // 5

// Extract the last element
type Last = [1, 5, 6] extends [...unknown[], infer L] ? L : never; // 6

// Split a tuple into its first element and remaining elements
type HeadAndTail = [1, 2, 3, 4, 5] extends [infer Head, ...infer Tail]
  ? [Head, Tail]
  : never;
// [1, [2, 3, 4, 5]]

// Remove the first element
type RemoveFirst = ["Python", "Node.js", "Express.js"] extends [
  unknown,
  ...infer Rest,
]
  ? Rest
  : never;
// ["Node.js", "Express.js"]

// Move the last element to the beginning
type LastElementFirst = ["Python", "Node.js", "Express.js"] extends [
  ...infer Rest,
  infer Last,
]
  ? [Last, ...Rest]
  : never;
// ["Express.js", "Python", "Node.js"]

// Reusable type that extracts the first element of a two-item tuple
type FirstType<T> = T extends [infer Head, unknown] ? Head : never;

// Conditional types distribute over union members
type D = FirstType<[number, string] | [boolean, number]>;
// number | boolean

// [number, string]  -> number
// [boolean, number] -> boolean
