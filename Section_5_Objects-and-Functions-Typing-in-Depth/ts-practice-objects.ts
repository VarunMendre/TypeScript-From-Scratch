//------------------------------------------------------
//------------------------------------------------------
//                  LEVEL 1 — EASY
//------------------------------------------------------
//------------------------------------------------------

// P1 ->

// i.
// const carInferred: {
//   make: string;
//   model: string;
//   year: number;
// } = {
//   make: "Toyota",
//   model: "LandCruiser",
//   year: 2024,
// };

// console.log(carInferred);

// /*  Inferred type :
// const carInferred: {
//  make: string;
//  model: string;
//  year: number;
// }
// */

// // ii.

// type CarType = {
//   make: string;
//   model: string;
//   year: number;
// };

// const carAnnotated: CarType = {
//   make: "Nissan",
//   model: "SuperSafari",
//   year: 1995,
// };

// console.log(carAnnotated);

// it shows : const carAnnotated: CarType

/* 
when i hover on  carInferred object i could see the exact inferred type and structure of that object

and in 2nd obj i've explicitly mention a type alias to and object so while hovering on that i could just see the Type alias name 
*/

// P2 ->

/*
P2 | Optional Property + exactOptionalPropertyTypes
The Task: Create an object type alias named UserProfile that features a required name: string and an optional bio?: string. Initialize a variable of this type and explicitly try to assign bio: undefined.
How to complete it: Trigger the compiler error. Then, write a code comment explaining why exactOptionalPropertyTypes prevents this assignment. Finally, rewrite a valid version of the object by completely omitting the bio property key.

*/

// type UserProfile = {
//     name: string;
//     bio?: string;
// }

// const user: UserProfile = {
//     name: "Varun",
//     bio: undefined,
// }

// console.log(user)
/* 
Error : 

⚠ Error (TS2375) | | | 


Type 
 { name: string; bio: undefined } 
 is not assignable to type 
 UserProfile 
 with exactOptionalPropertyTypes: true . Consider adding 
 undefined 
 to the types of the target's properties.

 

 Types of property bio are incompatible.

 Type 
 undefined 
 is not assignable to type 
 string 
 .

it gaves error because we've "exactOptionalPropertyTypes": true so this will prevent to store values which are out of type s fix this we should either remove that biofield or gave a valis string

*/

// P3 ->

// let user: object = {
//     name: "Varun"
// };

// console.log(user.name); // error : Property 'name' does not exist on type 'object'.
// while defining object as a type TS gives full freedom to assign non-primitive values to it
// It accepts arrays, functions, dates, and regexes indiscriminately to store in that obj also though it losses of IntelliSense

// you may fix this in may ways one of them are with object literal type

// let user: {
//   name: string;
//   age: number;
// } = {
//   name: "Varun",
//   age: 22,
// };

// console.log(user.age);

// P4 ->

// type Config = {
//     host: string;
// }

// error : Duplicate identifier 'Config'
// type Config = {
//     port: number;
// }

// while merging types it won't allow to merge , we can merge or takes some properties from an another type alias from another type alias using "&": intersection

// interface AppConfig {
//     host: string
// }

// interface AppConfig {
//   port: number;
// }

// const obj: AppConfig = {

// }

// we can merge 2 interfaces with same name but we've to give different fields in both of them other wise it will override , and in after adding duplicate it does'nt give error an in final interface we could see our whole merged interface like :
/*
interface AppConfig {
    host: string;
    port: number;
}
*/

// P5 | moduleDetection: force — What It Prevents - >

// now since in out tsconfig.json we've added an attribute called moduleDetection while values is set to force at that time it will force full treat every file as a module in whole code base
// we if put value as legacy then to make a file module we've to use import or export there , and in auto it will treat same

//------------------------------------------------------
//------------------------------------------------------
//                  LEVEL 2 — MEDIUM
//------------------------------------------------------
//------------------------------------------------------

// P6 | extends vs & — Same Result, Different Cost ->

