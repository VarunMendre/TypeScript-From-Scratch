// let a: [string, number] = ["T-Shirt", 2500];

// // a[0] // before not suggestions for normal arr

// a[0].toUpperCase();
// a[1].toFixed(2);

// named tuple

let b: [name: string, seat: number] = ["Varun", 202];

b[0] = "T-Shirt"
b[1] = 21
// b[2] = true error : Tuple type '[name: string, seat: number]' of length '2' has no element at index '2'.

// also there size are immutable




// no suggestions of named tuple while destructuring

const [x, y] = b; // but it shows type suggestion of that particular element


b.push("Varun"); // we can mutate the size by just using .push method
b.push(55);
// b.push(true); error : Argument of type 'boolean' is not assignable to parameter of type 'string | number'.



console.log(b)

