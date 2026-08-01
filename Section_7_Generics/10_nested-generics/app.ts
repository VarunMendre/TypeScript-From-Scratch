type NestedGeneric<T> = {
  value: T;
};

let a: NestedGeneric<string>;
/* type of a will be: 
{
     value: string;
}
*/

let b: NestedGeneric<NestedGeneric<number>>;
/*
Type of b will be : 
let b: {
  value: {
   value: number;
  };
}
*/

type Address<T> = {
  country: string;
  state: string;
  details: T;
};

type Details<U> = {
  city: U;
  street: U;
};

let c: Address<Details<string>>;

/* Type of c : 

let c: {
 country: string;
 state: string;
  details: {
    city: string;
    street: string;
  };
}
 
*/