// interface Person {
//   name: string;
//   age: number;
// }

// interface Employee extends Person {
//   company: string;
//   designation: string;
// }

// type TPerson = {
//   name: string;
//   age: number;
// };

// type TEmployee = {
//   company: string;
//   designation: string;
// } & TPerson;

// const IObj: Employee = {
//     name: "Varun",
//     age: 22,
//     company: "MediaTech",
//     designation: "Developer"
// }
// const TObj: TEmployee = {
//     name: "Varun",
//     age: 22,
//     company: "MediaTech",
//     designation: "Developer"
// }

/* 
Intersection take more time while compilation means to bind, I/O operations and etc.. so its total compilation time increase 
but it is ok if you using 1 or 2 of them but in larger codebases where you have large number of intersections with type aliases 
so then it will take lot of time to just compile and build our code 
but it take time only if they are used in objects means kind of we've declare or implement more intersections but never used in an object at that time it will take so much less amount of time compare to interfaces then 
but the questions it why anyone will do such kind of thing just declaring intersections and not using it 

where on other hand interfaces are lightweight and compiles and build faster as compare to types because it is specially used for object only 

*/

// P7 | Declaration Merging as a Plugin Pattern ->

/*

 first of all that SDK file is an module and we've to import that file in our working file we cant modify that file on global level
*/

// P8 | Window Augmentation ->

// 1. Forces this file to be treated as a module, isolating its scope.
// Without this, TS treats the file as a script, causing "interface Window" to
// merge incorrectly or fail to augment the global namespace in module-based projects.
// export { };
 
// // 2. Explicitly tells TypeScript to look outside the current module scope.
  
// declare global {
//   // 3. Uses "interface" specifically because TypeScript supports "declaration merging"
//   interface Window {
//     appRuntime: {
//       userId: string;
//       env: string;
//     };
//   }
// }


// if (!window.appRuntime) {
//   window.appRuntime = {
//     userId: "UTR825214",
//     env: "production", // Example environment
//   };
// } else {
//   // Update specific fields if the object already exists
//   window.appRuntime.userId = "UTR825214";
// }



// P9 | Nested Optional with exactOptionalPropertyTypes ->

// type Order = {
//   orderId: number;
//   orderName: string;
//   price: number;
//   shippingAddress?: {
//     street: string;
//     city: string;
//     pincode: string
//   }
// }


// const completeObj: Order = {
//   orderId: 123,
//   orderName: "T-shirt",
//   price: 1522,
//   shippingAddress: {
//     street: "washington",
//     city: "new york",
//     pincode: "411520",
//   }
// }

// const withoutAddress: Order = {
//   orderId: 158,
//   orderName: "AirPods",
//   price: 1589,
// };
// const withAddress: Order = {
//   orderId: 158,
//   orderName: "AirPods",
//   price: 1589,
//   shippingAddress: undefined,
// };


/* 
⚠ Error (TS2375) | | | 


Type:

{ 
 orderId: number 
 orderName: string 
 price: number 
 shippingAddress: undefined 
} 

is not assignable to type 
 Order 
 with exactOptionalPropertyTypes: true . Consider adding 
 undefined 
 to the types of the target's properties.

 

 Types of property shippingAddress are incompatible.

 Type 
 undefined 
 is not assignable to type 
 { street: string; city: string; pincode: string } 
 .

⚠ Error (TS6133) | | | 


withAddress is declared but its value is never read.


Because: in our tsconfig.json we've set an attribute called : exactOptionalPropertyTypes : true

so he will prevent by assigning values as undefined , either we should not take that value or assign a valid value to it 
*/



// type A = { id: string };
// type B = { id: number };
// type C = A & B;

// const test: C = {
//   id: 52
// }

/* 
Intersection Requirement: the & operator creates a type that must satisfy both A & B simultaneously 
so id property much be both string and number at same time 

so there is no JS value that satisfy these 2 at same time, so intersection of all set of number and string is empty set
so now empty set value is never 
*/


