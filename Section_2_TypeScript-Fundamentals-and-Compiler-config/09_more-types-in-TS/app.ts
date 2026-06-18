// let a: any = 5;
// let b: unknown = 5; // enforce to use unknown property or method which is not available on that if want to then use type narrowing

// a = "HI"
// b = "BYE"

// a.toUpperCase();
// // b.toUpperCase(); error : 'b' is of type 'unknown'


// // this concept is called type narrowing
// if (typeof b === 'number') {
//     b.toString();
// }
// else if (typeof b === 'string') {
//     b.toLocaleLowerCase();
// }


// Bottom type

let a = 5;

if (typeof a === 'number') {
    console.log(a);
} else {
    console.log(a)
}