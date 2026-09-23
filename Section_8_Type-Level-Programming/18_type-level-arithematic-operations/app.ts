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
type SubtractResult1 = T5 extends [...T4, ...infer I] ? I["length"] : never;

// 5 - 3 = 2
// `I` captures the 2 elements left after removing T3
type SubtractResult2 = T5 extends [...T3, ...infer I] ? I["length"] : never;

// -------------------- Generate Tuple --------------------

// Creates a tuple whose length is equal to N
type GenerateNumber<
  N extends number,
  Result extends unknown[] = [],
> = Result["length"] extends N ? Result : GenerateNumber<N, [0, ...Result]>;

// Generate a tuple of length 50
type FiftySizeTuple = GenerateNumber<50, []>["length"]; // 50

// -------------------- Generic Addition Utility --------------------

// Converts both numbers into tuples, combines them,
// and returns the total length
type AdditionUtility<F extends number, S extends number> = [
  ...GenerateNumber<F, []>,
  ...GenerateNumber<S, []>,
]["length"];

type AdditionResult2 = AdditionUtility<2, 5>; // 7
type AdditionResult3 = AdditionUtility<5, 5>; // 10
type AdditionResult4 = AdditionUtility<0, 5>; // 5

// -------------------- Generic Subtraction Utility --------------------

// Subtracts S from F by matching S elements first
// and returning the length of the remaining elements
type SubtractionUtility<Num1 extends number, Num2 extends number> =
  GenerateNumber<Num1, []> extends [...GenerateNumber<Num2, []>, ...infer Rest]
    ? Rest["length"]
    : never;

type SubtractResult3 = SubtractionUtility<5, 4>; // 1
type SubtractResult4 = SubtractionUtility<4, 4>; // 0
type SubtractResult5 = SubtractionUtility<10, 4>; // 6
type SubtractResult6 = SubtractionUtility<10, 11>; // never

// Multiplication for positive numbers in Type Level -> 3 + 3 + 3 + 3 => 3 * 4 => 12

type Multiplication<
  Num1 extends number,
  Num2 extends number,
  Result extends unknown[] = [],
> = Num2 extends 0
  ? Result["length"]
  : Multiplication<
      Num1,
      SubtractionUtility<Num2, 1>,
      [...Result, ...GenerateNumber<Num1, []>]
    >;

type MultiplicationResult1 = Multiplication<3, 4>;

/* ---------- Dry-Run ---------- 

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

// Division

// => 12 / 3
// How many time we could subtract 3 from 12 =>
// 12 - 3 = 9
// 9 - 3 = 6
// 6 - 3 = 3
// 3 - 3 = 0

/* 13 / 2
how many time we could subtract 2 from 13 => 6 

13 - 2 = 11 
11 - 2 = 9
9 - 2 = 7
7 - 2 = 5 
5 - 2 = 3
3 - 2 = 1
1 - 2 = no possible so not counted 
*/

/*  Idea before implementing 

DivisionUtility<Dividend, Divisor, Count> 

Start with: 
DivisionUtility<12, 3, 0>

Then recursion becomes:

- DivisionUtility<12, 3, 0>
- DivisionUtility<9, 3, 1>
- DivisionUtility<6, 3, 2>
- DivisionUtility<3, 3, 3>
- DivisionUtility<0, 3, 4>
                    ↑
                 answer
*/

// Divided 2 any positive whole numbers

type DivisionUtility<
  Dividend extends number,
  Divisor extends number,
  Count extends unknown[] = [],
> = Dividend extends 0
  ? Count["length"]
  : Divisor extends 0
    ? never
    : SubtractionUtility<Dividend, Divisor> extends never
      ? Count["length"]
      : DivisionUtility<
          SubtractionUtility<Dividend, Divisor>,
          Divisor,
          [0, ...Count]
        >;

type DivisionResult1 = DivisionUtility<12, 3>; // 4
type DivisionResult2 = DivisionUtility<13, 2>; // 6
type DivisionResult3 = DivisionUtility<12, 2>; // 6

type DivisionResult4 = DivisionUtility<12, 1>; // 12

type DivisionResult5 = DivisionUtility<0, 1>; // 0
type DivisionResult6 = DivisionUtility<1, 0>; // 0

// Increment Given Positive Number by 1

type Increment<N extends number> = [0, ...GenerateNumber<N>]["length"];

type IncrResult1 = Increment<5>; // 6
type IncrResult2 = Increment<0>; // 1
type IncrResult3 = Increment<51>; // 52

// Decrement Given Positive Number by 1, in-case N is 0 we'll return 0 for now

