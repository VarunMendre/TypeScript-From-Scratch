// Promise Generic Constructor & Interface


const p = new Promise((resolve, reject) => {
  resolve("Promise Resolved");
});

const result = await p;
console.log(result);


const p1 = new Promise<string>((res, rej) => {
  res("Good Morning !")
});

const p2 = new Promise<number>((res, rej) => {
  res(123)
});

const res = await p1;
console.log(res)

const myPromise = await  Promise.resolve({ key: "value" });
