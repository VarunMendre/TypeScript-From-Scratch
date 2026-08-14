# TypeScript Generics — Revision Notes
*(Based on Section 7: Generics, TypeScript-From-Scratch)*

---

## 1. What Are Generics?
Generics let you write reusable, type-safe code (functions, types, interfaces, classes) that works with **many types** instead of one fixed type, using a placeholder type parameter like `<T>`.

- **Reusability** – one implementation, many types.
- **Type safety** – errors caught at compile time, no need for `any`.
- **Inference** – TS often figures out `T` automatically from the value passed.

```ts
type DynamicType<T> = T[];
let a: DynamicType<number> = [10, 20];       // number[]
let b: DynamicType<string | number> = ["10"]; // (string|number)[]

function swap<T>(a: T, b: T): [T, T] {
  return [b, a];
}
```

**Real-world pattern:** a generic `FormData<Data>` type avoids writing `RegistrationFormState`, `LoginFormState`, etc. separately:
```ts
type FormData<Data> = { isValid: boolean; data: Data };
type LoginForm = { email: string; password: string };
const loginForm: FormData<LoginForm> = { isValid: true, data: { email: "a@b.com", password: "x" } };
```

---

## 2. Generic Interfaces
Interfaces can take type parameters the same way type aliases do — useful for shapes reused across different data payloads.

```ts
interface FormData<Data> {
  isValid: boolean;
  data: Data;
}
interface RegistrationForm { name: string; email: string; password: string }

const registrationForm: FormData<RegistrationForm> = {
  isValid: true,
  data: { name: "Varun", email: "v@gmail.com", password: "123" },
};
```

---

## 3. Generic Functions & Type Inference
`<T>` on a function captures the passed-in type and reuses it for the return type — much better than `any`.

```ts
function greet<T>(a: T): T { return a; }

const a = greet(1);         // inferred literal type: 1 (const → narrow)
let c = greet(4);           // inferred widened type: number (let → widened)
const b = greet<number>(52); // explicit type argument overrides inference
```

**Key distinction:** `<number>` = *type argument* (compile-time), `(52)` = *function argument* (runtime).

---

## 4. Four Ways to Write a Generic Function
Same idea, different syntax:

```ts
function greet<T>(name: T): T { return name; }              // declaration
const greet1 = function <T>(a: T): T { return a; };          // expression
const greet2 = <T>(a: T): T => a;                             // arrow fn

type GreetType = <T>(a: T) => T;                              // generic type alias (call signature)
interface GreetInterface { <T>(a: T): T; }                    // generic interface (call signature)
```

**Important distinction:**
- `GreetInterface`: the *function itself* is generic → caller picks `T` on every call.
- `interface BaseInterface<T> { (a: T): T }`: the *interface* is generic → `T` is fixed once, when the variable is declared.

```ts
interface BaseInterface<T> { (a: T): T }
const greet5: BaseInterface<string> = (a) => a; // T locked to string
```

---

## 5. Multiple Type Parameters
Functions/types can take more than one type parameter (`<T, U, V>`).

```ts
type DynamicTuple<T, U, V> = [T, U, V];
let b: DynamicTuple<string, number, number> = ["Varun", 22, 77];

function swapTuple<T, U>(a: T, b: U): [U, T] {
  return [b, a];
}
const [first, second] = swapTuple<number, string>(2, "4"); // first: "4", second: 2
```

Note: `T & U` (intersection) on unrelated primitives (`string & number`) collapses to `never`, since no value can satisfy both.

---

## 6. Practical Generic Utilities (map / filter / merge)
This is where generics shine — reimplementing array/object utilities with full type safety.