type Decrement<N extends number> = N extends 0 ? 0 : SubtractionUtility<N, 1>;

type DecrResult1 = Decrement<2>;

// EqualTo Utility

type EqualTo<Num1 extends number, Num2 extends number> =
  GenerateNumber<Num1> extends GenerateNumber<Num2> ? true : false;

type EqualToResult1 = EqualTo<4, 4>;
type EqualToResult2 = EqualTo<5, 4>;

// Greater-Than Utility : checks if Num1 is Greater than Num2

type GreaterThan<Num1 extends number, Num2 extends number> = Num1 extends Num2
  ? false
  : SubtractionUtility<Num1, Num2> extends never
    ? false
    : true;

type GreaterThanResult1 = GreaterThan<6, 8>;
type GreaterThanResult2 = GreaterThan<6, 5>;
type GreaterThanResult3 = GreaterThan<6, 6>;

// LessThan<N1, N2> -> checks whether N1 is less than N2.

type LessThan<N1 extends number, N2 extends number> = N1 extends N2
  ? false
  : GreaterThan<N1, N2> extends true
    ? false
    : true;

type LessThanResult1 = LessThan<6, 8>;
type LessThanResult2 = LessThan<6, 5>;
type LessThanResult3 = LessThan<6, 6>;

// GreaterThanOrEqual<N1, N2>

type GreaterThanOrEqual<N1 extends number, N2 extends number> = N1 extends N2
  ? true
  : SubtractionUtility<N1, N2> extends never
    ? false
    : true;

type GreaterThanOrEqualResult1 = GreaterThanOrEqual<6, 8>;
type GreaterThanOrEqualResult2 = GreaterThanOrEqual<6, 5>;
type GreaterThanOrEqualResult3 = GreaterThanOrEqual<6, 6>;

// LessThanOrEqual<N1, N2>

type LessThanOrEqual<N1 extends number, N2 extends number> = N1 extends N2
  ? true
  : GreaterThan<N1, N2> extends true
    ? false
    : true;

type LessThanOrEqualResult1 = LessThanOrEqual<6, 8>;
type LessThanOrEqualResult2 = LessThanOrEqual<6, 5>;
type LessThanOrEqualResult3 = LessThanOrEqual<6, 6>;

// Modulo -> returns the remainder after division

// Idea : // Idea: Modulo means repeatedly subtract the Divisor from the Dividend
// until the Dividend becomes smaller than the Divisor.
// The remaining value is the answer.

/*  Dry-run :
Modulo<Dividend, Divisor>

i/p:
Modulo<10, 2>

1. Modulo<8, 2>  -> is Dividend smaller than Divisor -> no
2. Modulo<6, 2>  -> is Dividend smaller than Divisor -> no
3. Modulo<4, 2>  -> is Dividend smaller than Divisor -> no
4. Modulo<2, 2>  -> is Dividend smaller than Divisor -> no
5. Modulo<0, 2>  -> Dividend is 0, return 0
*/

type Modulo<
  Dividend extends number,
  Divisor extends number,
> = Dividend extends 0
  ? 0
  : Divisor extends 0
    ? never
    : LessThan<Dividend, Divisor> extends true
      ? Dividend
      : Modulo<SubtractionUtility<Dividend, Divisor>, Divisor>;

type ModuloResult1 = Modulo<10, 3>;
// 1

type ModuloResult2 = Modulo<10, 2>;
// 0

type ModuloResult13 = Modulo<9, 4>;
// 1





// IsEven<N>

// N % 2 == 0 ? Even : Odd

type IsEven<N extends number> = Modulo<N, 2> extends 0 ? true : false;

type IsEvenResult1 = IsEven<4>;
// true

type IsEvenResult2 = IsEven<5>;
// false

type IsEvenResult3 = IsEven<0>;
// true



// IsOdd<N >

type IsOdd<N extends number> = Modulo<N, 2> extends 1 ? true : false;

type IsOddResult1 = IsOdd<4>;
// false

type IsOddResult2 = IsOdd<5>;
// true

type IsOddResult3 = IsOdd<0>;
// false




// Min
type Min<N1 extends number, N2 extends number> = LessThanOrEqual<N1, N2> extends true ? N1 : N2;

type MinResult1 = Min<4, 5>;
type MinResult2 = Min<6, 5>;
type MinResult3 = Min<5, 5>;


// Max
type Max<N1 extends number, N2 extends number> = GreaterThanOrEqual<N1, N2> extends true ? N1 : N2;

type MaxResult1 = Max<4, 5>;
type MaxResult2 = Max<6, 5>;
type MaxResult3 = Max<5, 5>;



