// ==========================================
// 1. Fixed Object Types vs. Index Signatures
// ==========================================

// Defines a strict object structure with exactly three known properties.
type Scores = {
  game: string;
  point: number;
  isRainy: boolean;
};

/*
const score1: Scores = {
  // Only 'game', 'point', and 'isRainy' are allowed here.
  // Excess properties will cause an error.
};
*/

// To allow dynamic fields where keys are unknown but values share the same type,
// we use an Index Signature.
type GamesPrice = {
  [name: string]: number;
};

const gamesDetails: GamesPrice = {
  gta: 5000, // Allowed (string key, number value)
  callOfDuty: 8000, // Allowed
  // maxPayne: "500$", // Error: Type 'string' is not assignable to type 'number'
  8: 85, // Allowed: Numeric keys are implicitly converted to strings in JS objects
};

// ==========================================
// 2. Numeric Index Signatures
// ==========================================

// Defines an object where keys must be numbers (or stringifiable numbers) and values are strings.
type GamesPrice2 = {
  [name: number]: string;
};

const gamesDetails2: GamesPrice2 = {
  8: "85", // Allowed
  // 9: 100, // Error: Value must be a string
};

// ==========================================
// 3. Keyof Behavior with Index Signatures
// ==========================================

// For a numeric index signature, keyof returns only 'number'.
type T1 = keyof GamesPrice2; // type T1 = number

// For a string index signature, keyof returns 'string | number'.
// Reason: In JavaScript, you can access a string-indexed object using a number (e.g., obj[123]),
// as the number is coerced to a string.
type T2 = keyof GamesPrice; // type T2 = string | number

// ==========================================
// 4. Indexed Access Types
// ==========================================

// Accessing the element type of an array using [number].
type U = string[][number]; // type U = string (The type of an element in a string array)
type U1 = Array<string>[number]; // type U1 = string

// Accessing the value type of an index signature using [string].
type V = GamesPrice[string]; // type V = number (Accessing any string key returns a number)

// ==========================================
// 5. Mixing Explicit Properties and Index Signatures
// ==========================================

type V1 = {
  [name: number]: string; // Index signature: all numeric keys map to string
  des: string; // Allowed: 'des' is compatible (string)
  rating: number; // Allowed: Even though 'rating' is a number, it's a valid property name.
  // Note: If accessed via index (e.g. obj[rating]), it expects a string.
  isGreeted: boolean; // Allowed as a specific property
  isOk: unknown; // Allowed
};

type V2 = {
  [name: string]: number; // Index signature: all string keys must map to number
  rating: number; // Allowed: Compatible with the index signature (number)
  // bio: string;         // Error: Property 'bio' is incompatible. Index signature requires 'number', but 'bio' is 'string'.

  // Optional properties with index signatures:
  // You cannot make a specific property optional (e.g., contact?: number) unless the index signature
  // also allows 'undefined'. This is because the index signature implies ANY string key could exist
  // and return 'undefined' if not set.
  contact?: number; // Error unless index signature is: [name: string]: number | undefined
};

// Correct way to allow optional properties:
type V2Fixed = {
  [name: string]: number | undefined;
  rating: number;
  contact?: number; // Now allowed because the index signature accepts 'undefined'
};

// ==========================================
// 6. Valid vs. Invalid Key Types
// ==========================================

// Valid: Keys can be string, number, or symbol.
type W = {
  [name: string | number | symbol]: string;
};

// Invalid: 'undefined' cannot be an object key in JavaScript.
// Error: "A computed property name must be of type 'string', 'number', 'symbol', or a template literal."
/*
type X = {
  [name: string | number | symbol | undefined]: string; 
};
*/

// You cannot use a type alias directly as the parameter type in an index signature definition like this:
type X1 = string | number | symbol;
/*
type X2 = {
  [name: X1]: string; // Error: Index signature parameter type must be a primitive, not a type alias reference in this context (depending on TS version/strictness).
                      // Best practice: Write the union directly as shown in type W.
};
*/
