function createFunction<T>() {
  type Demo = T extends string ? "Yes" : "No";

  return function (value: Demo) {
    console.log(value);
  };
}

// 1. true
type T1 = string extends unknown ? "Yes" : "No"; // type T1 = "Yes"

// 2. false
type T2 = unknown extends string ? "Yes" : "No"; // type T2 = "No"

// 3. union
type A = any extends string ? "Yes" : "No"; // type A = "Yes" | "No"

// 4. defered
const funcValue = createFunction<string>(); // (value: "Yes") => void

// 5. distributive (but how it works ??)

type Test<T> = T extends string ? never : T;
type Test2 = Test<string | number | boolean | undefined>; // type Test2 = number | boolean | undefined

// Test<string>  -> never | Test <number>  -> number | Test <boolean> -> boolean | Test <undefined> -> undefined
