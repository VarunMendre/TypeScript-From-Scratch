# TypeScript Practice Set — Simplified & Elaborated
### Core Constraints (`tsconfig.json`)
*   `strict: true` — Activates all strict type-checking flags (e.g., `strictNullChecks`, `noImplicitAny`).
*   `exactOptionalPropertyTypes: true` — Optional keys (`key?: value`) can only accept their defined type or be entirely absent. Explicitly assigning `undefined` will throw an error.
*   `noUncheckedIndexedAccess: true` — Accessing lookups, arrays, or index signatures automatically appends `| undefined` to the returned type, forcing safety checks.
*   `moduleDetection: force` — Forces TypeScript to treat every standalone file as an isolated module, even if it lacks `import`/`export` keywords.

---

## LEVEL 1 — EASY

### **P1 | Type Inference vs Explicit Annotation**
*   **The Task:** Create a car structure twice using two distinct strategies:
    1.  `carInferred`: Define a plain JavaScript object literal with properties `make`, `model`, and `year`. Let TypeScript figure out the types on its own.
    2.  `carAnnotated`: Create a explicit `type CarType = { ... }` definition first, then assign it to a new object.
*   **How to complete it:** Write both structures. Hover your mouse cursor over both variables in your code editor. Write a code comment explaining the exact difference in what the tooltip shows and why explicit annotations act as a strict contract compared to silent type inference.

### **P2 | Optional Property + exactOptionalPropertyTypes**
*   **The Task:** Create an object type alias named `UserProfile` that features a required `name: string` and an optional `bio?: string`. Initialize a variable of this type and explicitly try to assign `bio: undefined`.
*   **How to complete it:** Trigger the compiler error. Then, write a code comment explaining why `exactOptionalPropertyTypes` prevents this assignment. Finally, rewrite a valid version of the object by completely omitting the `bio` property key.

### **P3 | Why object Type Breaks You**
*   **The Task:** Declare a variable with the explicit, generic primitive type `object` (e.g., `let user: object = { name: "Varun" };`). On the very next line, try to read or change its property (`user.name`).
*   **How to complete it:** Observe the error message telling you the property does not exist on type `object`. Write a comment explaining that `object` only tells TS that the value is a non-primitive but says nothing about its internal shape. Below it, rewrite the code using a proper inline shape definition (`{ name: string }`) to fix it.

### **P4 | Declaration Merging — Does It Work Here?**
*   **The Task:** Attempt to define the same type identifier twice using two different keywords:
    1.  Try duplicating a Type Alias: Write `type Config = { host: string }` and immediately below it write `type Config = { port: number }`.
    2.  Try duplicating an Interface: Write `interface AppConfig { host: string }` and immediately below it write `interface AppConfig { port: number }`.
*   **How to complete it:** Notice which one crashes with a "Duplicate identifier" error and which one cleanly merges. Write a code comment explaining why this behavior marks the absolute biggest functional difference between types and interfaces.

### **P5 | moduleDetection: force — What It Prevents**
*   **The Task:** Simulate a multi-file workspace setup. In two completely separate dummy code blocks (e.g., representing `app.ts` and `index.ts`), write the exact same line of code: `let appName: string = "OrderXpress";` without using any `import` or `export` keywords.
*   **How to complete it:** Write a comment explaining what error would break your build if `moduleDetection: force` was turned off (global namespace pollution/redeclaration conflicts) and why this flag makes the code perfectly valid by isolating each file's global scope.

---

## LEVEL 2 — MEDIUM

### **P6 | extends vs & — Same Result, Different Cost**
*   **The Task:** Construct an identical composite object shape using two different approaches:
    1.  Using Interface Inheritance: Create an interface `Person` and an interface `Employee` that uses `extends Person`.
    2.  Using Type Intersections: Create a type `TPerson` and a type `TEmployee` that combines them using the `&` operator.
*   **How to complete it:** Instantiate one valid object for each approach. Both will look exactly the same from the outside. Write a detailed technical comment explaining why `extends` is better for massive codebases (it creates a flat cached map in the compiler) while intersections (`&`) degrade compile times because they evaluate lazily every single time.

### **P7 | Declaration Merging as a Plugin Pattern**
*   **The Task:** Assume this interface belongs to a compiled `node_modules` library that you cannot modify directly:
    ```typescript
    interface SDKEvent { name: string; timestamp: number }
    ```
    Your custom local code must inject `userId: string` and `sessionId: string` directly into this existing structure.
*   **How to complete it:** Write a code block that opens up the same `SDKEvent` interface to merge the new properties. Instantiate a full event object containing all four fields. Then, write a comment explaining why this wouldn't work if the library had exported a type alias instead.

### **P8 | Window Augmentation**
*   **The Task:** Dynamically add a custom tracking object called `appRuntime` (containing `userId: string` and `env: string`) onto the global browser `window` object.
*   **How to complete it:** Write out the exact code wrapper required to safely expand global namespaces in a module context. Your code must use:
    ```typescript
    export {}; // Forces file to be a module
    declare global {
      interface Window { /* your code here */ }
    }
    ```
    Add individual code comments explaining why missing any single one of these three elements (the export block, the global declaration, or using an interface instead of a type) completely breaks global scope augmentation.

