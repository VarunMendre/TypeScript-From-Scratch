# Section 1: Introduction to TypeScript

## Table of Contents

- [Section 1.5](#section-15)
- [Section 1.6](#section-16)

## Section: 1.5

### 1. TypeScript is a **\_\_\_\_**?

- A. Runtime Environment
- B. Database
- C. Programming Language
- D. Web Browser

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. Programming Language**

TypeScript is a `statically typed programming language` developed by `Microsoft`. It is a superset of JavaScript and compiles to plain JavaScript.

</details>

---

### 2. VS Code uses **\_\_\_\_** for TypeScript IntelliSense?

- A. tsc
- B. tsserver
- C. Node.js
- D. Extension

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. tsserver**

VS Code uses `tsserver (TypeScript Server)` to provide editor features such as autocomplete, type checking, go-to-definition, rename symbol, and auto imports.

</details>

---

### 3. We can add **\_\_\_\_** to enable type checking in a JavaScript file?

- A. // @ts-check
- B. // @js
- C. // @types
- D. // @strict

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A. // @ts-check**

Adding `// @ts-check` at the top of a JavaScript file enables TypeScript-powered type checking and error reporting for that file.

## </details>

## Section 1.6

### 1. Who were the key people involved in the creation of TypeScript?

- A. Steve Lucco
- B. Anders Hejlsberg
- C. Steve Lucco, Luke Hoban and Anders Hejlsberg
- D. Brendan Eich

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **C. Steve Lucco, Luke Hoban and Anders Hejlsberg**

TypeScript was created at Microsoft with **Anders Hejlsberg** (creator of C# and Turbo Pascal) leading the project, along with key contributions and support from **Steve Lucco and Luke Hoban** and other members of the TypeScript team.

</details>

---

### 2. Which of the following design principles guided the creation of TypeScript?

- A. TypeScript will not replace JavaScript
- B. TypeScript will be a strict superset of JavaScript
- C. TypeScript's type system will be optional
- D. TypeScript compiles back to JavaScript
- E. All of the above

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **E. All of the above**

The TypeScript team designed the language around several core principles:

1. TypeScript would **not replace JavaScript**.
2. TypeScript would be a **strict superset of JavaScript**.
3. Type annotations would be **optional**.
4. TypeScript code would always **compile to JavaScript**.

These principles helped ensure easy adoption by existing JavaScript developers.

</details>

---

### 3. Which of the following was a source code hosting service fully owned by Microsoft?

- A. CodePlex
- B. GitHub
- C. GitLab
- D. Bitbucket

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **A. CodePlex**

**CodePlex** was Microsoft's own open-source project hosting platform before it was retired in 2017.

Although Microsoft owns GitHub today, GitHub started as an independent company and was acquired by Microsoft in 2018.

</details>

---

### 4. How do you install TypeScript support for a JavaScript package that is written in JavaScript?

- A. npm install package-types
- B. npm install @types/package-name
- C. npm install ts-package
- D. npm install package-ts

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. npm install @types/package-name**

Many JavaScript libraries do not ship with TypeScript type definitions. In such cases, community-maintained type definitions can be installed using:

```bash
npm install -D @types/package-name
```

Example:

```bash
npm install -D @types/lodash
```

Most of these type definitions are maintained in the **DefinitelyTyped** repository:

https://github.com/DefinitelyTyped/DefinitelyTyped

</details>

---

### 5. Which of the following were major competitors to TypeScript during its early years?

- A. Dart (Google)
- B. Flow (Facebook)
- C. CoffeeScript
- D. All of the above

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **D. All of the above**

During its early adoption period, TypeScript competed with:

- **Dart** (developed by Google)
- **Flow** (developed by Facebook)
- **CoffeeScript** (a language that transpiled to JavaScript)

Among these, Flow became TypeScript's closest direct competitor in static typing for JavaScript.

</details>

---

### 6. What was the initial codename for TypeScript during development?

- A. JavaScript++
- B. Strada
- C. ScriptSharp
- D. ECMAScript+

<details>
<summary>Show Answer & Explanation</summary>

✅ Correct Answer: **B. Strada**

Before its public release as TypeScript, the project was internally known at Microsoft by the codename **Strada**.

The language was officially announced as **TypeScript** in 2012.

</details>

### 7. Assignment

> Create a folder and multiple `.js` files within it and enable TypeScript type checking for the entire folder at once.

<details>
<summary>Answer</summary>

Instead of adding `// @ts-check` to every JavaScript file individually, we can enable TypeScript type checking for the entire project using either a `jsconfig.json` or a `tsconfig.json` file at the root of the folder.

### Option 1: Using `jsconfig.json`

```json
{
  "compilerOptions": {
    "checkJs": true
  }
}
```

This is a lightweight configuration intended for JavaScript-only projects. With `checkJs: true`, TypeScript will type-check all included `.js` files in the project.

### Option 2: Using `tsconfig.json`

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true
  }
}
```

This approach is commonly used when a project may gradually migrate from JavaScript to TypeScript. The `allowJs` option allows JavaScript files to be part of the TypeScript project, while `checkJs` enables type checking for those files.

</details>

---
