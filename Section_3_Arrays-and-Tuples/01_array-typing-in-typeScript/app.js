let arr = [];
// arr.push("vv") error : Argument of type 'string' is not assignable to parameter of type 'number'.
arr.push(1);
arr[1] = 2;
arr.unshift(0);
console.log(arr);
export {};
