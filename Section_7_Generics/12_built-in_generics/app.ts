// Built-in Generics

// Arrays

// Behavior of arrays
// if we type:
new Array(); // will return an []

new Array(6); // will give (6) [empty × 6]

new Array(6, 1); // (2)[(6, 1)];  , its called function overloading based on no of arguments our function behaves differently

new Array(""); // ['']

// In Ts :

const arr = new Array(6); // type of arr is array of any of 6 size
const arr2 = new Array("6"); // type of array is string
// const arr3 = new Array(1, "6"); // type of array will be const arr3: number[] because it will infer type of 1st element when there are multiple args
// Array constructor doesn't create mixed type of arrays

// Interface of Array
const arr6: Array<string> = new Array();
const arr7: Array<string> = [];

arr.push(1);
arr.push("1");
arr.push(false);

arr2.push("6");
arr2.push("6");

// now what we want is we want an empty array but while creating we've to define a type to it thats where we'll use generic

const arr4 = new Array<string>();
arr4.push("string");

const arr5 = new Array<number>();
arr5.push(4);

// so above is out built-in generic constructor function

// so unlike other constructor function like Object, Number, Boolean, String they're not Generic

// Map Generic Constructor

const mpp1 = new Map(); // by default it gives : Map<any, any>

mpp1.set("1", 23);
mpp1.set(1, "23");

const mpp2 = new Map<number, string>(); // mpp2 is a type of Map<number, string>

// Interface of Map
const mpp3: Map<string, number> = new Map();
mpp2.set(1, "123");
mpp2.set(2, "231");
// mpp2.set(1, false); // error : Argument of type 'boolean' is not assignable to parameter of type 'string'

// Set Generic Constructor

const st = new Set(); // by default it gives st: Set<unknown>
st.add(1);
st.add("1");
st.add(false);

const st1 = new Set<string>();

st1.add("1");
st1.add("2");
// st1.add(3); // error : Argument of type 'number' is not assignable to parameter of type 'string'.

// ReadOnly Generic Type

interface User {
  name: string;
  age: number;
}

// now what i want is only selected objects could follow the property of readonly not all thats where we could use Readonly generic type

const user: User = {
  age: 22,
  name: "Varun",
};

user.name = "ABC";
user.age = 23;

const user2: Readonly<User> = {
  name: "Varun",
  age: 23,
};

/* type of user2 obj will be : 
const user2: {
 readonly name: string;
 readonly age: number;
}
*/
user2.name = "fvk"; // error : Cannot assign to 'age' because it is a read-only property.
user2.age = 85; // errro : Cannot assign to 'age' because it is a read-only property.



const arr8: ReadonlyArray<number> = [1, 2, 3, 4, 5];
const mpp4: ReadonlyMap<string, number> = new Map();
const st2: ReadonlySet<boolean> = new Set();

