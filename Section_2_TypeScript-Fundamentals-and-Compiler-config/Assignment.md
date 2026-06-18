# Section 2: TypeScript Fundamentals and Comipler Configuration

## Table of Contents

- [Section 2.1](#section-21)
- [Section 2.2](#section-22)
- [Section 2.3](#section-23)
- [Section 2.4](#section-24)
- [Section 2.6](#section-26)
- [Section 2.8 and Section 2.9](#section-28-and-section-29)
- [Section 2.10](#section-210)

## Section 2.1

### 1. What are the two broad categories of data types in JavaScript and TypeScript?

- A. Primitive and Non-Primitive
- B. Static and Dynamic
- C. Compile-Time and Run-Time
- D. Mutable and Immutable

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A. Primitive and Non-Primitive**

JavaScript and TypeScript data types are broadly classified into:

- Primitive Types: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`
- Non-Primitive Types: `object`, `array`, `function`, etc.

```ts
const age = 25; // Primitive
const user = { id: 1 }; // Non-Primitive
```

</details>

---

### 2. Choose the correct type annotation for the following code:

```ts
let num: ____ = 10;
```

- A. integer
- B. float
- C. number
- D. numeric

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. number**

TypeScript provides a single `number` type for all numeric values.

```ts
let num: number = 10;
let price: number = 99.99;
```

There are no separate `int` or `float` types in TypeScript.

</details>

---

### 3. What type will TypeScript infer for the following variable?

```ts
let userName = undefined;
```

- A. string
- B. any
- C. undefined
- D. unknown

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. any**

When initialized with only `undefined`, TypeScript widens the type and typically infers `any`.

```ts
let userName = undefined;

userName = "Prashant";
userName = 100;
```

This is allowed because the variable is inferred as `any`.

</details>

---

### 4. Which of the following types exist in TypeScript but not in JavaScript?

- A. any
- B. unknown
- C. both any and unknown
- D. neither any nor unknown

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. both any and unknown**

`any` and `unknown` are TypeScript-only types.

JavaScript has no type annotations or special types like these.

```ts
let value: any;
let data: unknown;
```

</details>

---

### 5. We should always use `any` when writing TypeScript code.

- A. True
- B. False

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. False**

The purpose of TypeScript is to provide type safety. Excessive use of `any` disables type checking and removes many of the benefits TypeScript offers.

```ts
let value: any = "hello";

value.toUpperCase();
value.nonExistentMethod(); // No error
```

</details>

---

### 6. Why is `unknown` generally preferred over `any`?

- A. It is faster
- B. It provides better runtime performance
- C. It forces type checking before usage
- D. It is a JavaScript type

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. It forces type checking before usage**

With `unknown`, TypeScript requires you to narrow the type before accessing properties or methods.

```ts
let value: unknown = "hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

This makes the code safer than using `any`.

</details>

---

### 7. Using `any` makes TypeScript behave more like JavaScript.

- A. True
- B. False

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A. True**

`any` effectively turns off TypeScript's type checking for that value.

```ts
let data: any = 10;

data = "hello";
data = {};
data.someRandomMethod();
```

TypeScript will not report errors, similar to JavaScript's dynamic behavior.

</details>

---

### 8. Which of the following is a primitive type?

- A. object
- B. array
- C. function
- D. bigint

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D. bigint**

`bigint` is a primitive type introduced to represent integers larger than the safe range of `number`.

```ts
const value = 12345678901234567890n;
```

</details>

---

### 9. Which of the following is NOT a primitive type?

- A. string
- B. symbol
- C. object
- D. boolean

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. object**

Objects are reference types and belong to the non-primitive category.

```ts
const user = {
  name: "Prashant",
};
```

</details>

---

### 10. What will be the inferred type of the following variable?

```ts
let score = 100;
```

- A. any
- B. number
- C. bigint
- D. object

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. number**

TypeScript automatically infers the type based on the assigned value.

```ts
let score = 100; // number
```

This feature is known as **Type Inference**.

</details>

---

### 11. Type annotations are mandatory in TypeScript.

- A. True
- B. False

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. False**

TypeScript can often infer types automatically.

```ts
let age = 25;
```

The inferred type is `number`, even without an explicit annotation.

</details>

---

### 12. Which keyword is used to explicitly declare an unknown type?

- A. any
- B. unknown
- C. undefined
- D. object

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. unknown**

`unknown` is the type-safe alternative to `any`.

```ts
let value: unknown;
```

Type narrowing is required before using the value.

</details>

---

## Section 2.2

> **Prerequisite:** Install the latest version of Node.js before working with TypeScript. Node.js includes npm, which is used to install TypeScript and other packages. Latest version also allows you to run `.ts` file directly in run-time environment.
>
> Download Node.js:
>
> - https://nodejs.org

---

### 1. How can we install TypeScript globally?

- A. `npm install typescript`
- B. `npm install -g typescript`
- C. `node install typescript`
- D. `npm add typescript`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. npm install -g typescript**

```bash
npm install -g typescript
```

Installing TypeScript globally gives access to the **tsc** command from any terminal location.

```bash
tsc --version
```

The `tsc` command is the TypeScript Compiler responsible for converting TypeScript code into JavaScript.

</details>

---

### 2. `tsc` is a:

- A. Compiler
- B. Interpreter
- C. Transpiler
- D. Both Compiler and Transpiler

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D. Both Compiler and Transpiler**

`tsc` performs type checking and converts TypeScript into JavaScript.

```ts
const age: number = 25;
```

becomes

```js
const age = 25;
```

Since the output is another high-level language (JavaScript), it is often called a **transpiler**. Since it compiles source code into another form, it is also a **compiler**.

</details>

---

### 3. We always ship TypeScript code directly to production.

- A. True
- B. False

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. False**

Browsers and Node.js execute JavaScript, not TypeScript.

Before deployment:

```text
TypeScript --> tsc --> JavaScript --> Runtime
```

The generated JavaScript is what gets shipped to production.

</details>

---

### 4. Why do the following files produce an error with below folder structure?

<pre>
main
    |_a.ts
    |_b.ts
</pre>

**a.ts**

```ts
const count = 10;
```

**b.ts**

```ts
const count = 20;
```

- A. TypeScript does not allow constants
- B. Both files share the global scope
- C. const cannot be reused
- D. File names must be unique

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. Both files share the global scope**

By default, TypeScript treats files without imports/exports as **scripts**, meaning their declarations are placed in the global scope.

```ts
// a.ts
const count = 10;

// b.ts
const count = 20;
```

Result:

```text
Cannot redeclare block-scoped variable 'count'
```

</details>

---

### 5. Which of the following converts a TypeScript file into a module?

- A. `export {}`
- B. `import something`
- C. `export const value = 10`
- D. All of the above

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D. All of the above**

A file becomes a module when it contains at least one import or export.

Common approach:

```ts
export {};
```

This is often used when a file has no actual exports but should be treated as a module.

</details>

---

### 6. Which is generally the best way to avoid global scope conflicts?

- A. Rename variables
- B. Use `var`
- C. Convert files into modules
- D. Ignore errors

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. Convert files into modules**

```ts
export {};
```

or

```ts
export const age = 25;
```

Using modules is the standard and recommended approach.

</details>

---

### 7. In order to use the `tsc` command, we must create a `tsconfig.json` file.

- A. True
- B. False

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. False**

You can compile a file directly:

```bash
tsc app.ts
```

A `tsconfig.json` file becomes useful when managing larger projects and compiler options.

</details>

---

### 8. What does the following command do?

```bash
tsc app.ts
```

- A. Compiles only app.ts
- B. Compiles every TypeScript file
- C. Runs app.ts
- D. Creates tsconfig.json

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A. Compiles only app.ts**

```bash
tsc app.ts
```

Produces:

```text
app.ts --> app.js
```

</details>

---

### 9. What happens when you run:

```bash
tsc
```

- A. Compiles all project TypeScript files
- B. Runs all TypeScript files
- C. Deletes JavaScript files
- D. Installs TypeScript

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A. Compiles all project TypeScript files**

When a `tsconfig.json` file exists, `tsc` reads it and compiles all included TypeScript files.

</details>

---

### 10. What does the following command do?

```bash
tsc app.ts --noEmit
```

- A. Generates app.js
- B. Type checks only
- C. Deletes app.js
- D. Runs app.ts

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. Type checks only**

```bash
tsc app.ts --noEmit
```

TypeScript performs all checks but does not generate JavaScript output.

Useful in CI/CD pipelines and code reviews.

</details>

---

### 11. The `--noEmitOnError` flag is used to:

- A. Stop type checking
- B. Prevent JS generation when errors exist
- C. Improve runtime performance
- D. Generate source maps

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. Prevent JS generation when errors exist**

```bash
tsc --noEmitOnError
```

Without this flag, TypeScript may still emit JavaScript even when type errors are present.

This flag prevents JavaScript output if compilation fails.

</details>

---

### 12. How can we automatically recompile files whenever changes are made?

- A. `tsc --live`
- B. `tsc --watch`
- C. `tsc --reload`
- D. `tsc --track`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. tsc --watch**

```bash
tsc --watch
```

or

```bash
tsc -w
```

TypeScript continuously watches files and recompiles whenever changes are detected.

</details>

---

### 13. What is the purpose of the `--init` flag?

- A. Creates package.json
- B. Creates tsconfig.json
- C. Installs TypeScript
- D. Starts watch mode

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. Creates tsconfig.json**

```bash
tsc --init
```

Generates a default TypeScript configuration file.

</details>

---

### 14. Which statement about compilation is correct?

- A. TypeScript executes directly in browsers
- B. TypeScript must be converted to JavaScript before execution
- C. Browsers understand TypeScript natively
- D. Node.js understands TypeScript natively

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. TypeScript must be converted to JavaScript before execution**

The browser and Node.js runtime execute JavaScript.

```text
TypeScript --> JavaScript --> Execution
```

</details>

---

### 15. Which command displays the installed TypeScript version?

- A. `tsc version`
- B. `tsc --version`
- C. `typescript --version`
- D. `node --ts-version`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. tsc --version**

```bash
tsc --version
```

Example output:

```text
Version 5.9.2
```

</details>

---

### 16. What is the primary responsibility of the TypeScript compiler?

- A. Execute JavaScript
- B. Render HTML
- C. Type Check and Generate JavaScript
- D. Install Dependencies

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. Type Check and Generate JavaScript**

The TypeScript compiler performs:

1. Parsing
2. Type Checking
3. JavaScript Generation

```text
TS Source
   ↓
 Type Check
   ↓
 JS Output
```

</details>

## Section 2.3

### 1. Which file is used to configure the TypeScript compiler?

- A. package.json
- B. jsconfig.json
- C. tsconfig.json
- D. typescript.json

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. tsconfig.json**

The `tsconfig.json` file is used to configure how the TypeScript compiler (`tsc`) behaves.

Examples of settings include:

- target
- rootDir
- outDir
- noEmitOnError
- sourceMap
- strict

</details>

---

### 2. Which command generates a default `tsconfig.json` file?

- A. `npm init`
- B. `tsc --create`
- C. `tsc --init`
- D. `tsconfig init`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. tsc --init**

```bash
tsc --init
```

This command creates a starter `tsconfig.json` file in the current directory.

</details>

---

### 3. What is the primary difference between `tsconfig.json` and `jsconfig.json`?

- A. No difference
- B. tsconfig.json is for TypeScript projects, jsconfig.json is primarily for JavaScript projects
- C. jsconfig.json supports more options
- D. tsconfig.json cannot configure compiler settings

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

| tsconfig.json                            | jsconfig.json                             |
| ---------------------------------------- | ----------------------------------------- |
| Used for TypeScript projects             | Used for JavaScript projects              |
| Enables TypeScript compilation           | Mainly improves tooling and type checking |
| Supports all TypeScript compiler options | Subset of TypeScript configuration        |

</details>

---

### 4. What is the purpose of the `target` option?

- A. Specifies output folder
- B. Specifies JavaScript version to generate
- C. Specifies TypeScript version
- D. Enables watch mode

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Example:

```json
{
  "compilerOptions": {
    "target": "ES2020"
  }
}
```

The `target` option controls the JavaScript version generated by TypeScript.

Example:

```ts
const add = (a: number, b: number) => a + b;
```

Target: `ES6`

```js
const add = (a, b) => a + b;
```

Target: `ES5`

```js
var add = function (a, b) {
  return a + b;
};
```

Choose the target based on the environments you need to support.

</details>

---

### 5. Which target should generally be used for modern Node.js applications?

- A. ES3
- B. ES5
- C. ES2020 or newer
- D. ES1

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Modern Node.js versions support modern JavaScript features.

Common choices:

```json
{
  "compilerOptions": {
    "target": "ES2020"
  }
}
```

or

```json
{
  "compilerOptions": {
    "target": "ES2022"
  }
}
```

</details>

---

### 6. Which option removes comments from generated JavaScript?

- A. removeComments
- B. deleteComments
- C. stripComments
- D. noComments

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

```json
{
  "compilerOptions": {
    "removeComments": true
  }
}
```

Example:

```ts
// User age
const age = 25;
```

Generated:

```js
const age = 25;
```

</details>

---

### 7. What does `noEmitOnError` do?

- A. Stops type checking
- B. Prevents JS generation when compilation errors exist
- C. Deletes JS files
- D. Enables strict mode

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

```json
{
  "compilerOptions": {
    "noEmitOnError": true
  }
}
```

Without this setting:

```ts
const age: string = 10;
```

TypeScript may still generate JavaScript.

With `noEmitOnError`, no JavaScript file is produced.

</details>

---

### 8. What is the purpose of the `pretty` option?

- A. Formats TypeScript code
- B. Makes compiler output easier to read
- C. Formats generated JavaScript
- D. Improves performance

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

```json
{
  "compilerOptions": {
    "pretty": true
  }
}
```

This improves terminal error messages by adding colors and formatting.

</details>

---

### 9. What is the purpose of `rootDir`?

- A. Output folder
- B. Source folder containing TypeScript files
- C. Package location
- D. Dependency folder

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

```json
{
  "compilerOptions": {
    "rootDir": "./src"
  }
}
```

Project:

```text
src/
 ├── app.ts
 ├── user.ts
```

TypeScript expects source files inside `src`.

</details>

---

### 10. What is the purpose of `outDir`?

- A. Source folder
- B. Package folder
- C. Generated JavaScript output folder
- D. Node modules folder

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

```json
{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

Generated JavaScript files are placed inside `dist`.

</details>

---

### 11. Given:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

What happens when a new TypeScript file is created inside `src`?

- A. Ignored
- B. Automatically compiled into dist
- C. Causes an error
- D. Moves to root directory

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Example:

```text
src/
 ├── app.ts
 ├── user.ts
```

Produces:

```text
dist/
 ├── app.js
 ├── user.js
```

</details>

---

### 12. What happens if no TypeScript files exist inside the configured `rootDir`?

- A. Successful compilation
- B. TypeScript reports that no input files were found
- C. Creates empty JavaScript files
- D. Creates default TypeScript files

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

The compiler cannot find files to compile and reports an error.

</details>

---

### 13. Which additional file can TypeScript generate for debugging?

- A. sourceMap
- B. debugMap
- C. traceMap
- D. compileMap

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

Produces:

```text
app.js
app.js.map
```

Source maps allow debuggers to map generated JavaScript back to TypeScript.

</details>

---

### 14. TypeScript always emits JavaScript even when TypeScript errors exist.

- A. True
- B. False

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

By default:

```ts
const age: string = 10;
```

Produces:

```js
const age = 10;
```

even though TypeScript reports a type error.

</details>

---

### 15. Which option changes the behavior in the previous question?

- A. strict
- B. noEmit
- C. noEmitOnError
- D. removeComments

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

```json
{
  "compilerOptions": {
    "noEmitOnError": true
  }
}
```

No JavaScript is generated if compilation errors exist.

</details>

---

### 16. We can configure watch mode directly inside `compilerOptions`.

- A. True
- B. False

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Watch mode is a compiler flag, not a compiler option.

```bash
tsc --watch
```

or

```bash
tsc -w
```

It cannot be placed inside `compilerOptions`.

</details>

---

### 17. What happens if `outDir` is omitted?

- A. Compilation fails
- B. JavaScript files are generated beside TypeScript files
- C. Files move to node_modules
- D. Files are ignored

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Example:

```text
app.ts
```

Produces:

```text
app.ts
app.js
```

in the same folder.

</details>

---

### 18. What happens if `rootDir` is omitted?

- A. Compilation fails
- B. TypeScript attempts to infer the common root directory
- C. Files are ignored
- D. JavaScript files are not generated

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

TypeScript automatically determines a common root folder for source files.

</details>

---

### 19. What does `noEmit` do?

- A. Prevents Type Checking
- B. Generates Empty JavaScript Files
- C. Performs Type Checking But Produces No Output
- D. Deletes Existing JavaScript Files

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

```json
{
  "compilerOptions": {
    "noEmit": true
  }
}
```

Useful when another tool (Webpack, Vite, SWC, etc.) handles code generation.

</details>

---

### 20. Which file is considered the industry-standard TypeScript configuration file?

- A. package.json
- B. tsconfig.json
- C. typescript.json
- D. config.ts

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Every serious TypeScript project typically contains a `tsconfig.json` file that controls compiler behavior.

</details>

---

### 21. A beginner-friendly `tsconfig.json`

<details>
<summary>Answer</summary>

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "rootDir": "./src",
    "outDir": "./dist",
    "removeComments": true,
    "sourceMap": true,
    "noEmitOnError": true,
    "pretty": true
  }
}
```

Folder Structure:

```text
project/
├── src/
│   ├── app.ts
│   └── user.ts
├── dist/
├── tsconfig.json
```

Compilation

```bash
tsc
```

Output:

```text
dist/
├── app.js
├── app.js.map
├── user.js
├── user.js.map
```

</details>
### 22. Why can TypeScript errors sometimes differ between VS Code and the terminal?

- A. VS Code uses JavaScript
- B. VS Code and the project may be using different TypeScript versions
- C. TypeScript behaves randomly
- D. VS Code ignores tsconfig.json

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

VS Code ships with its own TypeScript version, while your project may have another version installed.

```text
VS Code TypeScript: 6.0
Project TypeScript: 5.9
```

This can lead to:

- Different error messages
- Different IntelliSense suggestions
- Different type inference behavior

To avoid discrepancies, it is recommended to use the project's TypeScript version.

</details>

---

### 23. Which TypeScript version should generally be used in production projects?

- A. Beta Version
- B. Nightly Version
- C. Stable Version
- D. Experimental Version

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Stable releases are thoroughly tested and should be preferred for production projects.

```bash
npm install -D typescript
```

</details>

---

### 24. Which package installs the latest upcoming TypeScript build?

- A. typescript@beta
- B. typescript@next
- C. typescript@future
- D. typescript@experimental

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

```bash
npm install -D typescript@next
```

`@next` points to the latest development build and may contain unreleased features.

</details>

---

### 25. To allow VS Code to use a project's TypeScript version, what must typically exist first?

- A. package-lock.json
- B. tsconfig.json
- C. A Node.js project with TypeScript installed locally
- D. dist folder

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Create a Node.js project:

```bash
npm init -y
```

Install TypeScript:

```bash
npm install -D typescript
```

VS Code can only detect and switch to a workspace TypeScript version when TypeScript is installed locally.

</details>

---

### 26. Which sequence correctly switches VS Code to use the project's TypeScript version?

- A. Install TypeScript → Open Command Palette → Select TypeScript Version
- B. Install Node.js → Restart Computer
- C. Create dist folder → Run tsc
- D. Install VS Code Extension

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

Steps:

1. Create a Node project

```bash
npm init -y
```

2. Install TypeScript

```bash
npm install -D typescript
```

3. Open Command Palette

```text
Ctrl + Shift + P
```

4. Search

```text
TypeScript: Select TypeScript Version
```

5. Choose

```text
Use Workspace Version
```

</details>

---

### 27. Without installing TypeScript inside the project, VS Code may not show the workspace TypeScript version.

- A. True
- B. False

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A. True**

VS Code only displays available workspace versions if TypeScript is installed locally.

```bash
npm install -D typescript
```

</details>

---

## Section 2.4

### 1. What is the purpose of `strictNullChecks`?

- A. Prevents null and undefined assignments unless explicitly allowed
- B. Removes null values automatically
- C. Converts null to empty string
- D. Improves runtime performance

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

Example:

```ts
let name: string = null;
```

Error:

```text
Type 'null' is not assignable to type 'string'
```

</details>

---

### 2. What additional benefit does `strictNullChecks` provide?

- A. Better IntelliSense for optional values
- B. Smaller JavaScript bundles
- C. Faster Compilation
- D. Removes TypeScript Errors

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

Example:

```ts
const user: string | undefined = undefined;

user.toUpperCase();
```

TypeScript warns because `user` might be undefined.

</details>

---

### 3. What is the default value of `strictNullChecks` when strict mode is enabled?

- A. true
- B. false
- C. undefined
- D. depends on target

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

When strict mode is enabled, `strictNullChecks` is automatically enabled as well.

</details>

---

### 4. What is the purpose of `noImplicitAny`?

- A. Prevents TypeScript from silently inferring `any`
- B. Removes all any types automatically
- C. Converts any into unknown
- D. Improves runtime speed

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

Example:

```ts
function greet(name) {
  return name;
}
```

Without `noImplicitAny`, the parameter may silently become `any`.

</details>

---

### 5. Which error is produced when `noImplicitAny` is enabled?

```ts
function add(a, b) {
  return a + b;
}
```

- A. No Error
- B. Implicit any Error
- C. Syntax Error
- D. Runtime Error

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

TypeScript reports:

```text
Parameter 'a' implicitly has an 'any' type.
Parameter 'b' implicitly has an 'any' type.
```

</details>

---

### 6. Starting with TypeScript 6, what is the default value of the `strict` compiler option?

- A. false
- B. true
- C. undefined
- D. depends on target

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

TypeScript 6 enables strict type checking by default.

As a result, stricter checks such as:

- `noImplicitAny`
- `strictNullChecks`

are enabled automatically.

</details>

---

### 7. Which compiler options are automatically enabled when strict mode is active?

- A. noImplicitAny
- B. strictNullChecks
- C. Both A and B
- D. Neither A nor B

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Strict mode automatically enables many stricter type-checking rules including:

```json
{
  "noImplicitAny": true,
  "strictNullChecks": true
}
```

</details>

---

### 8. If strict mode is enabled, should `noImplicitAny` usually be specified separately?

- A. Yes
- B. No

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Because strict mode already enables:

```json
{
  "noImplicitAny": true
}
```

Adding both is usually redundant.

</details>

---

### 9. If strict mode is enabled, should `strictNullChecks` usually be specified separately?

- A. Yes
- B. No

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Because strict mode already enables:

```json
{
  "strictNullChecks": true
}
```

Adding both is usually redundant.

</details>

---

### 10. Which configuration is generally preferred in modern TypeScript projects?

- A.

```json
{
  "compilerOptions": {
    "strict": false
  }
}
```

- B. Rely on the default strict behavior
- C.

```json
{
  "compilerOptions": {
    "noImplicitAny": false
  }
}
```

- D.

```json
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Modern TypeScript projects benefit from strict type checking because it catches many issues early and improves maintainability.

</details>

---

### 11. Which compiler option is most directly responsible for preventing accidental null-related runtime errors?

- A. removeComments
- B. sourceMap
- C. strictNullChecks
- D. pretty

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Many production bugs originate from unexpected `null` and `undefined` values. `strictNullChecks` helps catch such issues during development.

</details>

---

### 12. Which compiler option is most directly responsible for preventing untyped function parameters?

- A. noImplicitAny
- B. target
- C. outDir
- D. pretty

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

```ts
function greet(name) {
  return name;
}
```

With `noImplicitAny`, TypeScript requires explicit typing or proper inference.

</details>

---

### 13. Which TypeScript version should VS Code ideally use for a project?

- A. VS Code Bundled Version
- B. Latest Version Available Online
- C. Project (Workspace) Version
- D. Any Version

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Using the workspace version ensures that:

- Terminal and editor show the same errors
- IntelliSense matches project compilation
- Team members use a consistent TypeScript version

</details>

## Section 2.6

### 1. Where are `include` and `exclude` specified in a `tsconfig.json` file?

- A. Inside `compilerOptions`
- B. Outside `compilerOptions`
- C. Inside `files`
- D. Inside `references`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

```json
{
  "compilerOptions": {
    "target": "ES2020"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

`include` and `exclude` are top-level properties and are not placed inside `compilerOptions`.

</details>

---

### 2. All paths specified in `include` and `exclude` are relative to:

- A. Current Terminal Location
- B. Node.js Installation Directory
- C. tsconfig.json Location
- D. VS Code Workspace Root

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Given:

```text
project/
├── tsconfig.json
├── src/
└── tests/
```

```json
{
  "include": ["src/**/*"]
}
```

The path is resolved relative to the directory containing `tsconfig.json`.

</details>

---

### 3. Which of the following is a valid `include` pattern?

- A. `"src"`
- B. `"src/app.ts"`
- C. `"src/**/*"`
- D. All of the above

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D**

All are valid.

```json
{
  "include": ["src", "src/app.ts", "src/**/*"]
}
```

You can include:

- Individual files
- Entire folders
- Glob patterns

</details>

---

### 4. Which symbol matches any number of characters within a single directory level?

- A. `**`
- B. `*`
- C. `?`
- D. `#`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Example:

```json
{
  "include": ["src/*.ts"]
}
```

Matches:

```text
src/app.ts
src/user.ts
```

Does NOT match:

```text
src/controllers/user.ts
```

</details>

---

### 5. Which symbol matches files across multiple nested directories?

- A. `*`
- B. `?`
- C. `**`
- D. `#`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Example:

```json
{
  "include": ["src/**/*.ts"]
}
```

Matches:

```text
src/app.ts
src/user.ts
src/controllers/user.ts
src/services/auth/login.ts
```

</details>

---

### 6. What does the following pattern match?

```json
{
  "include": ["src/**/*.ts"]
}
```

- A. All `.ts` files inside `src` and its subdirectories
- B. Only root-level `.ts` files
- C. All JavaScript files
- D. Only files inside one folder level

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

`**` means recursively traverse folders.

</details>

---

### 7. Which property is evaluated first?

- A. exclude
- B. include
- C. Both simultaneously
- D. Neither

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

The compiler:

1. Collects files using `include`
2. Removes matching files using `exclude`

Think of it as:

```text
include → exclude
```

</details>

---

### 8. Given:

```json
{
  "include": ["src/**/*"],
  "exclude": ["src/tests"]
}
```

What happens?

- A. Everything under src is compiled
- B. src/tests is ignored
- C. Compilation fails
- D. Only tests are compiled

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

TypeScript first includes all files under `src`, then removes anything matching `src/tests`.

</details>

---

### 9. Given:

```text
project/
├── src/
│   ├── app.ts
│   ├── user.ts
│   └── test/
│       └── app.test.ts
```

Which configuration compiles only production files?

- A.

```json
{
  "include": ["src/**/*"]
}
```

- B.

```json
{
  "include": ["src/**/*"],
  "exclude": ["src/test"]
}
```

- C.

```json
{
  "exclude": ["src/test"]
}
```

- D. Both B and C

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D**

Because TypeScript already includes project files by default.

Adding:

```json
{
  "exclude": ["src/test"]
}
```

is enough.

Adding both works as well.

</details>

---

### 10. What does the following configuration compile?

```json
{
  "include": ["src/app.ts"]
}
```

- A. Entire src folder
- B. Only app.ts
- C. All TypeScript files
- D. No files

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

You can explicitly target a single file.

</details>

---

### 11. Given:

```text
project/
├── src/
│   ├── app.ts
│   └── user.ts
├── tests/
│   └── app.test.ts
```

Which configuration compiles only files inside src?

- A.

```json
{
  "include": ["src/**/*"]
}
```

- B.

```json
{
  "include": ["tests/**/*"]
}
```

- C.

```json
{
  "exclude": ["tests"]
}
```

- D. Both A and C

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D**

Both configurations achieve the goal.

</details>

---

### 12. What happens if a file is matched by both `include` and `exclude`?

- A. Included
- B. Excluded
- C. Compiler Error
- D. Random Behavior

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

`exclude` wins.

Example:

```json
{
  "include": ["src/**/*"],
  "exclude": ["src/test"]
}
```

Files inside `src/test` are omitted.

</details>

---

### 13. Which pattern matches all TypeScript files inside src but not nested folders?

- A. `"src/*.ts"`
- B. `"src/**/*.ts"`
- C. `"src/**"`
- D. `"src/*"`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

Matches:

```text
src/app.ts
src/user.ts
```

Does NOT match:

```text
src/controllers/user.ts
```

</details>

---

### 14. Which pattern matches every TypeScript file inside src and all nested folders?

- A. `"src/*.ts"`
- B. `"src/**/*.ts"`
- C. `"src/*"`
- D. `"src/**"`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

This is the most common pattern used in TypeScript projects.

</details>

---

### 15. What is the most common include pattern for TypeScript source files?

- A. `"src"`
- B. `"src/*.ts"`
- C. `"src/**/*.ts"`
- D. `"./"`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

```json
{
  "include": ["src/**/*.ts"]
}
```

It includes all TypeScript files regardless of nesting depth.

</details>

---

### 16. Given:

```text
project/
├── src/
│   ├── app.ts
│   ├── app.js
│   └── user.ts
```

Which pattern includes only TypeScript files?

- A. `"src/**/*"`
- B. `"src/**/*.js"`
- C. `"src/**/*.ts"`
- D. `"src/*"`

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

```json
{
  "include": ["src/**/*.ts"]
}
```

Only `.ts` files are matched.

</details>

---

### 17. Which statement is true regarding paths in `include` and `exclude`?

- A. Paths are relative to current terminal directory
- B. Paths are relative to tsconfig.json
- C. Paths are relative to node_modules
- D. Paths are relative to VS Code

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Always think:

```text
tsconfig.json
      ↓
All include/exclude paths are resolved from here
```

</details>

---

### 18. Which configuration excludes all test files ending with `.test.ts`?

- A.

```json
{
  "exclude": ["**/*.test.ts"]
}
```

- B.

```json
{
  "exclude": ["*.test.ts"]
}
```

- C.

```json
{
  "exclude": ["test"]
}
```

- D.

```json
{
  "exclude": ["tests"]
}
```

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

Matches:

```text
src/app.test.ts
src/user.test.ts
tests/login.test.ts
```

across the entire project.

</details>

---

### 19. Which configuration compiles all TypeScript files except tests?

- A.

```json
{
  "include": ["src/**/*.ts"],
  "exclude": ["**/*.test.ts"]
}
```

- B.

```json
{
  "include": ["src/**/*.ts"]
}
```

- C.

```json
{
  "exclude": ["src"]
}
```

- D.

```json
{
  "include": ["tests"]
}
```

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

This is a very common production setup.

</details>

---

### 20. Which statement best summarizes TypeScript file selection?

- A. exclude is checked before include
- B. include and exclude must be inside compilerOptions
- C. TypeScript gathers files using include and then removes matches from exclude
- D. include accepts only file names

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

The mental model is:

```text
1. Start with include
2. Apply exclude
3. Compile remaining files
```

This explains most include/exclude behavior in TypeScript projects.

</details>

## Section 2.8 and Section 2.9

### 1. What does "statically typed" mean?

- A. Types are checked before the program runs
- B. Types are checked only while executing
- C. Variables cannot change values
- D. The language has no types

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

A statically typed language performs type checking before execution (compile/build time).

Example:

```ts
let age: number = "25"; // Error
```

</details>

---

### 2. What does "dynamically typed" mean?

- A. Types are checked during execution
- B. Variables cannot change values
- C. Variables have fixed types forever
- D. Types are checked before compilation

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

Dynamic languages determine type correctness at runtime.

```js
let value = 10;
value = "hello";
```

</details>

---

### 3. Which language is statically typed?

- A. JavaScript
- B. Python
- C. TypeScript
- D. PHP

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

TypeScript performs static type checking before execution.

</details>

---

### 4. Which language is dynamically typed?

- A. TypeScript
- B. Java
- C. C#
- D. JavaScript

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D**

JavaScript performs type checking at runtime.

</details>

---

### 5. TypeScript is best described as:

- A. Dynamically typed and weakly typed
- B. Statically typed and strongly typed
- C. Untyped
- D. Weakly typed only

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

TypeScript adds a strong static type system on top of JavaScript.

</details>

---

### 6. JavaScript is generally considered:

- A. Statically typed and strongly typed
- B. Dynamically typed and weakly typed
- C. Statically typed and weakly typed
- D. Dynamically typed and strongly typed

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

JavaScript is dynamically typed and allows many implicit coercions.

</details>

---

### 7. Python is usually considered:

- A. Statically typed and weakly typed
- B. Dynamically typed and weakly typed
- C. Dynamically typed and strongly typed
- D. Statically typed and strongly typed

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Python is dynamic but does not freely coerce unrelated types.

```py
5 + "2" # Error
```

</details>

---

### 8. Which statement is true?

- A. Dynamic typing implies weak typing
- B. Static typing implies strong typing
- C. Dynamic and strong can exist together
- D. Strong typing requires compilation

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Python is a classic example of a dynamically typed but strongly typed language.

</details>

---

### 9. What is "strong typing"?

- A. Variables cannot change value
- B. Language prevents mixing incompatible types
- C. Variables require annotations
- D. Everything is immutable

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Strong typing means incompatible types are not silently converted.

</details>

---

### 10. What is "weak typing"?

- A. Variables cannot store numbers
- B. Language aggressively performs implicit conversions
- C. Types are checked earlier
- D. No type system exists

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Weakly typed languages perform many automatic conversions.

</details>

---

### 11. What is the result in JavaScript?

```js
5 + "2";
```

- A. Error
- B. 7
- C. "52"
- D. undefined

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

JavaScript converts `5` to `"5"` and concatenates.

```js
"5" + "2" === "52";
```

This behavior is one reason JavaScript is considered weakly typed.

</details>

---

### 12. If `5 + "2"` produces `"52"`, the language is showing evidence of:

- A. Strong typing
- B. Weak typing
- C. Static typing
- D. Immutability

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

The language silently converts values instead of rejecting the operation.

</details>

---

### 13. What happens in Python?

```py
5 + "2"
```

- A. 52
- B. 7
- C. Runtime Error
- D. undefined

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

Python rejects the operation.

```py
TypeError
```

This demonstrates strong typing.

</details>

---

### 14. What happens in TypeScript?

```ts
let x = 5 + "2";
```

- A. Compile Error
- B. Runtime Error
- C. x becomes "52"
- D. x becomes 7

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

TypeScript follows JavaScript semantics here.

```ts
const x: string = 5 + "2";
```

Result:

```ts
"52";
```

</details>

---

### 15. Which language performs more implicit coercion?

- A. Python
- B. TypeScript
- C. JavaScript
- D. Java

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

JavaScript is famous for implicit type coercion.

</details>

---

### 16. Which statement is FALSE?

- A. Python is dynamically typed
- B. Python is strongly typed
- C. JavaScript is dynamically typed
- D. JavaScript is statically typed

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D**

JavaScript is dynamically typed.

</details>

---

### 17. What does TypeScript mainly add to JavaScript?

- A. Garbage Collection
- B. Static Type Checking
- C. Browser APIs
- D. Event Loop

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

TypeScript's biggest feature is static type checking.

</details>

---

### 18. Which statement best describes TypeScript?

- A. New runtime replacing JavaScript
- B. Superset of JavaScript
- C. Python alternative
- D. Browser engine

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Every valid JavaScript file is generally valid TypeScript.

</details>

---

### 19. What happens?

```ts
let age: number = "25";
```

- A. Runtime Error
- B. Compile Error
- C. Produces 25
- D. Produces NaN

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

TypeScript catches the mismatch before execution.

</details>

---

### 20. What happens?

```js
let age = "25";
age = 30;
```

- A. Error
- B. Allowed
- C. Compile Failure
- D. Syntax Error

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

JavaScript variables can hold values of different types.

</details>

---

### 21. Which concept is being demonstrated?

```js
"5" == 5;
```

- A. Static Analysis
- B. Type Narrowing
- C. Type Coercion
- D. Generics

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

JavaScript converts values before comparison.

</details>

---

### 22. What is the result?

```js
"5" == 5;
```

- A. false
- B. true
- C. Error
- D. undefined

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Loose equality performs coercion.

</details>

---

### 23. What is the result?

```js
"5" === 5;
```

- A. true
- B. false
- C. Error
- D. undefined

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Strict equality compares both type and value.

</details>

---

### 24. Which operator avoids type coercion?

- A. ==
- B. !=
- C. ===
- D. +

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

`===` performs strict comparison.

</details>

---

### 25. Which statement best summarizes the relationship between TypeScript and JavaScript?

- A. TypeScript changes JavaScript runtime behavior
- B. TypeScript removes JavaScript coercion rules
- C. TypeScript adds static checks but JavaScript behavior still runs underneath
- D. TypeScript is interpreted by browsers directly

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

TypeScript catches many mistakes early, but the emitted JavaScript still follows JavaScript runtime rules.

</details>

## Section 2.10

### 1. What is a Top Type in a type system?

- A. A type assignable to every other type
- B. A type that can receive values from every other type
- C. A type that stores only objects
- D. A type that stores only primitives

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

A type is considered a Top Type if every other type can be assigned to it.

```ts
let x: unknown;

x = 10;
x = "hello";
x = true;
```

Everything can flow into a top type.

</details>

---

### 2. Which TypeScript type is considered the true Top Type?

- A. any
- B. void
- C. unknown
- D. never

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

`unknown` is the type-safe top type.

Every type can be assigned to it:

```ts
let value: unknown;

value = 10;
value = "hello";
value = {};
```

</details>

---

### 3. Which statement best describes `unknown`?

- A. Can be assigned to every type without checks
- B. Receives values from all types but cannot be freely assigned out
- C. Same as never
- D. Same as void

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

```ts
let value: unknown = "hello";

let str: string = value; // Error
```

TypeScript forces you to narrow first.

</details>

---

### 4. Why is `unknown` considered safer than `any`?

- A. It stores fewer values
- B. It prevents reading without narrowing
- C. It prevents writing values
- D. It only accepts primitives

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

```ts
let value: unknown = "hello";

value.toUpperCase(); // Error
```

You must prove the type first.

</details>

---

### 5. Which type can receive values from every type and also be assigned to every type?

- A. unknown
- B. never
- C. void
- D. any

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D**

`any` breaks normal type-system rules.

```ts
let a: any = 10;

let s: string = a;
let n: number = a;
```

It behaves as both source and destination for all assignments.

</details>

---

### 6. Why is `any` usually not called a pure Top Type?

- A. It accepts only primitives
- B. It behaves as both top and bottom simultaneously
- C. It cannot store values
- D. It is deprecated

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

A true top type only receives assignments.

`any` can both receive and be assigned everywhere.

```ts
let a: any;
let s: string = a;
```

This is why many TypeScript discussions treat `unknown` as the real top type.

</details>

---

### 7. What is a Bottom Type?

- A. Type assignable from all types
- B. Type assignable to all types
- C. Type that stores objects
- D. Type that stores null only

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

A bottom type can flow into every type.

</details>

---

### 8. Which TypeScript type is the Bottom Type?

- A. any
- B. unknown
- C. never
- D. void

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

`never` is assignable to every type.

```ts
let x: never;
let s: string = x;
let n: number = x;
```

</details>

---

### 9. Why is `never` called the Bottom Type?

- A. Every type can be assigned to it
- B. It is assignable to every type
- C. It stores all values
- D. It is used only with arrays

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

`never` sits at the bottom of the type hierarchy.

It can flow into all types.

</details>

---

### 10. Which assignment is valid?

```ts
let x: never;
let s: string = x;
```

- A. Invalid
- B. Valid
- C. Runtime Error
- D. Depends on strict mode

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

`never` is assignable to every type.

</details>

---

### 11. Which assignment is invalid?

```ts
let x: never;
x = "hello";
```

- A. Valid
- B. Invalid
- C. Depends on tsconfig
- D. Depends on strict mode

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

Nothing can be assigned to `never`.

</details>

---

### 12. If no value can be assigned to `never`, why does it exist?

- A. To represent impossible states
- B. To replace undefined
- C. To replace unknown
- D. To represent objects

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

`never` models code paths that can never happen.

Examples:

```ts
throw new Error();
while (true) {}
```

These never produce a value.

</details>

---

### 13. Which function returns `never`?

```ts
function fn() {
    ??? // which option needs to be written here
}
```

- A. return 10
- B. return undefined
- C. throw new Error()
- D. return null

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

```ts
function fail(): never {
  throw new Error();
}
```

Execution never successfully completes.

</details>

---

### 14. Which function most likely returns `never`?

- A. Function returning string
- B. Function returning number
- C. Function that always throws
- D. Function returning undefined

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

A function that always throws never produces a value.

</details>

---

### 15. What does `void` primarily represent?

- A. Impossible value
- B. Unknown value
- C. No meaningful return value
- D. Every possible value

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

```ts
function log(): void {
  console.log("hello");
}
```

The function returns nothing useful.

</details>

---

### 16. Which statement is true about `void`?

- A. Same as never
- B. Same as unknown
- C. Indicates absence of useful return value
- D. Bottom Type

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

`void` and `never` are very different concepts.

</details>

---

### 17. Which pair correctly matches the concepts?

- A. unknown → Bottom Type, never → Top Type
- B. unknown → Top Type, never → Bottom Type
- C. any → Bottom Type, void → Top Type
- D. void → Bottom Type, any → Top Type

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B**

```text
Top Type    → unknown
Bottom Type → never
```

</details>

---

### 18. Which JavaScript primitive type is a Top Type?

- A. string
- B. number
- C. boolean
- D. None of the above

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D**

Top types are TypeScript type-system concepts.

No primitive is a top type.

</details>

---

### 19. Which JavaScript primitive type is a Bottom Type?

- A. string
- B. number
- C. symbol
- D. None of the above

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D**

No JavaScript primitive is a bottom type.

`never` exists only in TypeScript's type system.

</details>

---

### 20. Which statement best summarizes `any`?

- A. Pure Top Type
- B. Pure Bottom Type
- C. Behaves like both Top and Bottom, bypassing type safety
- D. Same as unknown

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C**

```ts
let a: any;

let s: string = a;
a = s;
```

Both directions are allowed.

This is why `any` is often described as an "escape hatch" rather than a normal type in the hierarchy.

</details>

---

### 21. Which mental model is most accurate?

- A. unknown = safe any
- B. unknown = never
- C. void = any
- D. never = undefined

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

```text
any     → trust me
unknown → prove it first
```

That's the easiest way to remember the difference.

</details>

---

### 22. Which hierarchy is closest to TypeScript's type system?

- A. never → string → unknown
- B. unknown → string → never
- C. string → never → unknown
- D. string → unknown → never

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A**

Think of it as:

```text
        unknown
           ↑
        string
           ↑
        never
```

Values flow upward.

Assignments flow downward.

</details>
