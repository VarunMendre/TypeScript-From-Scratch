// let a: number;

// let b = a!;
// let c = a!;
// let d = a!;

// console.log(a!);

// so instead of declaring non-null assertion every where add ! direct at a
// that is called definite assignment operator

let a!: number;

let b = a;
let c = a;
let d = a;

console.log(a);

// but use only if you sure that a contains string
// in our case it doesn't its risky to use it

// use this only in dev not in prod

// non-null assertion -> used while accessing values
// definite assignment assertion-> used while declaring variable
