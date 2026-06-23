# Section 4: Type Aliases, Literal Types and Type Assertions

## Table of Contents

- [Section 4.1 and Section 4.2](#section-41-and-section-42)
- [Section 4.3](#section-43)
- [Section 4.4](#section-44)
- [Section 4.5 and Section 4.6](#section-45-and-section-46)

## Section 4.1 and Section 4.2

### 1. Which keyword is used to create a Type Alias in TypeScript?

- A. `interface`
- B. `alias`
- C. `type`
- D. `typedef`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. `type`**

The `type` keyword is used to create a Type Alias.

```ts
type UserName = string;
```

</details>

---

### 2. What is the purpose of a Type Alias?

- A. To create runtime variables
- B. To create reusable type definitions
- C. To improve JavaScript performance
- D. To store data permanently

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. To create reusable type definitions**

Type aliases help avoid repeating complex types and improve readability.

```ts
type ID = string | number;
```

</details>

---

### 3. What will be the type of `userName`?

```ts
type Name = string;

let userName: Name = "Prashant";
```

- A. `Name`
- B. `string`
- C. `any`
- D. `unknown`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. `string`**

`Name` is simply an alias for `string`.

```ts
type Name = string;
let userName: Name = "Prashant";
```

</details>

---

### 4. Which statement about Type Aliases is true?

- A. They exist at runtime
- B. They are converted into JavaScript objects
- C. They only exist during TypeScript compilation
- D. They increase execution speed

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. They only exist during TypeScript compilation**

Type aliases are removed when TypeScript is compiled to JavaScript.

```ts
type Age = number;
```

Generated JS:

```js
let age = 25;
```

</details>

---

### 5. What is the type of `marks`?

```ts
type Score = number;

let marks: Score = 90;
```

- A. `Score`
- B. `number`
- C. `any`
- D. `unknown`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. `number`**

`Score` is just another name for `number`.

</details>

---

### 6. Which declaration correctly creates a Type Alias for an array of strings?

- A. `type Names = string[];`
- B. `type Names = [string];`
- C. `type Names = array<string>;`
- D. `type Names => string[];`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A. `type Names = string[];`**

```ts
type Names = string[];

let students: Names = ["A", "B"];
```

</details>

---

### 7. What does the following alias represent?

```ts
type Value = string | number;
```

- A. Only strings
- B. Only numbers
- C. Either string or number
- D. Array of strings and numbers

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. Either string or number**

A union type allows multiple possible types.

```ts
let value: Value = "Hello";
value = 100;
```

</details>

---

### 8. Which assignment is valid?

```ts
type Value = string | number;
```

- A. `let x: Value = true;`
- B. `let x: Value = {};`
- C. `let x: Value = 100;`
- D. `let x: Value = [];`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. `let x: Value = 100;`**

The alias only allows strings or numbers.

</details>

---

### 9. What does this alias represent?

```ts
type Data = (string | number)[];
```

- A. String only
- B. Number only
- C. Array containing strings or numbers
- D. String or number or array

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. Array containing strings or numbers**

```ts
let values: Data = ["A", 10, "B", 20];
```

</details>

---

### 10. What does this alias mean?

```ts
type Data = string | number[];
```

- A. Array containing strings and numbers
- B. String or array of numbers
- C. String array
- D. Number or string array

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. String or array of numbers**

```ts
let value1: Data = "Hello";
let value2: Data = [10, 20, 30];
```

</details>

---

### 11. Why are parentheses used here?

```ts
type Data = (string | number)[];
```

- A. Required to apply `[]` to the entire union
- B. Required by JavaScript
- C. Improve performance
- D. Create tuples

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A. Required to apply `[]` to the entire union**

Without parentheses the meaning changes.

```ts
type A = (string | number)[];
type B = string | number[];
```

These are different types.

</details>

---

### 12. Which value is valid?

```ts
type Data = (string | number | null)[];
```

- A. `[10, "A", null]`
- B. `[true, 10]`
- C. `[{}]`
- D. `[undefined]`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A. `[10, "A", null]`**

The array can contain strings, numbers, and null values.

</details>

---

### 13. Which alias is equivalent to `(string | number | null)[]`?

- A.

```ts
type Data = string | number | null[];
```

- B.

```ts
type Data = (string | number | null)[];
```

- C.

```ts
type Data = string[] | number[] | null;
```

- D.

```ts
type Data = string | (number | null[]);
```

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Parentheses ensure the array applies to the entire union.

</details>

---

### 14. What is allowed by this type?

```ts
type UserData = string | number | null;
```

- A. `"Prashant"`
- B. `99`
- C. `null`
- D. All of the above

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D. All of the above**

Union types allow all specified members.

</details>

---

### 15. Which declaration is valid?

```ts
type UserData = string | number | null;
```

- A. `let user: UserData = true;`
- B. `let user: UserData = "Prashant";`
- C. `let user: UserData = [];`
- D. `let user: UserData = {};`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Only string, number, or null are allowed.

</details>

---

### 16. Which formatting style is valid for multi-line aliases?

- A.

```ts
type Data = string | number | null;
```

- B.

```ts
type Data = string;
number;
null;
```

- C.

```ts
type Data = [string, number, null];
```

- D.

```ts
type Data =
    string |
    number |
    null |
```

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

This is a common formatting style for large union types.

</details>

---

### 17. Which statement is correct?

- A. Type aliases create JavaScript classes
- B. Type aliases create runtime objects
- C. Type aliases improve readability and reuse
- D. Type aliases store values

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Their primary purpose is readability and reusability.

</details>

---

### 18. What happens after TypeScript compilation?

```ts
type Age = number;

let age: Age = 25;
```

- A. `Age` remains in JavaScript
- B. `Age` becomes an object
- C. `Age` is removed
- D. Compilation fails

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. `Age` is removed**

Generated JS:

```js
let age = 25;
```

</details>

---

### 19. Which alias can be reused across multiple variables?

- A.

```ts
type UserData = string | number;
```

- B.

```ts
let UserData = string | number;
```

- C.

```ts
alias UserData = string | number;
```

- D.

```ts
typedef UserData = string | number;
```

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

Type aliases are reusable.

</details>

---

### 20. Which is the main advantage of Type Aliases?

- A. Faster execution
- B. Smaller JavaScript files
- C. Reusability and readability
- D. Automatic memory optimization

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Type aliases help avoid repeating complex types.

</details>

---

### 21. Create a Type Alias named `EmployeeID` that can store either a string or a number.

<details>

<summary>Expected Output</summary>

```ts
type EmployeeID = string | number;
```

</details>

---

### 22. Create a Type Alias named `MarksArray` that stores an array of numbers.

<details>

<summary>Expected Output</summary>

```ts
type MarksArray = number[];

let marks: MarksArray = [90, 95, 100];
```

## </details>

---

### 23. Create a Type Alias named `UserInfo` that allows:

- string
- number
- null

<details>

<summary>Expected Output</summary>

```ts
type UserInfo = string | number | null;
```

</details>

---

### 24. Create a Type Alias named `MixedArray` that represents an array containing:

- string
- number
- null

<details>

<summary>Expected Output</summary>

```ts
type MixedArray = (string | number | null)[];
```

## </details>

---

### 25. Fix the following code using a Type Alias.

```ts
let arr1: (string | number | null)[] = [];
let arr2: (string | number | null)[] = [];
let arr3: (string | number | null)[] = [];
```

<details>

<summary>Expected Output</summary>

```ts
type MixedData = (string | number | null)[];

let arr1: MixedData = [];
let arr2: MixedData = [];
let arr3: MixedData = [];
```

</details>

---

### 26. Create a Type Alias named `OptionalValue` that can store:

- string
- undefined
- null

<details>

<summary>Expected Output</summary>

```ts
type OptionalValue = string | undefined | null;
```

## </details>

---

### 27. Create a Type Alias named `StudentName` and use it in three variables.

<details>

<summary>Expected Output</summary>

```ts
type StudentName = string;

let s1: StudentName = "A";
let s2: StudentName = "B";
let s3: StudentName = "C";
```

## </details>

---

### 28. Create a Type Alias named `Score` and use it to store marks for five students.

<details>

<summary>Expected Output</summary>

```ts
type Score = number;

let s1: Score = 90;
let s2: Score = 80;
let s3: Score = 95;
let s4: Score = 88;
let s5: Score = 76;
```

</details>

---

### 29. Create a Type Alias that represents:

- string
- number
- boolean
- null

Then create an array using that alias.

<details>

<summary>Expected Output</summary>

```ts
type Data = string | number | boolean | null;

let values: Data[] = ["Prashant", 100, true, null];
```

## </details>

---

### 30. Explain the difference between these two aliases with examples.

```ts
type A = (string | number)[];
```

```ts
type B = string | number[];
```

<details>

<summary>Expected Output</summary>

```ts
type A = (string | number)[];

let a: A = ["A", 10, "B", 20];
```

A is an array whose elements can be string or number.

```ts
type B = string | number[];

let b1: B = "Hello";
let b2: B = [10, 20, 30];
```

B is either a string OR an array of numbers.

## </details>

## Section 4.3

### 1. What is a Literal Type in TypeScript?

- A. A type that can store any value
- B. A type that represents one specific value
- C. A type used only for arrays
- D. A type used only for objects

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. A type that represents one specific value**

Literal Types represent exact values rather than a group of values.

```ts
let age: 25 = 25;
```

Only `25` can be assigned.

</details>

---

### 2. Which assignment is valid?

```ts
let age: 32;
```

- A. `age = 25`
- B. `age = 32`
- C. `age = 100`
- D. `age = -32`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. `age = 32`**

The type itself is the value `32`.

```ts
let age: 32 = 32;
```

</details>

---

### 3. Which statement will compile successfully?

- A.

```ts
let name: "Prashant" = "prashant";
```

- B.

```ts
let name: "Prashant" = "Ankit";
```

- C.

```ts
let name: "Prashant" = "Prashant";
```

- D.

```ts
let name: "Prashant" = "PRASHANT";
```

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Literal Types are case-sensitive.

```ts
let name: "Prashant" = "Prashant";
```

</details>

---

### 4. What will TypeScript allow?

```ts
let status: "active";
```

- A. `status = true`
- B. `status = "inactive"`
- C. `status = "active"`
- D. `status = 1`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Only the exact literal value is allowed.

</details>

---

### 5. What is the type of the variable below?

```ts
let isAdmin: true = true;
```

- A. `boolean`
- B. `true`
- C. `false`
- D. `any`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. `true`**

The type is literally `true`, not `boolean`.

```ts
let isAdmin: true = true;
```

</details>

---

### 6. Which assignment is NOT allowed?

```ts
let value: "apple" | "banana";
```

- A. `value = "apple"`
- B. `value = "banana"`
- C. `value = "orange"`
- D. None of the above

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. `value = "orange"`**

Only values included in the union are allowed.

</details>

---

### 7. What is the purpose of Literal Types?

- A. To define fixed allowed values
- B. To increase JavaScript performance
- C. To create classes
- D. To create runtime constants

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

Literal Types are commonly used when only specific values are valid.

Example:

```ts
type Direction = "left" | "right" | "up" | "down";
```

</details>

---

### 8. What is the type of `direction`?

```ts
let direction: "left" | "right" = "left";
```

- A. `string`
- B. `"left"`
- C. `"left" | "right"`
- D. `any`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

The variable can store either `"left"` or `"right"`.

</details>

---

### 9. Which value can be assigned?

```ts
let data: "prashant" | 24 | null;
```

- A. `"fruit"`
- B. `30`
- C. `undefined`
- D. `null`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D**

Only the values explicitly listed in the union are allowed.

```ts
data = null;
```

</details>

---

### 10. Which value is NOT allowed?

```ts
let data: "prashant" | 24 | null;
```

- A. `"prashant"`
- B. `24`
- C. `null`
- D. `"Prashant"`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D**

Literal string types are case-sensitive.

</details>

---

### 11. Which Type Alias correctly defines a set of fixed values?

- A.

```ts
type User = string;
```

- B.

```ts
type User = "ankit" | "girish";
```

- C.

```ts
type User = any;
```

- D.

```ts
type User = unknown;
```

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

This alias restricts values to specific literals.

</details>

---

### 12. What can be assigned?

```ts
type UserTypes = "ankit" | 26 | "girish" | undefined;
```

- A. `"ankit"`
- B. `26`
- C. `"girish"`
- D. All of the above

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D**

All values included in the union are valid.

</details>

---

### 13. Which value will produce an error?

```ts
type UserTypes = "ankit" | 26 | "girish" | undefined;
```

- A. `"ankit"`
- B. `"girish"`
- C. `26`
- D. `"rahul"`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D**

`"rahul"` is not part of the union.

</details>

---

### 14. Which statement about Literal Types is true?

- A. They exist in JavaScript runtime
- B. They are removed during compilation
- C. They become variables in JavaScript
- D. They create objects

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Literal Types only exist during TypeScript compilation.

</details>

---

### 15. What is the difference between these?

```ts
let value: true = true;
```

and

```ts
let value: boolean = true;
```

- A. No difference
- B. First allows only `true`, second allows `true` and `false`
- C. First allows only `false`
- D. Both allow any value

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

```ts
let a: true = true;
```

Only true.

```ts
let b: boolean = true;
b = false;
```

Both boolean values allowed.

</details>

---

### 16. What is meant by a Collective Type?

- A. Type containing a fixed value
- B. Type representing an entire category of values
- C. Type for arrays
- D. Type for objects only

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Examples:

```ts
let age: number = 25;
let name: string = "Prashant";
```

These represent large sets of possible values.

</details>

---

### 17. Which is a Collective Type?

- A. `"hello"`
- B. `25`
- C. `true`
- D. `string`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D**

`string` represents all possible strings.

</details>

---

### 18. What type is inferred here?

```ts
const greet = "hi";
```

- A. `string`
- B. `"hi"`
- C. `any`
- D. `unknown`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

For `const`, TypeScript infers the literal type.

```ts
const greet = "hi";
```

Type is `"hi"`.

</details>

---

### 19. What type is inferred here?

```ts
let greet = "hi";
```

- A. `"hi"`
- B. `string`
- C. `any`
- D. `unknown`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Because `let` variables can change later.

```ts
let greet = "hi";
greet = "hello";
```

</details>

---

### 20. What is the type of `greet2`?

```ts
const greet2: string = "hi";
```

- A. `"hi"`
- B. `string`
- C. `any`
- D. `unknown`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Explicit annotation overrides literal inference.

</details>

---

### 21. Create a variable that can only store the literal value `"admin"`.

<details>
<summary>Expected Answer</summary>

```ts
let role: "admin" = "admin";
```

</details>

---

### 22. Create a variable that can only store the number `100`.

<details>
<summary>Expected Answer</summary>

```ts
let score: 100 = 100;
```

</details>

---

### 23. Create a variable that can store only:

- `"open"`
- `"closed"`

<details>
<summary>Expected Answer</summary>

```ts
let status: "open" | "closed" = "open";
```

</details>

---

### 24. Create a Type Alias named `Theme` that allows:

- `"light"`
- `"dark"`

<details>
<summary>Expected Answer</summary>

```ts
type Theme = "light" | "dark";
```

</details>

---

### 25. Create a variable using the `Theme` alias.

<details>
<summary>Expected Answer</summary>

```ts
type Theme = "light" | "dark";

let currentTheme: Theme = "dark";
```

</details>

---

### 26. Create a Type Alias named `TrafficSignal`.

Allowed values:

- `"red"`
- `"yellow"`
- `"green"`

<details>
<summary>Expected Answer</summary>

```ts
type TrafficSignal = "red" | "yellow" | "green";
```

</details>

---

### 27. Create a variable that can store:

- `"success"`
- `"error"`
- `null`

<details>
<summary>Expected Answer</summary>

```ts
let response: "success" | "error" | null = null;
```

</details>

---

### 28. Create a Type Alias named `UserRole`.

Allowed values:

- `"admin"`
- `"user"`
- `"guest"`

Then create three variables using it.

<details>
<summary>Expected Answer</summary>

```ts
type UserRole = "admin" | "user" | "guest";

let r1: UserRole = "admin";
let r2: UserRole = "user";
let r3: UserRole = "guest";
```

</details>

---

### 29. Convert the following inline Literal Type into a reusable Type Alias.

```ts
let role: "admin" | "user" | "guest";
```

<details>
<summary>Expected Answer</summary>

```ts
type Role = "admin" | "user" | "guest";

let role: Role;
```

</details>

---

### 30. Explain the difference between these two declarations.

```ts
const message = "hello";
```

```ts
const message: string = "hello";
```

<details>
<summary>Expected Answer</summary>

```ts
const message = "hello";
```

TypeScript infers the literal type `"hello"`.

```ts
const message: string = "hello";
```

TypeScript uses the broader `string` type because of the explicit annotation.
This means the variable is treated as any string rather than only `"hello"`.

</details>

---

## Section 4.4

### 1. What is the purpose of Type Assertion in TypeScript?

- A. To create new types
- B. To force TypeScript to treat a value as a specific type
- C. To convert values at runtime
- D. To improve JavaScript performance

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. To force TypeScript to treat a value as a specific type**

Type Assertions tell TypeScript:

> "Trust me, I know what this type is."

```ts
let value = "Prashant";

(value as string).toUpperCase();
```

</details>

---

### 2. Which keyword is commonly used for Type Assertions?

- A. `assert`
- B. `cast`
- C. `as`
- D. `type`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. `as`**

```ts
let value = "Hello";

(value as string).toUpperCase();
```

</details>

---

### 3. What happens here?

```ts
let num = 25;
(num as string).toUpperCase();
```

- A. TypeScript converts number into string
- B. TypeScript allows it because of assertion
- C. Runtime conversion happens automatically
- D. Number becomes string permanently

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Type Assertion does not perform conversion.

It only tells TypeScript to trust you.

```ts
num as string;
```

does not actually change the value into a string.

</details>

---

### 4. Which statement about Type Assertions is true?

- A. They perform runtime conversion
- B. They only exist during compilation
- C. They change the actual value
- D. They generate JavaScript code

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Type Assertions are removed when TypeScript compiles to JavaScript.

</details>

---

### 5. What is the output type of `userdata[0]` after assertion?

```ts
let userdata = ["Prashant", 20];

let name = userdata[0] as string;
```

- A. `number`
- B. `string`
- C. `string | number`
- D. `unknown`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

The assertion tells TypeScript to treat the value as a string.

</details>

---

### 6. Which statement is dangerous?

```ts
let userdata = ["Prashant", 20, 30];
```

- A.

```ts
(userdata[0] as string).toUpperCase();
```

- B.

```ts
(userdata[1] as number).toFixed();
```

- C.

```ts
(userdata[2] as string).toUpperCase();
```

- D. All of the above

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Index 2 contains a number.

TypeScript trusts us because of the assertion, but runtime may fail.

</details>

---

### 7. Why should Type Assertions be used carefully?

- A. They slow down JavaScript
- B. They can hide type mistakes
- C. They create memory leaks
- D. They prevent compilation

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Incorrect assertions can introduce bugs.

```ts
let value = 10;

(value as string).toUpperCase();
```

TypeScript trusts you, but the value is actually a number.

</details>

---

### 8. Which statement is valid?

```ts
let arr = ["Prashant", 20];
```

- A.

```ts
let x = arr[0] as number;
```

- B.

```ts
let x = arr[1] as string;
```

- C.

```ts
let x = arr[0] as string;
```

- D. All of the above

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D**

Type Assertions allow all of these because TypeScript trusts the developer.

</details>

---

### 9. What does this mean?

```ts
type Fruit = "apple" | "mango";

let value = 20 as Fruit;
```

- A. Runtime conversion to `"apple"`
- B. Runtime conversion to `"mango"`
- C. TypeScript treats value as `Fruit`
- D. Compilation error

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

No conversion occurs.

Only TypeScript's understanding changes.

</details>

---

### 10. What is the type of `num`?

```ts
let num = 30 as const;
```

- A. `number`
- B. `30`
- C. `readonly 30`
- D. `any`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

`as const` creates the most specific literal type.

```ts
let num: 30;
```

</details>

---

### 11. What is inferred here?

```ts
let colors = ["red", "blue"] as const;
```

- A. `string[]`
- B. `readonly string[]`
- C. `readonly ["red", "blue"]`
- D. `["red", "blue"]`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

`as const` creates a readonly tuple.

</details>

---

### 12. Which statement becomes invalid?

```ts
let colors = ["red", "blue"] as const;
```

- A.

```ts
colors[0];
```

- B.

```ts
colors.length;
```

- C.

```ts
colors.push("green");
```

- D.

```ts
colors[1];
```

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Readonly tuples cannot be modified.

</details>

---

### 13. What does `as const` do for objects?

- A. Makes properties readonly
- B. Converts object into class
- C. Seals object at runtime
- D. Makes object immutable in JavaScript

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

```ts
let obj = {
  name: "Prashant",
} as const;
```

Properties become readonly literal types.

</details>

---

### 14. What is inferred?

```ts
let user = {
  name: "Prashant",
  age: 24,
} as const;
```

- A.

```ts
{
  name: string;
  age: number;
}
```

- B.

```ts
{
  readonly name: "Prashant";
  readonly age: 24;
}
```

- C.

```ts
readonly object
```

- D. `unknown`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

All properties become readonly literal types.

</details>

---

### 15. Which statement is invalid?

```ts
let user = {
  name: "Prashant",
} as const;
```

- A.

```ts
console.log(user.name);
```

- B.

```ts
user.name = "Ankit";
```

- C.

```ts
typeof user;
```

- D.

```ts
user["name"];
```

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Readonly properties cannot be reassigned.

</details>

---

### 16. Which statement about `as const` is true?

- A. Creates runtime immutability
- B. Creates compile-time readonly types
- C. Converts values into constants in JavaScript
- D. Creates classes

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

It affects TypeScript's type system only.

</details>

---

### 17. What is inferred here?

```ts
const greeting = "hi";
```

- A. `string`
- B. `"hi"`
- C. `any`
- D. `unknown`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Const variables automatically infer literal types.

</details>

---

### 18. Which is equivalent?

```ts
let value = "hello" as const;
```

- A.

```ts
let value: string = "hello";
```

- B.

```ts
let value: "hello" = "hello";
```

- C.

```ts
let value: any = "hello";
```

- D.

```ts
let value: unknown = "hello";
```

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Both result in the literal type `"hello"`.

</details>

---

### 19. Which statement is true when both a type annotation and assertion are present?

```ts
let arr: number[] = [10, 20] as const;
```

- A. Readonly tuple wins
- B. Type annotation wins
- C. Compilation fails
- D. Array becomes immutable

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

The explicit type annotation takes precedence.

```ts
let arr: number[] = [10, 20] as const;
```

`arr` behaves as `number[]`.

</details>

---

### 20. What is the primary purpose of Type Assertions?

- A. Runtime type conversion
- B. Informing TypeScript about a type
- C. Creating new types
- D. Creating interfaces

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Type Assertions influence TypeScript's type checking only.

</details>

---

### 21. Create a variable named `username` and use a Type Assertion to treat it as a string before calling `.toUpperCase()`.

<details>
<summary>Expected Answer</summary>

```ts
let username = "Prashant";

(username as string).toUpperCase();
```

</details>

---

### 22. Create an array containing a string and a number. Use Type Assertion to call `.toUpperCase()` on the string element.

<details>
<summary>Expected Answer</summary>

```ts
let data = ["Ankit", 25];

(data[0] as string).toUpperCase();
```

</details>

---

### 23. Create a variable and incorrectly assert a number as a string.

<details>
<summary>Expected Answer</summary>

```ts
let num = 100;

(num as string).toUpperCase();
```

</details>

---

### 24. Create a Type Alias named `Fruit` containing `"apple"` and `"mango"`. Assert a value as `Fruit`.

<details>
<summary>Expected Answer</summary>

```ts
type Fruit = "apple" | "mango";

let value = 30 as Fruit;
```

</details>

---

### 25. Create a variable using `as const` so that its inferred type becomes the literal value `50`.

<details>
<summary>Expected Answer</summary>

```ts
let num = 50 as const;
```

</details>

---

### 26. Create a readonly tuple using `as const`.

<details>
<summary>Expected Answer</summary>

```ts
let values = [10, 20, "Prashant"] as const;
```

</details>

---

### 27. Create an object using `as const` with properties `name` and `age`.

<details>
<summary>Expected Answer</summary>

```ts
let user = {
  name: "Prashant",
  age: 24,
} as const;
```

</details>

---

### 28. Create a readonly object and try to modify one of its properties. Observe the TypeScript error.

<details>
<summary>Expected Answer</summary>

```ts
let user = {
  name: "Prashant",
} as const;

// Error
user.name = "Ankit";
```

</details>

---

### 29. Create a readonly tuple and try to use `.push()` on it.

<details>
<summary>Expected Answer</summary>

```ts
let values = [10, 20] as const;

// Error
values.push(30);
```

</details>

---

### 30. Create a variable whose type annotation overrides `as const`.

<details>
<summary>Expected Answer</summary>

```ts
let numbers: number[] = [10, 20, 30] as const;

numbers.push(40);
```

Because the explicit type annotation `number[]` takes precedence over the assertion.

</details>

---

## Section 4.5 and Section 4.6

### 1. What is the purpose of the Non-Null Assertion Operator (`!`)?

- A. Convert a value into boolean
- B. Remove `null` and `undefined` from a type
- C. Create a new type
- D. Make a variable readonly

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. Remove `null` and `undefined` from a type**

The non-null assertion operator tells TypeScript:

> "Trust me, this value is not null or undefined."

```ts
let value: string | undefined = "Hello";

value!.toUpperCase();
```

</details>

---

### 2. Which statement about `!` is true?

- A. It performs runtime checks
- B. It throws errors automatically
- C. It only affects TypeScript's type checking
- D. It converts undefined into a valid value

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

The operator only affects TypeScript's type system.

No JavaScript code is generated.

</details>

---

### 3. Given:

```ts
let nums = [10, "Prashant"];
let value = nums[0];
```

With `noUncheckedIndexedAccess: true`, what is the inferred type of `value`?

- A. `number`
- B. `string | number`
- C. `string | number | undefined`
- D. `undefined`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

TypeScript assumes array access might fail.

```ts
let value: string | number | undefined;
```

</details>

---

### 4. What is the inferred type here?

```ts
let nums = [10, "Prashant"];
let value = nums[0]!;
```

- A. `undefined`
- B. `string | number`
- C. `number`
- D. `string`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

The `!` removes `undefined` from the inferred type.

</details>

---

### 5. What does this mean?

```ts
nums[0]!;
```

- A. Array index definitely exists
- B. Convert value to boolean
- C. Create a readonly value
- D. Convert value to number

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

You are telling TypeScript:

> "This value definitely exists."

</details>

---

### 6. Why should Non-Null Assertions be used carefully?

- A. They slow down JavaScript
- B. They can hide real bugs
- C. They create memory leaks
- D. They prevent compilation

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

If your assumption is wrong, runtime errors can occur.

</details>

---

### 7. Which is generally safer?

- A. `value!`
- B. Type Assertion
- C. Optional Chaining (`?.`)
- D. Definite Assignment Assertion

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Optional chaining safely handles missing values.

```ts
value?.toUpperCase();
```

</details>

---

### 8. Which statement is recommended?

- A. Use `!` everywhere
- B. Use `!` whenever TypeScript complains
- C. Use `!` only when completely sure
- D. Disable strict mode

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Use it only when you are extremely confident the value exists.

</details>

---

### 9. What happens if this assumption is wrong?

```ts
let value: string | undefined = undefined;

value!.toUpperCase();
```

- A. TypeScript prevents compilation
- B. Runtime error may occur
- C. Value becomes empty string
- D. Value becomes null

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

The assertion silences TypeScript but does not fix runtime problems.

</details>

---

### 10. Which operator uses the same symbol but has a different purpose?

- A. Type Assertion
- B. Optional Chaining
- C. Definite Assignment Assertion
- D. Union Type

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

The same `!` symbol is also used for Definite Assignment Assertions.

</details>

---

### 11. Why does TypeScript complain here?

```ts
let num: number;

console.log(num);
```

- A. Variable is readonly
- B. Variable is nullable
- C. Variable used before assignment
- D. Variable is constant

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

The variable might not contain a value yet.

</details>

---

### 12. What is a Definite Assignment Assertion?

- A. Runtime validation
- B. Telling TypeScript a variable will be assigned before use
- C. Creating a constant
- D. Removing undefined from arrays

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

It tells TypeScript:

> "Trust me, this variable will be assigned before it is used."

</details>

---

### 13. Which declaration uses Definite Assignment Assertion?

- A.

```ts
let num!: number;
```

- B.

```ts
let num?: number;
```

- C.

```ts
let num as number;
```

- D.

```ts
let num = number;
```

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

```ts
let num!: number;
```

</details>

---

### 14. What happens here?

```ts
let num!: number;

num = 20;

console.log(num);
```

- A. Compile error
- B. Prints 20
- C. Prints undefined
- D. Runtime error

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

The variable receives a value before being used.

</details>

---

### 15. What happens here?

```ts
let num!: number;

console.log(num);
```

- A. Compile error
- B. Prints 0
- C. Prints undefined
- D. Prints null

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

TypeScript trusts you, but JavaScript still contains an uninitialized variable.

</details>

---

### 16. Which statement is true about Definite Assignment Assertions?

- A. They guarantee assignment
- B. They perform runtime checks
- C. They suppress TypeScript checks
- D. They initialize variables

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

They only suppress TypeScript's analysis.

</details>

---

### 17. Which can introduce bugs?

- A. Optional Chaining
- B. Non-Null Assertion
- C. Definite Assignment Assertion
- D. Both B and C

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D**

Both rely on the developer being correct.

</details>

---

### 18. Which statement best describes Non-Null Assertions?

- A. "Check whether value exists"
- B. "Assume value exists"
- C. "Convert value"
- D. "Initialize value"

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

It is an assumption, not a verification.

</details>

---

### 19. Which statement best describes Definite Assignment Assertions?

- A. "Assign value now"
- B. "Value already exists"
- C. "Value will definitely be assigned later"
- D. "Convert undefined"

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

You are promising TypeScript that assignment will happen before use.

</details>

---

### 20. Which is generally the safest approach?

- A. Use `!` everywhere
- B. Disable strict mode
- C. Prefer proper checks and optional chaining
- D. Use assertions for every variable

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Assertions should be the exception, not the default approach.

</details>

---

### 21. Create an array and access its first element using a Non-Null Assertion.

<details>
<summary>Expected Answer</summary>

```ts
let nums = [10, 20, 30];

let first = nums[0]!;
```

</details>

---

### 22. Create a variable of type `string | undefined` and use a Non-Null Assertion before calling `.toUpperCase()`.

<details>
<summary>Expected Answer</summary>

```ts
let username: string | undefined = "Prashant";

username!.toUpperCase();
```

</details>

---

### 23. Create an example showing how a wrong Non-Null Assertion can cause runtime issues.

<details>
<summary>Expected Answer</summary>

```ts
let username: string | undefined = undefined;

username!.toUpperCase();
```

</details>

---

### 24. Rewrite the following using Optional Chaining instead of Non-Null Assertion.

```ts
username!.toUpperCase();
```

<details>
<summary>Expected Answer</summary>

```ts
username?.toUpperCase();
```

</details>

---

### 25. Create a variable using Definite Assignment Assertion.

<details>
<summary>Expected Answer</summary>

```ts
let age!: number;
```

</details>

---

### 26. Assign a value before using a variable declared with Definite Assignment Assertion.

<details>
<summary>Expected Answer</summary>

```ts
let age!: number;

age = 24;

console.log(age);
```

</details>

---

### 27. Create an example where Definite Assignment Assertion leads to `undefined`.

<details>
<summary>Expected Answer</summary>

```ts
let age!: number;

console.log(age);
```

</details>

---

### 28. Create an array and use Non-Null Assertion on the second element.

<details>
<summary>Expected Answer</summary>

```ts
let data = ["Prashant", "Ankit"];

let second = data[1]!;
```

</details>

---

### 29. Create a variable that stores `number | undefined` and remove `undefined` using a Non-Null Assertion.

<details>
<summary>Expected Answer</summary>

```ts
let score: number | undefined = 90;

let finalScore = score!;
```

</details>

---

### 30. Create one example of Non-Null Assertion and one example of Definite Assignment Assertion.

<details>
<summary>Expected Answer</summary>

```ts
let username: string | undefined = "Prashant";

username!.toUpperCase();
```

```ts
let age!: number;

age = 24;
```

</details>

---