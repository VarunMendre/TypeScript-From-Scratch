type Role = "user" | "age" | "address";

type MyRecord<T extends keyof any, U extends unknown> = {
  [P in T]: U;
};

type Result = MyRecord<Role, string>;

/*
Result: 
{
  user: string;
  age: string;
  address: string;
}
*/

/*
Dry-Run: 

MyRecord<"user" | "age" | "address", string> = {
  ["user" in  ("user" | "age" | "address") ] : string; -> yes, "user is in the union, so include it"
  ["age" in  ("user" | "age" | "address") ] : string; -> yes, "age is in the union, so include it"
  ["address" in  ("user" | "age" | "address") ] : string; -> yes, "address is in the union, so include it" 
}


so in the end, we get:
{
  user: string; 
  age: string;
  address: string;
}
*/
