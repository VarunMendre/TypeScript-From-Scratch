type Calculate<N1 extends number, N2 extends number> = {
  add: Add<N1, N2>;
  subtract: Subtract<N1, N2>;
  multiply: Multiply<N1, N2>;
  divide: Divide<N1, N2>;
  greaterThan: GreaterThan<N1, N2>;
  greaterThanEqual: GreaterThanOrEqual<N1, N2>;
  lessThan: LessThan<N1, N2>;
  lessThanEqual: LessThanOrEqual<N1, N2>;
  equal: EqualTo<N1, N2>;
};

type Output = Calculate<10, 2>;
/*
    type Output = {
        add: 12;
        subtract: 8;
        multiply: 20;
        divide: 5;
        greaterThan: true;
        greaterThanEqual: true;
        lessThan: false;
        lessThanEqual: false;
        equal: false;
    } 
*/

// Generate Numbers
type GenerateNumber<
  N extends number,
  Result extends unknown[] = [],
> = Result["length"] extends N ? Result : GenerateNumber<N, [0, ...Result]>;

// Addition
type Add<F extends number, S extends number> = [
  ...GenerateNumber<F, []>,
  ...GenerateNumber<S, []>,
]["length"];

// Subtraction
type Subtract<Num1 extends number, Num2 extends number> =
  GenerateNumber<Num1, []> extends [...GenerateNumber<Num2, []>, ...infer Rest]
    ? Rest["length"]
    : never;

// Multiplication
type Multiply<
  Num1 extends number,
  Num2 extends number,
  Result extends unknown[] = [],
> = Num2 extends 0
  ? Result["length"]
  : Multiply<Num1, Subtract<Num2, 1>, [...Result, ...GenerateNumber<Num1, []>]>;

// Division

type Divide<
  Dividend extends number,
  Divisor extends number,
  Count extends unknown[] = [],
> = Dividend extends 0
  ? Count["length"]
  : Divisor extends 0
    ? never
    : Subtract<Dividend, Divisor> extends never
      ? Count["length"]
      : Divide<Subtract<Dividend, Divisor>, Divisor, [0, ...Count]>;

// Equal To

type EqualTo<Num1 extends number, Num2 extends number> =
  GenerateNumber<Num1> extends GenerateNumber<Num2> ? true : false;

// Greater Than

type GreaterThan<Num1 extends number, Num2 extends number> = Num1 extends Num2
  ? false
  : Subtract<Num1, Num2> extends never
    ? false
    : true;

type GreaterThanOrEqual<N1 extends number, N2 extends number> = N1 extends N2
  ? true
  : Subtract<N1, N2> extends never
    ? false
    : true;

// Less Than

type LessThan<N1 extends number, N2 extends number> = N1 extends N2
  ? false
  : GreaterThan<N1, N2> extends true
    ? false
    : true;

type LessThanOrEqual<N1 extends number, N2 extends number> = N1 extends N2
  ? true
  : GreaterThan<N1, N2> extends true
    ? false
    : true;

// Modulo

type Modulo<
  Dividend extends number,
  Divisor extends number,
> = Dividend extends 0
  ? 0
  : Divisor extends 0
    ? never
    : LessThan<Dividend, Divisor> extends true
      ? Dividend
      : Modulo<Subtract<Dividend, Divisor>, Divisor>;

// Even
type IsEven<N extends number> = Modulo<N, 2> extends 0 ? true : false;

// Odd
type IsOdd<N extends number> = Modulo<N, 2> extends 1 ? true : false;

// Min
type Min<N1 extends number, N2 extends number> =
  LessThanOrEqual<N1, N2> extends true ? N1 : N2;
// Max

type Max<N1 extends number, N2 extends number> =
  GreaterThanOrEqual<N1, N2> extends true ? N1 : N2;
