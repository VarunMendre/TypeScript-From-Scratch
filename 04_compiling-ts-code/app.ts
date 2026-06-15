let num: any;

// error : Cannot redeclare block-scoped variable 'num'.
// why because in our o/p file app.js same variable is re-declare with let num because TS treat all files in global-scope even when file-names are different

// to fix that error :

/* 
1. at then end of .ts file write exports {} so ts will treat it like a module file
2. create tsconfig.json file so TS lang compiler will treat all files as module

*/
console.log(typeof num);

num = "string";

console.log(typeof num);

num = 5;

console.log(typeof num);

let string: string = "Varun";
console.log(string);
export {};