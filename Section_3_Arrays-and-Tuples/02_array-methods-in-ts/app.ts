// let arr = [1, 2, 3];

// const newArr1 = arr.map((el) => el.toString());
// const newArr2 = arr.map((el) => el % 2 === 1);

// console.log(newArr1[0]);
// console.log(newArr2[0]);

// let arr = [1, 2, "3,", 4, "5", 6, "hi"];
// const result = arr.filter((el) => typeof el === "number");
// console.log(result);

let arr = [1, 2, 3];

let result = arr.reduce((curr, acc) => ({}), {});

console.log(result)