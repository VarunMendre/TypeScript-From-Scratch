function controlStreetLight<C extends string>(colors: C[], defaultColor: C) {}

controlStreetLight(["red", "yellow", "green"], "blue");
// what we want is the 2nd argument to be one from colors[] which is in the first argument, so 'blue' should cause a TypeScript error here.

/* Currently TypeScript is infering like this : 

function controlStreetLight<"red" | "yellow" | "green" | "blue">
                            (colors: ("red" | "yellow" | "green" | "blue")[], 
                            defaultColor: "red" | "yellow" | "green" | "blue"): void

*/

// To solve this problem we'll use NoInfer to prevent TypeScript from inferring the type of the second argument based on the first argument.
//  Here's how you can modify the function to achieve that:

function controlStreetLight2<C extends string>(colors: C[], defaultColor: NoInfer<C>) {}

controlStreetLight2(["red", "yellow", "green"], "blue"); // error: Argument of type '"blue"' is not assignable to parameter of type '"red" | "yellow" | "green"'.
// NoInfer<C> says don't infer and decided the value from second argument,
// instead, it will only allow values that are part of the first argument's type,
//  so 'blue' will now cause a TypeScript error as desired.


// Also its type definition in lib.es5.d.ts is intrinsic means it is defined inside the compiler and
// not in the standard library, so you can use it without importing it from anywhere or we cant custom define it in our codebase.



// More examples of NoInfer usage:

function example1<T>(arg: NoInfer<T>) {
  // arg is of type T, but TypeScript won't infer T from the argument passed to the function
}

example1<string>("hello"); // T is inferred as string