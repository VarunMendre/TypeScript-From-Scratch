type A = "A" | "B" | "C" | "D" | "E";

// Exclude Utility
type Result = Exclude<A, "C">;

// custom exclude utility type

type MyExclude<T, U> = T extends U ? never : T;

type Result2 = MyExclude<A, "C">;

// internally it is Distributed Conditional Types, which means it will be applied to each member of the union type individually.

/*
    MyExclude<"A", "C"> => A does not extend C, so it will return "A"
    MyExclude<"B", "C"> => B does not extend C, so it will return "B"
    MyExclude<"C", "C"> => C extends C, so it will return never
    MyExclude<"D", "C"> => D does not extend C, so it will return "D"
    MyExclude<"E", "C"> => E does not extend C, so it will return "E"
*/

// Extract Utility

type Result3 = Extract<A, "C" | "D">; // it will return "C" | "D"

// custom Extract utility type

type MyExtract<T, U> = T extends U ? T : never;

type Result4 = MyExtract<A, "C" | "D">; // it will return "C" | "D"

/* internally it is Distributed Conditional Types, which means it will be applied to each member of the union type individually.

    MyExtract<"A", "C" | "D"> => A does not extend C or D, so it will return never
    MyExtract<"B", "C" | "D"> => B does not extend C or D, so it will return never
    MyExtract<"C", "C" | "D"> => C extends C or D, so it will return "C"
    MyExtract<"D", "C" | "D"> => D extends C or D, so it will return "D"
    MyExtract<"E", "C" | "D"> => E does not extend C or D, so it will return never
*/

// NonNullable Utility

type Result5 = NonNullable<string | number | null | undefined>; // it will return string | number

// custom NonNullable utility type

type MyNonNullable<T> = T extends null | undefined ? never : T;

type Result6 = MyNonNullable<string | number | null | undefined>; // it will return string | number

// Same are above here also Distributed Conditional Types, which means it will be applied to each member of the union type individually.

// another way is to apply NonNullable utility is to intersect with an empty object


type User = (string | number | null | undefined) & {}; // it will return string | number, because null and undefined are not assignable to an empty object type


/*
Note: Distributed Conditional types works only in Generic types, if typed parameter is an union type then it will be applied to each member of the union type individually.
*/

