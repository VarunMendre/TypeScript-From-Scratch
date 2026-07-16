// type str = string;
// type num = number;
// type bool = boolean;

// type T = str | num;

// function test(a: T) {
//   if (typeof a === "number") {
//     return a + a;
//   }
//   return a.toString();
// }


// type abc = {
//     name: string
// };

// const a: abc = {
//     name: "string",
// }
// so now type of a is : { name: string; } so we cant change its type in dynamically based on usage thats where we introduce generics


type Dynamic<T> = T  // (type parameter) T in type Dynamic<T>  , so <T> is just a place holder or we could say its a type parameter so that is dynamic type and assigning its value as = T

// so this is an generic type Dynamic<T> which has a parameter T


// function parameter is called as : (parameter) a: number  but as we see similar kind of name which is (type parameter) T in type Dynamic<T>  so Generics are also a type of functions
function test(a: number) {
    
}


// but point to note is Generic required only type parameters not normal parameters
// so we could passed any type in that generic para


const a: Dynamic<60> = 60 // so this is valid because 60 is an literal type 
const b: Dynamic<60> = 61 // so this is now valid, coz we want 60 but got 61  