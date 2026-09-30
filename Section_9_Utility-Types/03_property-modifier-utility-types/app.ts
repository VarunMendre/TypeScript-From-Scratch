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