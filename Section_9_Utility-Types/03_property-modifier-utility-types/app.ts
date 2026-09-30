// Partial Utility Type

type User = {
  name: string;
  age: number;
  isAdult: boolean;
};

type PartialUser = Partial<User>;
/* O/P:
    PartialUser  = {
    name?: string | undefined;
    age?: number | undefined;
    isAdult?: boolean | undefined;
}
*/

// custom Partial Utility Type

type MyPartial<T> = {
  [P in keyof T]?: T[P] | undefined;
};

type User2 = {
  name?: string;
  age?: number;
  isAdult?: boolean;
};

// Required Utility Type

type RequiredUser = Required<User2>;

/* O/P:
    RequiredUser  = {
    name: string;
    age: number;
    isAdult: boolean;
}
*/

// custom Required Utility Type
type MyRequired<T> = {
  [P in keyof T]-?: T[P] | undefined;
};


// Readony Utility Type

type ReadonlyUser = Readonly<User>;
/* O/P:
    ReadonlyUser  = {
    readonly name: string;
    readonly age: number;
    readonly isAdult: boolean;
}
*/


// custom Readonly Utility Type

type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
};

type User3 = {
  name: string;
  age: number;
  isAdult: boolean;
};  

type ReadonlyUser2 = MyReadonly<User3>;

/* O/P:
 ReadonlyUser2 = {
 readonly name: string;
 readonly age: number;
 readonly isAdult: boolean;
}
*/




// but all of these are utilities are won't works with deep nested objects 

type User4 = {
    name: string;
    age: number;
    isAdult: boolean;
    address: {
        street: string;
        city: string;
        country: string;
    };         
}



type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
}

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type DeepPartialUser = DeepPartial<User4>;
type DeepRequiredUser = DeepRequired<User4>;
type DeepReadonlyUser = DeepReadonly<User4>;



const readonlyUser: DeepReadonlyUser = {
    name: "John",
  age: 30,  
  isAdult: true,
  address: {
    street: "123 Main St",  
  city: "New York",
  country: "USA",
  },
};  

readonlyUser.name = "Jane"; // Error: Cannot assign to 'name' because it is a read-only property.



