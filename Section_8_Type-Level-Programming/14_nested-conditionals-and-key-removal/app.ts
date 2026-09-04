// ============================================================
// 1. Conditional Types
// ============================================================

// T extends string ? "string"
//      ↓
// If T is a string → "string"
//
// T extends number ? "number"
//      ↓
// If T is a number → "number"
//
// T extends boolean ? "boolean"
//      ↓
// If T is a boolean → "boolean"
//
// Otherwise → "Other"

type Nested<T> =
  T extends string
    ? "string"
    : T extends number
      ? "number"
      : T extends boolean
        ? "boolean"
        : "Other";

type StringNumberAndBoolean1 = Nested<"Varun">; // "string"
type StringNumberAndBoolean2 = Nested<12>;      // "number"
type StringNumberAndBoolean3 = Nested<true>;    // "boolean"
type StringNumberAndBoolean4 = Nested<{}>;      // "Other"


// ============================================================
// 2. Key Remapping in Mapped Types
// ============================================================

type User = {
  name: string;
  age: number;
  isValid: boolean;
  password: string;
  address: string;
};


// keyof User → "name" | "age" | "isValid" | "password" | "address"
//
// `as` allows us to transform/remap each key.
//
// Capitalize<K> → makes the first character uppercase.
//
// `get${...}` → creates a new key like:
// name     → getName
// age      → getAge
// isValid  → getIsValid
//
// The value becomes a function returning the original property's type.

type T = {
  [K in keyof User as `get${Capitalize<K>}`]: () => User[K];
};

/*
type T = {
  getName: () => string;
  getAge: () => number;
  getIsValid: () => boolean;
  getPassword: () => string;
  getAddress: () => string;
}
*/


// ============================================================
// 3. Removing Keys Using `never`
// ============================================================

// `never` means this key should NOT exist.
//
// So every key gets mapped to `never`,
// therefore no properties are created.

type T2 = {
  [K in keyof User as never]: () => User[K];
};

// type T2 = {}


// ============================================================
// 4. Remove a Specific Key
// ============================================================

// If the key is "password" → map it to `never` → remove it.
//
// Otherwise → keep the original key.

type RemovePassword = {
  [K in keyof User as K extends "password" ? never : K]: User[K];
};

/*
type RemovePassword = {
  name: string;
  age: number;
  isValid: boolean;
  address: string;
}
*/


// ============================================================
// 5. Remove Keys Whose Value Type is `string`
// ============================================================

// Check the VALUE type instead of the key.
//
// If User[K] extends string:
//      → `never` → remove the key
//
// Otherwise:
//      → keep the key

type RemoveStringKeys = {
  [K in keyof User as User[K] extends string ? never : K]: User[K];
};

/*
type RemoveStringKeys = {
  age: number;
  isValid: boolean;
}
*/


// ============================================================
// 6. Remove Keys Whose Value Type is `string` OR `number`
// ============================================================

// First check if the value is string.
// If yes → remove it.
//
// Otherwise check if the value is number.
// If yes → remove it.
//
// Otherwise → keep the key.

type RemoveStringAndNumber = {
  [K in keyof User
    as User[K] extends string
      ? never
      : User[K] extends number
        ? never
        : K
  ]: User[K];
};

/*
type RemoveStringAndNumber = {
  isValid: boolean;
}
*/


// ============================================================
// 7. Recursive Mapped Type
// ============================================================

// The same logic can be applied recursively to nested objects.
//
// 1. If the property's value is string → remove the key.
//
// 2. Otherwise, if the property's value is an object:
//      → recursively call DeepStringRemoval<T[K]>
//
// 3. Otherwise:
//      → keep the property as it is.
//
// This allows us to remove string properties at ANY nesting level.

type DeepStringRemoval<T> = {
  [K in keyof T as T[K] extends string ? never : K]:
    T[K] extends object
      ? DeepStringRemoval<T[K]>
      : T[K];
};


type User2 = {
  name: string;
  age: number;
  designation: string;

  address: {
    country: string;
    state: string;
    city: string;
  };

  isValidUser: boolean;
};


type Result = DeepStringRemoval<User2>;

/*
type Result = {
  age: number;

  address: {};

  isValidUser: boolean;
}
*/


// ============================================================
// IMPORTANT PATTERN TO REMEMBER
// ============================================================

// Mapped type:
// [K in keyof T]
//
// Key remapping:
// [K in keyof T as CONDITION ? never : K]
//
// Recursive mapped type:
// T[K] extends object
//   ? DeepStringRemoval<T[K]>
//   : T[K]
//
// So the overall idea is:
//
//        Check the key
//             ↓
//    Should it be removed?
//       ↙           ↘
//     yes            no
//      ↓              ↓
//    never      Is value an object?
//                    ↓
//              ↙           ↘
//            yes            no
//             ↓              ↓
//          recurse        keep value