// Pick Utility type

type User = {
  name: string;
  age: number;
  domain: string;
  address: string;
};

type PickedUser = Pick<User, "name" | "age">; // PickedUser will have only name and age properties from User type

type MyPick<T, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]: T[P];
};

type MyPick2<T, K extends keyof T> = {
    [P in K]: T[P];
}

type CustomPickedUser = MyPick<User, "name" | "age">; // CustomPickedUser will have only name and age properties from User type

// note: when we pass a union of something as a typed parameter, then that generic will apply Distributive conditional types,
//  which means it will apply the conditional type to each member of the union separately.

// Omit Utility type

type OmittedUser = Omit<User, "domain" | "address">;

/* Result : 
type OmittedUser = {
        name: string;
        age: number;
    }
*/

type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type MyOmit2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>; // using Pick and Exclude utility types

type CustomOmittedUser = MyOmit<User, "domain" | "address">; // CustomOmittedUser will have only name and age properties from User type
type CustomOmittedUser2 = MyOmit2<User, "domain" | "address">; // CustomOmittedUser2 will have only name and age properties from User type

/*
Result :
type CustomOmittedUser = {
        name: string;
        age: number;
    }
*/


