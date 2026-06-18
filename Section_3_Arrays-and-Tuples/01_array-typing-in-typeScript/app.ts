// let arr: number[] = [];

// // arr.push("vv") error : Argument of type 'string' is not assignable to parameter of type 'number'.

// arr.push(1);

// arr[1] = 2;

// arr.unshift(0);

// console.log(arr);


// Array of type : any
// let arr: (string | number)[] = [1, "2"];

// arr.push("1");
// arr.push(2);

// arr[3] // gets only 3 common methods which are in string and number


// let arr: unknown[] = [1];


// arr.push("1");
// arr.push(2);
// arr.push(false);


// let arr: any[] = [1, "2"];


// let a: never;
 
// [].push();
// type 'never' of an empty array, because we've not assign to any variable and you can't perform any operation on this type



// Task: push a element in that empty array which type is never


let a = 5;

if (typeof a === "number") {
    
} else {
    [].push(a);
}

