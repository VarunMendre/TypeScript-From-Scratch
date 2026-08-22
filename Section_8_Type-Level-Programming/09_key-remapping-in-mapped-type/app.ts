type User = {
  name: string;
  age: number;
  password: string;
};

// ❌ Without capitalization: getname, getage, getpassword
type T = {
  [K in keyof User as `get${K}`]: () => User[K];
};

// ✅ With capitalization: getName, getAge, getPassword
type T2 = {
  [K in keyof User as `get${Capitalize<K>}`]: () => User[K];
};

// ✅ Using different prefixes: fetchName, fetchAge, fetchPassword
type T3 = {
  [K in keyof User as `fetch${Capitalize<K>}`]: () => User[K];
};

// String manipulation examples
type C1 = Capitalize<"name">; // "Name"
type C2 = Lowercase<"AGE">; // "age"
type C3 = Uppercase<"pass">; // "PASS"
type C4 = Uncapitalize<"Name">; // "name"

type Setters = {
  [K in keyof User as `set${Capitalize<K>}`]: (value: User[K]) => void;
};

// Result: { setName: (v: string) => void; setAge: (v: number) => void; ... }

type FormState = { username: string; password: string; isActive: boolean };

type FormHandlers = {
  [K in keyof FormState as `on${Capitalize<K>}Change`]: (
    value: FormState[K],
  ) => void;
};

// Result: { onUsernameChange: (v: string) => void; onPasswordChange: (v: string) => void; ... }

// Exclude specific keys by mapping them to never

type PublicUser = {
  [K in keyof User as K extends "password" ? never : K]: User[K];
};

// Result: { name: string; age: number } (password excluded)

type TypesProps = {
  [K in keyof User as K extends string  ? `str_${K}` : `num_${K}`]: User[K];
};

// Result: { str_name: string; str_password: string; num_age: number }