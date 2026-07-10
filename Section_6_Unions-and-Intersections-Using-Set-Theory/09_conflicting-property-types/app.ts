// type Person1 = {
//   name: string;
//   age: number;
// };

// type Person2 = {
//   name: string;
//   age: string;
// };

// type Person = Person1 | Person2;
// (property) age: string | number, means conflicting type will be union

// const obj: Person = {
//   name: "varun",
//   age: "55" // assigning age as string which is valid or as a number both are valid to be assign
// }
// const obj: Person = {}

// obj.age=   now we'll get only common properties suggestions

// type Person = Person1 & Person2;
// // (property) age: never ,

// function a(): never {
//   throw new Error();
// }
// const obj: Person = {
//   name: "Varun",
//   age: a(), // we cant assign any value into this age, but to avoid conflict we could assign a function to it which is return type is never
// };

//but since age property i never so we'll now get any suggestions
// obj.age.

// But now what if it was an interface, but in TS it will also give type as never same as types

// but if we try to extends the the interface at that time it gave us error : Types of property 'age' are incompatible. 
interface Person1 {
  name: string;
  age: number;
};

interface Person2 extends Person1 {
  name: string;
  age: string;
};


