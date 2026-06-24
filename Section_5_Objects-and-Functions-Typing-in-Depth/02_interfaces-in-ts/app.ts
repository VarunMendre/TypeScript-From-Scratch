interface User {
  name: string;
  age: number;
  domain: string;
  address?: {
    country: string;
    state: string;
    city: string;
    details: {
      street: string;
      houseCode: number;
    };
  };
}

// we can use this to define structure of object, function parameters/return types
// classes implementation, API's & Public Contracts, Arrays 
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
};
