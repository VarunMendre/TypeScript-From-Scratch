## 1. Structural Typing (TypeScript, Python, Golang, etc)

Structural typing is often called "Duck Typing".

> “If it looks like a duck, walks like a duck, quacks like a duck, it is a duck.”

Type compatibility is based on **shape**, not name.

---

### Example

```ts
type User = {
  id: number;
  name: string;
};

type Person = {
  id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: "Anurag",
};

const person: Person = user; // ✅ allowed
```

Even though:

- `User` ≠ `Person` (different names)

Still allowed because:

- structure is the same

---

### Another example

```ts
type User = {
  id: number;
  name: string;
};

const obj = {
  id: 1,
  name: "Anurag",
  age: 80,
};

const user: User = obj; // ✅ allowed
```

Because:

- required properties exist
- extra properties are ignored (in structural typing)

---

## 2. Nominal Typing (Java, C#, C++, etc)

> “A duck is only a duck if it is explicitly declared as a duck.”

Type compatibility is based on **name/identity**, not shape.

---

### Example (conceptual)

```ts
// Imagine TypeScript was nominal

type User = {
  id: number;
  name: string;
};

type Person = {
  id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: "Anurag",
};

const person: Person = user; // ❌ ERROR in nominal typing
```

Even though structure is same,

- names are different → not allowed

---

# 🔥 Core Difference

| Feature                        | Structural Typing      | Nominal Typing          |
| ------------------------------ | ---------------------- | ----------------------- |
| Based on                       | Shape                  | Name / Identity         |
| Same structure, different name | ✅ Allowed             | ❌ Not allowed          |
| Extra properties               | Usually allowed        | Usually restricted      |
| Used in                        | TypeScript, JavaScript | Java, C#, Rust (mostly) |

---

# 🎯 Why TypeScript chose Structural Typing

Because JavaScript works like this:

```js
function printName(obj) {
  console.log(obj.name);
}

printName({ name: "Anurag", age: 80 }); // valid JS
```

TypeScript had to match JavaScript behavior.

---

# ⚠️ Where confusion happens

This 👇 looks like nominal typing but is not:

```ts
const user: User = {
  id: 1,
  name: "Anurag",
  age: 80, // ❌ error
};
```

You might think:

> “Oh, TS is strict → maybe nominal?”

But actually:  
👉 This is **excess property checking**, not nominal typing. Excess property check happens when we directly assign object literals.

---

# 🧩 Can we simulate Nominal Typing in TypeScript?

Yes, using **branding**

---

## 🔒 Branded Type Example

```ts
type UserId = number & { __brand: "UserId" };
type ProductId = number & { __brand: "ProductId" };

const userId = 1 as UserId;
const productId = 1 as ProductId;

const x: UserId = productId; // ❌ error
```

Even though both are numbers,

- they are treated as different types

---

# 🧠 Simple intuition

### Structural typing

> “Do you have the required properties?”

### Nominal typing

> “Who are you exactly?”

---

# 💡 One-liner

> TypeScript checks **what you have**, not **what you are called**.

---

https://www.typescriptlang.org/docs/handbook/type-compatibility.html

https://youtu.be/j-b8zbi37v4
https://en.wikipedia.org/wiki/Duck_test
https://dev.to/rafaeljohn9/if-it-quacks-like-a-duck-1fl8





📘 TypeScript Revision Notes: Structural Typing & Checks
1. Structural Typing (Duck Typing)

TS checks shape/structure, not names.
Rule: If Object A has at least the properties of Type B, it is assignable.
Extra properties are allowed when assigning variables.
const wide = { name: "A", age: 20 };
const narrow: { name: string } = wide; ✅ (Valid)
2. Excess Property Checks (The "Freshness" Rule)

Trigger: Only happens when assigning an Object Literal directly to a target type.
Purpose: Catches typos in new objects.
Behavior:
func({ name: "A", age: 20 }) ❌ (Error: age is excess)
const obj = { name: "A", age: 20 }; func(obj); ✅ (Valid: obj is not "fresh")
3. The {} Type

Definition: Represents any non-nullish value.
Includes: Primitives (string, number, boolean), Objects, Arrays, Functions.
Excludes: null and undefined.
Note: Do not confuse {} (non-nullish) with object (non-primitive) or Record<key, never> (empty object).
4. Quick Comparison

Scenario	Code	Result	Why?
Direct Literal	const x: Type = { a: 1, b: 2 }	❌ Error	Excess Property Check fails on b.
Via Variable	const y = { a: 1, b: 2 }; const x: Type = y;	✅ Valid	Only structural check (has a).
Nullish Check	const z: {} = null	❌ Error	{} excludes null/undefined.
Primitive Check	const w: {} = "hello"	✅ Valid	Strings are non-nullish.

5. Key Takeaway

"TypeScript cares about what you have (structure), not what you are called (name). But be careful with fresh objects—they get inspected strictly!"