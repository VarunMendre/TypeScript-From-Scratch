// --------- Type Aliases and Literal Types ---------

// 1. ->

// type Direction = "north" | "south" | "east" | "west"

// let direc: Direction = "north-east"
// error :Type '"north-east"' is not assignable to type 'Direction'.

//2. ->

// type StatusCode = 200 | 400 | 500;

// function response(statusCode: StatusCode) {
//     return `API Response: ${statusCode}`;
// }

// response(200) // API Response: 200
// response(201) // error: Argument of type '201' is not assignable to parameter of type 'StatusCode'.

//3. ->

// type Role  = "Developer" | "Analyst" | "Cyber" | "Sales" | "Accountant"
// type Department = "Computer" | "Management" | "Commerce"

// type Employee = {
//     name: string,
//     role: Role,
//     dept: Department,
// };

// const emp1: Employee = {
//     name: "Varun",
//     role: "Developer",
//     dept: "Computer",
// } as const;

//4. ->

// type TrafficLight = "red" | "green" | "yellow";

// function trafficStatus(light: TrafficLight) {
//     if (light === "red")
//         return `Please wait Traffic light is ${light}`;
//    else if (light === "yellow")
//         return `Please be slow down Traffic light is ${light}`;
//     else
//         return `Please go Traffic light is ${light}`;
// }

// trafficStatus("red");
// trafficStatus("yellow");
// trafficStatus("green");

// ------------- Template Literal Types ------------------

// 5. ->

// type ButtonSize = "sm" | "md" | "lg";
// type ButtonVariant = "primary" | "secondary";

// type ButtonClass = `btn-${ButtonSize}-${ButtonVariant}`;

// let style1: ButtonClass = "btn-lg-primary";
// let style2: ButtonClass = "btn-lg-secondary";
// let style3: ButtonClass = "btn-md-primary";
// let style4: ButtonClass = "btn-md-secondary";
// let style5: ButtonClass = "btn-sm-primary";
// let style6: ButtonClass = "btn-sm-secondary";

// error : Type '"btn-ss-secondary"' is not assignable to type '"btn-sm-primary" | "btn-sm-secondary" | "btn-md-primary" | "btn-md-secondary" | "btn-lg-primary" | "btn-lg-secondary"'. Did you mean '"btn-sm-secondary"'?
// let style7: ButtonClass = "btn-ss-secondary";

// 6. ->

// type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
// type ApiVersion = "v1" | "v2" | "v3";

// type Endpoint = `/api/${ApiVersion}/${HTTPMethod}`;

// let route: Endpoint = "/api/v1/GET"

// 7. ->

// Office Email format : <firstName>.<lastName>@<CompanyName>.com
// type EmailFormat = `${string}.${string}@${string}.com`;

// let email1: EmailFormat = "varun.mendre@microsoft.com"
// let email2: EmailFormat = "varunmendre@microsoft.com"// error : Type '"varunmendre@microsoft.com"' is not assignable to type '`${string}.${string}@${string}.com`'.

// 8. ->

// type Season = "Spring" | "Summer" | "Rainy" | "Winter";
// type Sentence = `I Love ${Season} season`;

// let favSeason: Sentence = "I Love Spring season"

// Type Assertions

// 9. ->

// let data = ["Alice", 30, true];

// (data[0] as string).toUpperCase();
// (data[1] as number).toFixed(2);
// console.log((data[1] as number).toFixed(2));

// 10. ->

// let variable: unknown = "Hii";

// variable.length // error : 'variable' is of type 'unknown'.
// console.log((variable as string).length); // 3

// 11. ->

// let config = {
//   port: 3000,
//   host: "localhost",
// } as const;

// config.host = "127.0.0.1" // error : Cannot assign to 'host' because it is a read-only property.

// explanation : when we use as const assertion to an object and array that non-primitive data type become immutable
// also it adapt these 2 properties : 1. it become readonly 2. and type of that obj become Type Literal
// means properties & values of that object become its type, without "as const" assertion obj type will become :
/* 
let config: {
    port: number;
    host: string;
}
*/

// 12. ->

// let scores = [95, 87, 76] as const;

// scores.push(80) error : Property 'push' does not exist on type 'readonly [95, 87, 76]'.

// Explanation : as i said you above same things applies here too, obj & array become immutable as we mention
// "as const" to them it adapt 2 properties: 1. it become readonly 2. and type of that array become Type Literal
// means the elements of those arrays become its type which is : let scores: readonly [95, 87, 76]
// and without as const it will become : let scores: number[]

/**
 * 
 19. ->

Create a type Config using as const for an object with theme "dark", language "en", version 1. 
Try to write a function that accepts the type of config.theme as a parameter. 
Notice how as const makes the type "dark" instead of string.
 */

// const config = {
//   theme: "dark",
//   language: "en",
//   version: 1,
// } as const;

// // type Config = typeof config;

// function applyTheme(theme: typeof config.theme) {
//     console.log(`Applying Theme: ${theme}`);
// }

// applyTheme("dark");

// console.log(typeof config.theme == "string") // true;


// 20. ->


// let value: string | null | undefined;
// 1. optional chaining

// let lengthOfValue = value?.length;


//2. Nullish Coalescing

// let lengthOfValue = value?.length ?? 0;

// 3. Type Guard


// let lengthOfValue: number;

// if (typeof value === "string") {
//     lengthOfValue = value.length;
// } else {
//     lengthOfValue = 0;
// }