### **P9 | Nested Optional with exactOptionalPropertyTypes**
*   **The Task:** Create an `Order` type that contains a required price, but an optional nested object called `shippingAddress?: { street: string; city: string; pincode: string; }`.
*   **How to complete it:** Write code initializing three individual variable instances:
    1.  An order with the complete address fields filled.
    2.  An order omitting the `shippingAddress` field completely.
    3.  An order that explicitly assigns `shippingAddress: undefined`.
    Write a comment explaining why the third example causes an error under your strict configurations, proving that nested optionals must be entirely present or entirely absent.

### **P10 | Intersection Type Conflict → never**
*   **The Task:** Create an impossible type intersection puzzle:
    ```typescript
    type A = { id: string }
    type B = { id: number }
    type C = A & B
    ```
*   **How to complete it:** Try creating a variable of type `C` and attempt to assign any value to the `id` field. Write a comment detailing what specific type TypeScript infers for `id` and explaining the core logic of why it turns into `never`.

---

## LEVEL 3 — HARD

### **P11 | Refactor a JS Object into a Typed Interface Hierarchy**
*   **The Task:** Take the following un-typed, deeply nested JavaScript configuration and refactor it into clean, strongly-typed TypeScript code:
    ```typescript
    const employee = { 
      id: "E01", 
      personal: { name: "Varun", contact: { email: "v@x.com", phone: null } }, 
      role: { title: "Dev", level: 2 } 
    }
    ```
*   **How to complete it:** Write at least 3 distinct named interfaces (e.g., `ContactInfo`, `PersonalInfo`, etc.) to map this structure cleanly. Because `exactOptionalPropertyTypes` is active, convert the `phone: null` value into an optional field (`phone?: string`). Initialize a fully typed variable using your final interface hierarchy.

### **P12 | Declaration Merging Conflict Rule**
*   **The Task:** Demonstrate the strict typing rules of declaration merging by coding two distinct scenarios:
    1.  **The Conflict:** Write `interface Logger { level: string }` and try to merge it with `interface Logger { level: number }`. Copy and paste the resulting compiler error message into a comment.
    2.  **The Valid Match:** Write `interface Logger { level: string }` and merge it with a matching `interface Logger { level: string; log: (msg: string) => void }`.
*   **How to complete it:** Show both code blocks. Explain the fundamental rule: merging fields with the same identifier is allowed *only* if their types are completely identical.

### **P13 | Interface vs Type Alias — The Four Real Differences**
*   **The Task:** Instead of explaining, write minimal, distinct code proofs for the four ultimate differences between types and interfaces:
    1.  **Merging Proof:** Code a successful interface declaration merge, followed by a failed type duplicate declaration.
    2.  **Composition Proof:** Code an interface utilizing `extends` vs a type using an intersection `&`.
    3.  **Global Injection Proof:** Code an interface extending `declare global` vs a type failing to do so.
    4.  **Hover Tooltip Proof:** Write an object instance for both, and add a comment describing what you see on hover (Type shows full structure inline, Interface shows only its name symbol).

---

## LEVEL 4 — VERY HARD

### **P14 | Design a Type System from a Business Requirement**
*   **The Task:** Translate this written business logic directly into an explicit type architecture:
    *   *Core Shared Properties:* Job Seekers and Employers are users and must share `id` (string), `email` (string), and `createdAt` (Date).
    *   *Job Seeker Specifics:* Must have a `resume` property containing a `skills` array of strings, an `experience` array of objects (company, years), and an `education` array of objects.
    *   *Employer Specifics:* Must have `companyName` (string), `industry` (string), and `openPositions` (number).
*   **How to complete it:** 
    1. Create a `BaseUser` interface containing the shared fields.
    2. Use `interface inheritance` (`extends`) to build out the `JobSeeker` and `Employer` models.
    3. Right below, use `declaration merging` to dynamically add a `lastLoginAt: Date` property directly onto the `BaseUser` interface.
    4. Instantiate one full object variable for a Job Seeker and one for an Employer to confirm validation passes.

### **P15 | Find and Fix All Bugs in This Type System**
*   **The Task:** Identify and fix all 5 compilation bugs hidden inside this broken script under your strict project configurations:
    ```typescript
    const type = "admin"                          
    type User = { name: string }
    type User = { role: string }                  
    
    interface Profile {
      bio?: string
      website?: string
    }
    
    const p: Profile = { bio: undefined }         
    
    const u: object = { name: "Varun" }
    console.log(u.name)                           
    
    interface Base { id: string }
    interface Admin extends Base { id: number }   
    ```
*   **How to complete it:** Comment out the bad segments, provide a brief sentence explaining exactly why each failed against your `tsconfig` setup, and write out a completely corrected, clean version of the script.

---

## LEVEL 5 — GOD LEVEL

