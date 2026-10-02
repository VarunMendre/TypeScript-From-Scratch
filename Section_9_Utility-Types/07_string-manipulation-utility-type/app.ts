// String Manipulation Utility Types

type A = Uppercase<"hello">; // "HELLO"
type B = Lowercase<"WORLD">; // "world"
type C = Capitalize<"typescript">; // "Typescript"
type D = Uncapitalize<"JavaScript">; // "javaScript"


type MyCapitalize<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S;

/* Explanation : 
    - The `MyCapitalize` type takes a string literal type `S` as input.
    - It uses a conditional type to check if `S` can be split into a first character (`First`) and the rest of the string (`Rest`).
    - If it can, it constructs a new string by converting the first character to uppercase using `Uppercase<First>` and concatenating it with the rest of the string (`Rest`).
    - If `S` is an empty string, it simply returns `S`.
*/

type MyUncapitalize<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Lowercase<First>}${Rest}`
  : S;

  /** Explanation : 
    - The `MyUncapitalize` type takes a string literal type `S` as input.
    - It uses a conditional type to check if `S` can be split into a first character (`First`) and the rest of the string (`Rest`).
    - If it can, it constructs a new string by converting the first character to lowercase using `Lowercase<First>` and concatenating it with the rest of the string (`Rest`).
    - If `S` is an empty string, it simply returns `S`.
*/


// note we cant implement Upper case and Lowercase as they are built-in utility types in TypeScript and cannot be redefined.
//  However, we can create our own versions of these utility types if needed, but they would not be as efficient or optimized as the built-in ones.