// const obj = {};
// The inferred type of this object is:
// const obj: {} => {}

// Since the object is empty, we cannot add new properties to it later.
// Example:
// obj.name = "Varun";
// Error: Property 'name' does not exist on type '{}'.

// const obj = { name: "Varun" };

/*
Now the inferred type becomes:

const obj: {
    name: string;
}

This is called an Object Literal Type.
*/

type User = {
  name: string;
  age: number;
  domain: string;

  // Adding "?" makes the property optional.
  address?: {
    country: string;
    state: string;
    city: string;
    details: {
      street: string;
      houseCode: number;
    };
  };
};

const user1: User = {
  name: "John",
  age: 30,
  domain: "Developer",
  address: {
    country: "USA",
    state: "California",
    city: "San Francisco",
    details: {
      street: "Market St",
      houseCode: 123,
    },
  },
} as const;

// The "as const" assertion has no effect here because
// we have explicitly provided the type (User).
//
// "as const" is useful only when TypeScript is inferring
// the type automatically. Since the type is already fixed
// as User, the properties remain mutable.

user1.name = "Varun Mendre";

const user2: User = {
  name: "Varun",
  age: 30,
  domain: "Analyst",
};

// obj.address = "Maharashtra"

/*
Even if we do not explicitly provide a type, TypeScript
can automatically determine (infer) the object's type.
This process is called Type Inference.

When creating objects, TypeScript infers the structure
based on the values provided at the time of creation.
*/