### **P16 | Design Without a Scaffold**
*   **The Task:** Architect a highly scalable marketplace backend type engine purely from a verbal requirement outline:
    *   *Domain Blueprint:* Clients post `Projects`. Freelancers place structural `Bids` on those projects. A Client chooses a single winning `Bid`. A project moves through a strict lifecycle of state transitions (`Draft` -> `Active` -> `InDevelopment` -> `Completed`). Freelancers manage complex `Portfolios`. Clients manage payment validation metadata profiles.
*   **How to complete it:** Write the code completely from scratch without guides. You must satisfy these minimum technical milestones:
    *   Define at least 10 named types/interfaces.
    *   Implement interface inheritance at least once.
    *   Apply declaration merging at least once.
    *   Apply type intersection (`&`) at least once.
    *   Create realistic, completely instantiated object instances representing a Client, a Freelancer, a Project, and an active Bid to prove your engine compiles without errors under your strict compiler flags.

---

## DEBUGGING CHALLENGES

Write out the single code block that triggers these errors, then write the corrected code right beneath it with a comment explaining the fix.

*   **D1** — Trigger a duplicated Type Alias assignment error. Explain why changing this to an `interface` completely resolves the compilation crash.
*   **D2** — Assign an object literal to a variable typed as `object`. Try accessing one of its keys. Show both errors generated by the compiler and rewrite it utilizing an inline object shape configuration.
*   **D3** — Create a base interface with a property typed as `string`. Create a child interface extending it that attempts to overwrite that same property as a `number`. Write down the exact error message generated.
*   **D4** — Attempt to use `declare global` to inject an entry onto the `Window` scope, but write it using a `type alias` instead of an `interface`. Explain why it fails to augment.
*   **D5** — Construct a single object literal that simultaneously breaks two rules: passes a property explicitly set to `undefined` (violating `exactOptionalPropertyTypes`), and passes an unmapped excess property not defined anywhere on the shape contract.

---

## INTERVIEW QUESTIONS

Write concise answers directly below these questions in your markdown file to lock down your mental model:

*   **Q1:** "Type and interface are completely interchangeable for mapping object shapes." Name four specific engineering scenarios where this assumption is false.
*   **Q2:** What does activating `exactOptionalPropertyTypes: true` fundamentally change about how the compiler reads a `key?: string` property? Provide a before and after type layout example.
*   **Q3:** Why does the official TypeScript standard library use `interface` declarations for all DOM type systems instead of `type` aliases? What power does this grant to third-party web library creators?
*   **Q4:** What happens behind the scenes when you create an intersection (`&`) of two objects containing the same property name, but one maps it as a `string` and the other maps it as a `number`? What type does it resolve to, and why?
*   **Q5:** Your `tsconfig` explicitly enforces `moduleDetection: force`. If a workspace file contains zero `import` or `export` statements, does the compiler evaluate it as a Module or a legacy Script? What would change if you ran legacy mode?
*   **Q6:** You cannot modify an external package in `node_modules`. An interface in that library is missing an asset property you need immediately. How do you resolve this roadblock cleanly without forking the repository code?
*   **Q7:** In complex benchmarks, object intersection setups (`&`) take significantly longer to compile than interface extensions (`extends`). Explain the underlying compiler mechanism causing this performance gap.
*   **Q8:** What is "Excess Property Checking"? Does this check fire when assigning an object literal directly to a typed variable, or does it also apply if you route the assignment through an intermediate reference variable first?
*   **Q9:** Describe a real-world software architecture scenario where you would deliberately choose a `type` alias over an `interface` to handle an object structure.
*   **Q10:** A junior team member suggests: *"Let's just type this complex data object as `any` for now and refactor it later."* What specific compiler validation features completely collapse the moment `any` is assigned to an object?

---

## THE CAPSTONE PROJECT

### **Project: Smart Job Board Schema Engine**

Build the absolute type architecture layer for a marketplace engine. Do not write any runtime JavaScript logic—focus purely on complete compile-safe type definitions.

#### **Entities to Map:**
1. `JobSeeker`
2. `Employer`
3. `JobPost`
4. `Application`
5. `Interview`
6. `Notification`

#### **Architectural Business Rules:**
*   **User Hierarchy:** Both `JobSeeker` and `Employer` must inherit core identity metadata fields by extending a single unified `BaseUser` interface.
*   **Job Validation:** A `JobPost` must feature an optional `closedAt` date marker.
*   **Application Lifecycles:** Track an application moving through discrete workflow states using a strict string union type alongside an optional history tracking array (`statusHistory`).
*   **Interview Synchronization:** Must manage a designated calendar time string, an optional video URL link, and an optional structured validation feedback object.
*   **Alert Layer:** A `Notification` entity must support an optional destination redirection link.
*   **System Merging Constraint:** You must define your `JobPost` interface, and then downstream in the file, use declaration merging to inject an `auditLog: string[]` tracker array into it.
*   **System Intersection Constraint:** Create an explicit combined `FullApplication` type alias using an intersection (`&`) that fuses an `Application`, an inline `jobPost: JobPost` structural link, and an inline `applicant: JobSeeker` link.

#### **Project Deliverables:**
Write every type definition out in full and instantiate one complete, fully nested sample object literal for every entity listed above. The file must pass validation under your strict `tsconfig` properties.