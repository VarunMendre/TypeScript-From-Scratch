// Fixed-size tuples used to represent numbers by their length
type T0 = [];
type T1 = [0];
type T2 = [0, 0];
type T3 = [0, 0, 0];
type T4 = [0, 0, 0, 0];
type T5 = [0, 0, 0, 0, 0];

// Normal arrays don't have a fixed length, so this gives `number`
type NumberResult = number[][]["length"];

// Tuples have a fixed length, so this gives the literal type `1`
type TupleResult = T1["length"];


// -------------------- Addition --------------------

// 1 + 4 = 5
// Spread both tuples together, then read the resulting tuple's length
type AdditionResult1 = [...T1, ...T4]["length"];


// -------------------- Subtraction --------------------

// 5 - 4 = 1
// `I` captures the remaining elements after matching T4
type SubtractResult1 =
    T5 extends [...T4, ...infer I]
        ? I["length"]
        : never;

// 5 - 3 = 2
// `I` captures the 2 elements left after removing T3
type SubtractResult2 =
    T5 extends [...T3, ...infer I]
        ? I["length"]
        : never;


// -------------------- Generate Tuple --------------------

// Creates a tuple whose length is equal to N
type GenerateNumber<
    N extends number,
    Result extends unknown[]
> =
    Result["length"] extends N
        ? Result
        : GenerateNumber<N, [0, ...Result]>;

// Generate a tuple of length 50
type FiftySizeTuple = GenerateNumber<50, []>["length"]; // 50


// -------------------- Generic Addition Utility --------------------

// Converts both numbers into tuples, combines them,
// and returns the total length
type AdditionUtility<
    F extends number,
    S extends number
> =
    [
        ...GenerateNumber<F, []>,
        ...GenerateNumber<S, []>
    ]["length"];

type AdditionResult2 = AdditionUtility<2, 5>; // 7
type AdditionResult3 = AdditionUtility<5, 5>; // 10
type AdditionResult4 = AdditionUtility<0, 5>; // 5


// -------------------- Generic Subtraction Utility --------------------

// Subtracts S from F by matching S elements first
// and returning the length of the remaining elements
type SubtractionUtility<
    F extends number,
    S extends number
> =
    GenerateNumber<F, []> extends [
        ...GenerateNumber<S, []>,
        ...infer Rest
    ]
        ? Rest["length"]
        : never;

type SubtractResult3 = SubtractionUtility<5, 4>;  // 1
type SubtractResult4 = SubtractionUtility<4, 4>;  // 0
type SubtractResult5 = SubtractionUtility<10, 4>; // 6



// Multiplication for positive numbers in Type Level


type Multiplication<
    Num1 extends number,
    Num2 extends number,
    Result extends unknown[] = [],
> = Num2 extends 0 ? Result["length"] : Multiplication<Num1, SubtractionUtility<Num2, 1>, [...Result, ...GenerateNumber<Num1, []>]>;



type MultiplicationResult1 = Multiplication<2, 5>;


/*

I. Multiplication<3, 4, []>
Num1 = 3
Num2 = 4
Result = []

-> Num2 is not 0 so 

II. Multiplication<3, 3, []>
Num1 = 3
Num2 = 3
Result = [0, 0, 0]

III. Multiplication<3, 2, [0, 0, 0]>
Num1  = 3 
Num2 = 2
Result = [0, 0, 0, 0, 0, 0]

-> Num2 is not 0 so 

IV. Multiplication<3, 1, [0, 0, 0, 0, 0, 0]>
Num1 = 3
Num2 = 1
Result = [0, 0, 0, 0, 0, 0, 0, 0, 0]

V. Multiplication<3, 0,  [0, 0, 0, 0, 0, 0, 0, 0, 0]>
Num1 = 3
Num2 = 0

return 
Result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
*/

