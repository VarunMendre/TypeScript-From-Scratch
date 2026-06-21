// Used in cases like: validating the api like /something
// we can do validation on TS Level
// let a: `/api/${string}` = "/api/users"


// type Endpoints = `/api/${("users" | "posts" | "orders")}`;
// let a: Endpoints = "/api/orders"

// type Locations = "India" | "USA" | "Ireland" | "Switzerland"
// let myLocation: `I live in ${Locations}` =  "I live in USA"



/*
----------- Primary Use Cases -----------
*/


// 1. API Route & URL Validation

type MethodType = "GET" | "POST";
type VersionType = "v1" | "v2";
type Resource = "users" | "posts" | "comments" 

type ApiRoute = `/api/${VersionType}/${Resource}`;

let fetchURL: ApiRoute = "/api/v2/users"


// 2. CSS Class Name Generation

type Spacing = "1" | "2" | "4"
type Direction = "t" | "r" | "b" | "l";
type MarginClass = `m${Direction}-${Spacing}`;

const validClass: MarginClass = "ml-1";


// 3. Event Naming Conventions


type Actions = "submit" | "change" | "click";
// This will Enforces pattern: on{Action}
type EventHandler = `on${Capitalize<Actions>}`;


let handler: EventHandler = "onChange"





// 4. Data Format Validation

type IPv4 = `${number}.${number}.${number}.${number}`;

const ip: IPv4 = "120.452.142.593";


