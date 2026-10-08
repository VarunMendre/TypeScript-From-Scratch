type User = {
  name: string;
  age: number;
  readonly gender: string;
  readonly address: {
    readonly city: string;
    readonly postalCode: number;
  };
};

type User2 = {
  name: string;
  age: number;
  gender: string;
  address: undefined;
  city: null;
};
// Make All Properties Mutable

type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? Mutable<T[P]> : T[P];
};

type NewUser = Mutable<User>;

// Make Specific Properties Optional

type SpecificOptional<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
} & {
  [P in keyof T as P extends K ? P : never]?: T[P];
};

type OptionalType = SpecificOptional<User, "name" | "age" | "gender">;

// Make Specific Properties Required

type RequiredProperties<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
} & {
  [P in keyof T as P extends K ? P : never]-?: T[P];
};

type RequiredProperties1<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

type RequiredResult1 = RequiredProperties<OptionalType, "name" | "age">;
type RequiredResult2 = RequiredProperties1<OptionalType, "name" | "age">;

// Make Specific properties Readonly

type SpecificReadonly<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
} & {
  readonly [P in keyof T as P extends K ? P : never]: T[P];
};

type ReadonlyResult = SpecificReadonly<User2, "name" | "gender">;

// 🧹 Remove null and undefined from Object Properties

type NonNullableProperties<T> = {
  [P in keyof T as T[P] extends null | undefined ? never : P]: T[P];
};

type NonNull = NonNullableProperties<User2>;

// Get Keys of a Specific Value Type

type GetKeys<T, K> = keyof {
  [P in keyof T as T[P] extends K ? P : never]: never;
};

type Keys = GetKeys<User2, number>;

// Pick Properties by Value Type

type GetProperties<T, K> = {
  [P in keyof T as T[P] extends K ? P : never]: T[P];
};

type Properties = GetProperties<User2, number>;

// Flatten Object

type Prettify<T> = {
  [P in keyof T]: T[P];
} & {};

type Echo = {
  name: string;
  age: number;
};

type Address = {
  readonly city: string;
  postalCode?: number;
};

type CleanType = Prettify<Echo & Address>;

// Deep Partial

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Deep Readonly

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