```ts
// merge two objects, preserving both shapes
function mergeObjects<T, U>(a: T, b: U): T & U {
  return { ...a, ...b };
}

// generic map: T[] -> U[]
function myFunc<T, U>(arr: T[], cb: (a: T) => U): U[] {
  return arr.map(cb); // conceptually
}
const doubled = myFunc<number, number>([1,2,3], v => v * 2);

// generic filter: T[] -> T[] (type never changes, only element count)
function myFilter<T>(arr: T[], cb: (item: T) => boolean): T[] {
  return arr.filter(cb);
}
```
**Insight:** `map` needs two type params (`T` in, `U` out) because it can transform the type; `filter` needs only one because it only selects, never transforms.

---

## 7. Default Type Parameters
Give a generic parameter a fallback type with `<T = DefaultType>`, used only when TS can't infer and none is given explicitly.

```ts
type DynamicType2<T = string> = T[];
let arr: DynamicType2 = [];        // T = string (default used)
let arr2: DynamicType2<number> = []; // explicit type overrides default
```

Rules:
- Once a parameter has a default, **all following parameters must also have defaults** (`required after optional` is an error).
- Defaults are ignored the moment you pass an explicit argument, or when TS can infer from usage.
- Useful with optional params: `function echo<T = string>(para?: T)` lets `echo()` work and returns `string | undefined`.

---

## 8. Generic Constraints (`extends`)
Restrict what a type parameter can be using `<T extends SomeType>` — "T must be assignable to SomeType" (structural, **not** class inheritance).

```ts
type DObj<T extends { name: string }> = T;

const ok: DObj<{ name: string; age: number }> = { name: "Varun", age: 22 }; // ✅ extra props fine
```

Interesting structural cases:
- Functions satisfy `{ name: string }` and `{ length: number }` because JS function objects natively have `.name` and `.length`.
- `{}` satisfies `{ toString(): string }` because every object inherits `toString()` from `Object.prototype`.
- Constraint can reference another type parameter: `<T extends U, U>` — T's constraint depends on whatever U is set to.

```ts
function print<T extends U, U>(a: T) { return a; }
print<() => void, { name: string; length: number }>(() => {}); // ✅ functions have name & length
```

---

## 9. Generic Methods (type parameter scoped to a method)
A method inside a generic interface/type can introduce its **own** additional type parameter, independent of the interface's parameter.

```ts
type Callback<T, U> = (item: T) => U;

interface Store<T> {
  list: T[];
  echoList<U>(index: number, callbackFn: Callback<T, U>): U; // U is local to this method
}

const fruitStore: Store<string> = {
  list: ["apple", "banana"],
  echoList(index, cb) { return cb(this.list[index]); },
};

fruitStore.echoList(1, item => item.toUpperCase()); // U inferred as string here
```
This lets one `Store<T>` instance be called with different transform types on each call.

---

## 10. Nested Generics
Generic types can be nested inside one another to model layered data structures.

```ts
type NestedGeneric<T> = { value: T };
let b: NestedGeneric<NestedGeneric<number>>;
// { value: { value: number } }

type Address<T> = { country: string; state: string; details: T };
type Details<U> = { city: U; street: U };
let c: Address<Details<string>>;
// { country: string; state: string; details: { city: string; street: string } }
```

---

## 11. Recursive Generics
A generic type can reference itself — useful for tree/linked structures. Must include an optional (`?`) or terminating case, otherwise you're forced to nest infinitely.

```ts
type RecursiveGeneric<T> = {
  value?: RecursiveGeneric<T>;  // optional lets nesting terminate anywhere
};

const obj: RecursiveGeneric<string> = { value: { value: {} } }; // ✅ no error
```

**Practical example** — typed adjacency list for a graph:
```ts
type AdjacencyList<T, W> = Map<T, { target: T; weight: W }[]>;

const graph: AdjacencyList<number, number> = new Map([
  [1, [{ target: 2, weight: 3 }]],
  [2, [{ target: 3, weight: 4 }]],
]);
```

---

## 12. Built-in Generics
Many native constructs are generic under the hood: `Array<T>`, `Map<K, V>`, `Set<T>`, `Readonly<T>`, `ReadonlyArray<T>`, `ReadonlyMap<K,V>`, `ReadonlySet<T>`.

