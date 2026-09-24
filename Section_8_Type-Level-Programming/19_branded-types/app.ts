// ============================================================
// Branded Types in TypeScript
// ============================================================

/*  — Revision Notes :
  Structural typing: "does it look the same?"
    → Compatible if same shape; name doesn't matter.

  Nominal typing: "is it declared the same?"
    → Compatible only by explicit declaration.

  TypeScript is structural, so `type UserId = number` and
  `type OrderId = number` are interchangeable.

  Branded types fix this by injecting a hidden tag,
  simulating nominal safety inside a structural system.
*/

// --- The Problem ---

type UserId = string;
type CourseId = string;

const userId: UserId = "user_123";
const courseId: CourseId = "course_456";

const id: UserId = courseId;
// ✅ Allowed because both are `string` under the hood.
// ❌ Logically wrong — will cause unexpected runtime behavior.

// --- Branded Types (Intersection Approach) ---

// We use an intersection to add a hidden `__brand` property,
// making each type structurally unique.

type UserID = string & { __brand: "UserID" };
type CourseID = string & { __brand: "CourseID" };

type T = CourseID["__brand"]; // "CourseID"

// const a: UserID = "userid_123";
// ❌ Type 'string' is not assignable to type 'UserID'.

// Use `as` assertion when you're confident the value is valid.
const userID = "userId_123" as UserID;
const courseID = "courseId_321" as CourseID;

// const newCourseId: CourseID = userID;
// ❌ Type 'UserID' is not assignable to type 'CourseID'.

// --- Practical Example ---

type FirstName = string & { __brand: "FirstName" };
type LastName = string & { __brand: "LastName" };

function echoFullName(first: FirstName, last: LastName): string {
  return `${first}, ${last}`;
}

const firstName = "varun" as FirstName;
const lastName = "mendre" as LastName;

// echoFullName(lastName, firstName);
// ❌ Argument of type 'LastName' is not assignable to parameter of type 'FirstName'.

echoFullName(firstName, lastName); // ✅

// --- Generic Brand (avoids repetition) ---

type BrandForString<T, BrandName extends string> = T & {
  __brand: BrandName;
};

type Company1 = BrandForString<string, "Amazon">;
type Company2 = BrandForString<string, "Google">;

const cmp1 = "Microsoft" as Company1;
const cmp2 = "Meta" as Company2;

// const newCmp: Company1 = cmp2;
// ❌ Type 'Company2' is not assignable to type 'Company1'.

// --- Stronger Version: `unique symbol` ---

// Plain symbols are still assignable to each other:
let a: symbol = Symbol();
let b: symbol = a; // ✅ allowed

// `unique symbol` prevents this — but the variable must be `const`:
// let a1: unique symbol = Symbol(); // ❌ must be 'const'

const a1: unique symbol = Symbol();
// const b1: unique symbol = a1; // ❌ 'symbol' is not assignable to 'unique symbol'
const b3: symbol = a1; // ✅ upcast to plain symbol is fine

// `declare` lets you declare a variable without initializing it.
// (Useful for ambient declarations or compile-time-only values.)
declare const uniqueBrand: unique symbol;

type UniqueBrandForString<T, BrandName extends string> = T & {
  readonly [uniqueBrand]: BrandName;
};

type Id = UniqueBrandForString<string, "Amazon">;

// Factory function with runtime validation
function uniqueEmployeeId(value: string): Id {
  if (!value.startsWith("emp_")) {
    throw new Error("Id must start with 'emp_'");
  }
  return value as Id;
}

// const u1 = uniqueEmployeeId("user_1235"); // 💥 runtime error
const emp1 = uniqueEmployeeId("emp_123"); // ✅
