// ============================================================================
// Types vs. Interfaces: Conceptual Comparisons & Examples
// ============================================================================

/**
 * 1. DECLARATION MERGING VS. DUPLICATION
 * * Interfaces support "Declaration Merging". If you define multiple interfaces
 * with the same name, TypeScript automatically merges their properties.
 */
interface IUser {
  name: string;
  age: number;
}

interface IUser {
  address: {
    city: string;
    state: string;
  };
}

/**
 * Type Aliases, however, do not support declaration merging.
 * Uncommenting the second 'TUser' definition below will trigger a compile error:
 * "Duplicate identifier 'TUser'."
 */
type TUser = {
  name: string;
  age: number;
};

// type TUser = {
//   address: {
//     city: string;
//     state: string;
//   }
// };

/**
 * 2. OBJECT DEFINITION TERMINOLOGY
 * * Assigning a structure directly inline creates an anonymous object type.
 */
let anonymousUser: { name: string; age: number };

/**
 * Providing a structural definition via a Type Alias creates a named object type.
 */
type NamedUserType = { name: string; age: number };

/**
 * 3. INHERITANCE: EXTENDS VS. INTERSECTIONS
 * * Interfaces use the 'extends' keyword to inherit properties from other interfaces.
 */
interface IBaseUser {
  name: string;
  age: number;
}

interface IStudent extends IBaseUser {
  collegeName: string;
  department: string;
  course: string;
}

interface IEmployee extends IBaseUser {
  company: string;
  designation: string;
}

/**
 * Type Aliases achieve composition using intersection operators (&).
 */
type TBaseUser = {
  name: string;
  age: number;
};

type TStudent = {
  collegeName: string;
  department: string;
  course: string;
} & TBaseUser;

type TEmployee = {
  company: string;
  designation: string;
} & TBaseUser;

// ============================================================================
// Documentation: Core Differences Between Types & Interfaces
// ============================================================================

/* -------------------------------------------------------------------------------
A. VISUAL & IDE HOVER DIFFERENCES
-------------------------------------------------------------------------------
1. Definitions Preview:
   - When hovering over a Type Alias, the IDE display immediately previews the 
     entire underlying structural breakdown.
   - When hovering over an Interface, the IDE display typically shows only the 
     interface name (`interface IUser`), shielding the deeper structure unless 
     explicitly expanded.

2. Structure Inspections:
   - Variables assigned to a Type Alias show their fully evaluated structural 
     definition directly on hover.
   - Variables assigned to an Interface keep the abstraction clean; you must 
     manually navigate to or expand the interface declaration to view its contents.

-------------------------------------------------------------------------------
B. FUNCTIONAL DIFFERENCES
-------------------------------------------------------------------------------
3. Duplicate Identifier Errors vs. Declaration Merging:
   - Redefining an identical Type Alias identifier throws an immediate compile 
     error: "Duplicate identifier 'TUser'."
   - Redefining an identical Interface identifier silently merges their contents.
     Hovering over the combined interface evaluates all unique attributes seamlessly:
     
     interface IUser {
         name: string;
         age: number;
         address: {
             city: string;
             state: string;
         };
     }

4. Merging Strategies (extends vs. &):
   - Interfaces cleanly expand their structural footprint via inheritance chains:
     `interface Student extends User { ... }`
   - Type Aliases bundle multi-layered entities using intersections:
     `type Student = ObjectA & ObjectB;`
   
   Regardless of the chosen strategy, an instantiated object must implement all 
   inherited and base fields to successfully compile.

5. IntelliSense & Error Reporting Behaviors:
   - When an object fails to fulfill an Interface contract, TypeScript yields a 
     comprehensive error listing all missing or mismatched fields simultaneously.
   - When an object fails to fulfill an Intersection Type contract, TypeScript's 
     compiler engine often steps through structural verification lazily. It may 
     surface validation warnings incrementally (e.g., throwing error notes for the 
     primary structure first, and only displaying remaining omissions after those 
     initial parameters are fully resolved).

6. Build & Compilation Performance Impact:
   - Utilizing intersection operators (`&`) degrades build performance over scale. 
   - Because intersections are evaluated lazily and computed recursively, the 
     TypeScript compiler (`tsc`) must continuously crawl complex dependency graphs 
     to check for nested property conflicts. 
   - Interfaces maintain a flattened internal property map cached by name, making 
     them significantly faster to parse and resolve within massive codebases.
*/