```ts
const arr = new Array<string>();   // instead of leaving type as 'any'
arr.push("hi");

const mpp = new Map<number, string>();
mpp.set(1, "one");

const st = new Set<string>();
st.add("a");

interface User { name: string; age: number }
const user2: Readonly<User> = { name: "Varun", age: 23 };
// user2.age = 85; ❌ Cannot assign to 'age' because it is a read-only property.
```
**Insight:** `Array`, `Map`, `Set` are generic constructors, but `Object`, `Number`, `Boolean`, `String` are **not** generic.

---

## 13. Generics With Promises
`Promise<T>` is generic — always specify it explicitly for clarity and to avoid `any`-typed resolved values.

```ts
const p1 = new Promise<string>((res) => res("Good Morning!"));
const p2 = new Promise<number>((res) => res(123));

const res1 = await p1; // typed as string
```

---

## 14. Function Overloading (vs. Generics)
Overloading lets one function name have **multiple call signatures** with genuinely different logic per type — unlike generics, where the logic stays identical across types.

```ts
function myFunc(a: string): string;
function myFunc(a: number): number;
function myFunc(a: any): any {
  if (typeof a === "number") return a ** 2;
  if (typeof a === "string") return a.toUpperCase();
}

const s = myFunc("hi"); // type: string
const n = myFunc(5);    // type: number
```

**Rules:**
- Declare all overload signatures first, then one implementation signature (broad, e.g. `any`) that satisfies all of them.
- Nothing (variables, other declarations) may sit between the overload signatures and the implementation.
- Works for class methods too.

**When to choose which:**
| Use Overloading | Use Generics |
|---|---|
| Logic differs meaningfully per type | Logic is identical, only the type changes |
| e.g. parse string → object vs number → string | e.g. `identity<T>(value: T): T` |

---

## 15. `const` Modifier in Type Parameters
Normally, generic inference **widens** array/object literals (`number[]`, not a tuple; `string`, not the exact string).

```ts
function greet<T>(value: T) { return value; }

const result4 = greet([1, 2, 3]);         // number[]
const result7 = greet([1, 2, 3] as const); // readonly [1, 2, 3] — but requires `as const` everywhere
```

The `const` modifier on the type parameter (`<const T>`, functions/methods/classes only) automatically infers literal/readonly types for non-primitive arguments — no need to sprinkle `as const` at every call site.

```ts
function greet2<const T>(value: T) { return value; }

const result10 = greet2({ name: "Varun" });
// { readonly name: "Varun" }  — inferred as literal automatically
```
Note: this only affects non-primitive arguments (objects/arrays); primitives behave the same either way.

---

## Quick Summary Table

| # | Topic | One-line takeaway |
|---|---|---|
| 1 | Intro to Generics | `<T>` = placeholder type for reusable, type-safe code |
| 2 | Generic Interfaces | Interfaces can take type params just like type aliases |
| 3 | Generic Functions | TS infers `T`; `let` widens, `const` narrows |
| 4 | Ways to write generic fns | Declaration / expression / arrow / type alias / interface |
| 5 | Multiple type params | `<T, U, V>` for tuples, merges, multi-shape objects |
| 6 | Practical use (map/filter) | Model your own type-safe array utilities |
| 7 | Default type params | `<T = Default>` — fallback only if not inferred/passed |
| 8 | Constraints (`extends`) | `<T extends X>` = "T must be assignable to X" |
| 9 | Generic methods | A method can add its own `<U>` beyond the interface's `<T>` |
| 10 | Nested generics | Generics inside generics model layered data |
| 11 | Recursive generics | Self-referencing type; needs `?` to terminate |
| 12 | Built-in generics | `Array<T>`, `Map<K,V>`, `Set<T>`, `Readonly<T>`, etc. |
| 13 | Generics with Promises | Always type `Promise<T>` explicitly |
| 14 | Function overloading | Multiple signatures, one implementation; different logic per type |
| 15 | `const` type param modifier | Auto-infers literal/readonly types without `as const` |
