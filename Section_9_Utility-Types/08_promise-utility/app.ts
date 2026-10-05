// ─────────────────────────────────────────────
// 1. BUILT-IN Awaited<T> (TS 4.5+)
// ─────────────────────────────────────────────

// Basic: unwraps a single Promise
type A = Awaited<Promise<string>>; // string

// Recursive: unwraps nested Promises
type B = Awaited<Promise<Promise<number>>>; // number

// Non-Promise: passes through unchanged
type C = Awaited<string>; // string

// Union: distributes over each member
type D = Awaited<Promise<boolean> | string>; // boolean | string

// ─────────────────────────────────────────────
// 2. Awaited in a GENERIC context
// ─────────────────────────────────────────────

// Generic async wrapper: T is the *return type* of the async function
// Awaited<ReturnType<F>> extracts the resolved value type
async function run<F extends (...args: any[]) => any>(
  fn: F,
  ...args: Parameters<F>
): Promise<Awaited<ReturnType<F>>> {
  const result = await fn(...args);
  return result; // result: Awaited<ReturnType<F>>
}

// Usage:
async function getUser(): Promise<{ id: number; name: string }> {
  return { id: 1, name: "Alice" };
}

run(getUser).then(user => {
  // user: { id: number; name: string }  ← Awaited unwrapped the Promise
  console.log(user.name);
});

// Even with a nested promise, Awaited fully resolves it:
async function getNested(): Promise<Promise<string>> {
  return Promise.resolve("hello");
}

run(getNested).then(val => {
  // val: string (not Promise<string>!)
  console.log(val.toUpperCase());
});

// ─────────────────────────────────────────────
// 3. Promise.all + Awaited (the real-world use case)
// ─────────────────────────────────────────────

declare function MaybePromise<T>(value: T): T | Promise<T> | PromiseLike<T>;

async function doSomething(): Promise<[number, number]> {
  const result = await Promise.all([
    MaybePromise(100),
    MaybePromise(200),
  ]);
  // result: [number, number]  ← Awaited unwraps each element
  return result;
}

// ─────────────────────────────────────────────
// 4. CUSTOM MyAwaited — step by step
// ─────────────────────────────────────────────

type MyAwaited<T extends PromiseLike<any>> =
  T extends PromiseLike<infer U>   // Step 1: extract the inner type U
    ? U extends PromiseLike<any>   // Step 2: is U itself a promise?
      ? MyAwaited<U>               // Step 3a: yes → recurse
      : U                          // Step 3b: no → return final value
    : never;                       // unreachable (guaranteed by constraint)

// How it resolves:

// MyAwaited<Promise<string>>
//   T = Promise<string>
//   → extends PromiseLike<infer U> ?  U = string
//   → string extends PromiseLike<any> ?  No
//   → return string ✓

// MyAwaited<Promise<Promise<number>>>
//   T = Promise<Promise<number>>
//   → extends PromiseLike<infer U> ?  U = Promise<number>
//   → Promise<number> extends PromiseLike<any> ?  Yes
//   → recurse: MyAwaited<Promise<number>>
//       → U = number
//       → number extends PromiseLike<any> ?  No
//       → return number ✓

// ─────────────────────────────────────────────
// 5. Why the built-in is more robust
// ─────────────────────────────────────────────
// The real Awaited handles edge cases your custom type misses:
//   • Non-thenable objects with a `then` method (e.g. AbortController-like types)
//   • `null | undefined` passthrough
//   • Unions of Promise and non-Promise
//
// For most type-challenge / learning purposes, MyAwaited is equivalent.   