// // Before
// let tuple: [itemName: string, quantity: number, price: number] = ["T-shirt", 5, 6000];
// tuple.pop(); // invalid operation, we've to make it readonly
// tuple[2] = 5000

// After

let tuple: readonly [itemName: string, quantity: number, price: number] = [
  "T-shirt",
  5,
  6000,
];
// tuple.pop(); // now poping element is invalid
// tuple[2] = 5000

// let arr: readonly number[] = [1, 2, 3];

// arr.pop()   error : Property 'pop' does not exist on type 'readonly number[]'.
// arr.push()

// arr[4] = 5 // Index signature in type 'readonly number[]' only permits reading.

const newTuple = tuple.map((el, ind) => ind == 0 ? el = "Pant" : el);
console.log(newTuple)