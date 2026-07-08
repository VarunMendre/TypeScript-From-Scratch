type T0 = {};
type T1 = { length: number };
type T2 = { length: number; name: string };
type T3 = { toString(): string };

// type T4 = T0 | T1;


/* 
i thought T4 type will be {} but it was : 

type T4 = {} | {
    length: number;
}

means a value which could be assignable to {} or length:number
*/

// const obj: T4 = { age: 40 }; // valid



type T4 = T1 | T2; 

// result should be the largest set which is T1 and yeah it is correct but when we hover on T4 we could see:
/* 
{
    length: number;
} | {
    length: number;
    name: string;
}

that means the things we could assign from T1 or T2 will consider valid for T4
*/

//so :

const obj: T4 = { length: 40, name: "Varun"}

// but we cant assign this above properties in T1 so

const a = {
  length: 40,
  name: "Varun",
};

// so using structural typing it is possible 
const obj2: T1 = a;

// so we could also assign it into T4 too, because its union
const obj3: T4 = a;


type T5 = T1 & T2; // T5 will contain { length: number; name: string }; because T2 is subset which is smaller then T1 so we could assign only value or properties which have  length: number & name: string both

// const b = {
//     length: 40,
//     name: "John",
// }


const b = function() {}  // because function has length & name both property 
const obj4: T5 = b;




// type T6 = T2 | T3; // result will be T3 which is bigger set but when we hover on T6 it will show us : type T6 = T2 | T3
// // means any value / property which is from T2 or T3 could be assignable to T6


type T6 = T2 & T3; 

const obj6: T6 = {
    length: 5,
    name: "Varun"
}

// here this obj6 is satisfying both T2 & T3 , you may see i've mention property length & name explicitly then also my IntelliSense is not giving me error
// because i've declared an obj which inHerits method toString() from Object.prototype so thats why it satisfying all 3 conditions



/*
type T1 = { length: number };
type T2 = { length: number; name: string };
*/

type T7 = T1 & T2;

// const obj7: T7 = {

// }

// obj7.