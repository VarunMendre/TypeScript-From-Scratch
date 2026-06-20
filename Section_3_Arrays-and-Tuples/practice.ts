// let user: [name: string, age: number] = ["Varun", 22];
// console.log(`Name ${user[0]} is ${user[1]} old`);

// Try assigning values in the wrong order and observe the TypeScript error.

// let user: [string, number] = [22, "Varun"]
// error : Type 'number' is not assignable to type 'string'

// let arr: readonly [string, number] = ["Varun", 22];

// arr.push(); error : Property 'push' does not exist on type 'readonly
// arr.pop();


// let student: [name: string, age: number, marks: number] = ["Varun", 22, 88.75];

// for (let i of student) {
//     console.log(i)
// }

