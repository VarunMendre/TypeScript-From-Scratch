type T = (1 | 2 | 3) & (2 | 3 | 4);
// Result: 2 | 3

// TS mechanism: intersection means "a value must be assignable to BOTH sides."
// - Is 1 assignable to (2 | 3 | 4)? No → 1 is dropped.
// - Is 2 assignable to (2 | 3 | 4)? Yes, and also to (1|2|3) → kept.
// - Is 3 assignable to both? Yes → kept.
// - Is 4 assignable to (1|2|3)? No → dropped.
// TS checks each literal member for assignability to the other side.
// Set theory ("common elements") is just a shortcut for this same check.

type Y = (1 | 2) & (3 | 4);
// Result: never

// Same mechanism: no literal on either side is assignable to any literal
// on the other side. Zero survivors → never.
// never isn't "the empty set" by definition — it's the type TS falls back
// to when NOTHING satisfies the assignability requirement.

type Z = string | unknown;
// Result: unknown

// Union means "assignable to AT LEAST ONE side," but TS also simplifies
// unions by dropping any member that is a SUBTYPE of another member.
// string is assignable to unknown (string → unknown is a valid subtype
// relationship), so string is redundant — unknown alone already covers it.
// Z collapses to unknown.

type W = string & unknown;
// Result: string

// Intersection with unknown: unknown places NO constraint on assignability
// (literally anything is assignable to unknown). So the intersection is
// only as restrictive as the other member. TS keeps string because it's
// the more specific (narrower) type — the constraint that actually matters.

// Why any breaks this pattern:
// unknown only accepts things INTO it (everything → unknown is valid),
// but does not hand itself OUT without narrowing (unknown → string is invalid).
// This one-way relationship is what makes it a proper top type.
// any has NO direction restriction — any → string is allowed, AND
// string → any is allowed. It violates the subtyping rules entirely,
// which is why any short-circuits both union and intersection results
// (unknown | any = any, unknown & any = any) instead of following the
// normal top-type logic.

type V = never | "a" | "b";
// Result: "a" | "b"

// never is assignable to literally everything (it's the bottom type),
// but nothing is assignable to never except never itself.
// In a union, TS drops any member that's a subtype of another — never
// is a subtype of every type, so it's always redundant in a union.

type V2 = never & "a";
// Result: never

// Intersection requires a value assignable to BOTH sides.
// Nothing (except never) is assignable to never.
// So the intersection can only ever be never — it "infects" the result.

// 6.
type A = { a: number };
type B = { b: string };

// ❌ Error: Type '{ a: number; b: string; }' is not assignable to type 'A | B'.
// Explanation: The object { a: 10, b: "1" } satisfies BOTH A and B (it is type A & B).
// However, A | B expects an object that is EITHER { a: number } OR { b: string }, but not necessarily both.
// While an object with both properties IS technically assignable to A | B in some contexts,
// TypeScript's excess property checks and strict assignability rules for unions often flag this
// because the value doesn't strictly look like just one constituent type.
// More accurately: You cannot assign a specific object literal that satisfies BOTH to a union
// expecting EITHER without casting, because the compiler treats unions as exclusive possibilities
// for narrowing purposes.
const obj: A | B = {
  a: 10,
  b: "1",
};

// ✅ Correct Assignment for Intersection:
const objIntersection: A & B = {
  a: 10,
  b: "1",
};   


// 7.
type C = { a: string };
type D = { a: number };

// Intersection: 'a' cannot be both string AND number simultaneously.
// Result: type ICD = never
type ICD = C & D;

// Union: 'a' can be string OR number.
// Result: type UCD = { a: string } | { a: number }
type UCD = C | D;

// ✅ Valid for Union (must match ONE shape)
const obj2: UCD = { a: 55 }; 

// ❌ Invalid for Intersection (cannot match BOTH shapes)
// const obj1: ICD = { a: "e" }; // Error: Type 'string' is not assignable to type 'never'.


// 8.

// type E = { greet: (a: number) => number };
// type F = { greet: (a: string) => string };

// // Intersection of functions with different parameters creates an overload.
// // The resulting function must accept BOTH number AND string arguments.
// // Result: type IEF = { greet: ((a: number) => number) & ((a: string) => string) }
// type IEF = E & F;

// // Must handle both cases (overload)
// const g: IEF = {
//   greet: function (a: number | string): number | string {
//     if (typeof a === "number") return a;
//     return a;
//   },
// };



//9.

type Base = { id: number };
type WithName = Base & { name: string }; // { id: number; name: string }
type WithAge = Base & { age: number };   // { id: number; age: number }

// Intersection combines all properties. Duplicate 'id' properties (both 'number') merge safely.
// Result: type WNA = { id: number; name: string; age: number }
type WNA = WithName & WithAge;

/*
Visualizing the Set Operation:
WithName = { id, name }
WithAge  = { id, age }
Intersection = { id, name } ∩ { id, age } = { id, name, age }
(Note: In type systems, intersection of object types acts like a UNION of properties, 
because the resulting object must satisfy ALL constraints, thus containing ALL properties.)
*/   


// 10.

type I = {} | { a: number };

// ✅ Valid: 'b', 'c', 'd' are allowed because {} accepts any non-nullish object.
// The union allows anything that fits {} OR { a: number }.
// Since { a: 2, b: 55, ... } fits {}, it satisfies the union.
const bigObj: I = {
  a: 2,
  b: 55,
  c: "kk",
  d: true
};

/*
Explanation:
1. The type {} represents the set of all non-nullish objects (the "top" object type).
2. The type { a: number } is a subset of {} (a more specific set).
3. In set theory, Union(Superset, Subset) = Superset.
   Therefore, {} | { a: number } simplifies logically to {}.
4. Why does the tooltip show both? 
   Because TypeScript preserves the union structure for narrowing purposes. 
   If you check 'if ("a" in obj)', the type narrows to { a: number }. 
   If the type were simplified strictly to {}, you couldn't narrow it.
*/   
