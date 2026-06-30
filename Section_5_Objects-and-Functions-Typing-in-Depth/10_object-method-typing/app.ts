/**
 * Interface defining the structure of a User object.
 * It includes properties and a method signature.
 */
interface User {
  name: string;
  age: number;

  // Option 1 (Commented out): Method defined as a property with a function type.
  // getDetails: () => string;

  // Option 2: Method defined using shorthand syntax (preferred for methods).
  // This tells TypeScript that 'getDetails' is a function belonging to the object.
  getDetails(): string;
}

// Implementation of the User interface
const user: User = {
  name: "Varun",
  age: 22,

  // Defining the method required by the interface
  getDetails: function () {
    // TypeScript automatically infers the type of 'this' based on the interface (User).
    // Inside this function, 'this' knows it has 'name' (string) and 'age' (number).
    return this.name + this.age;
  },
};

// Note: If you hovered over 'this' in the function above, TypeScript would show:
// this: {
//   name: string;
//   age: number;
//   getDetails(): string;
// }

/**
 * Interface defining an object capable of adding two numbers.
 * Includes properties 'a' and 'b', and a method 'add'.
 */
interface addObj {
  a: number;
  b: number;

  // Method signature expecting two number arguments and returning a number.
  // The parameter names here (a, b) are for documentation; implementation can vary.
  add(a: number, b: number): number;
}

// Implementation of the addObj interface
const obj: addObj = {
  a: 5,
  b: 5,

  // Implementation of the 'add' method.
  // Even though we don't explicitly type 'a' and 'b' here,
  // TypeScript infers their types from the 'addObj' interface.
  add(a, b) {
    return a + b;
  },
};

