type Callback<T, U> = (item: T) => U;

interface Store<T> {
  list: T[];
  // Generic method: <U> defines a type parameter local to this method
  echoList<U>(index: number, callbackFn: Callback<T, U>): U;
}

interface CustomObject<V> {
  readonly cart: readonly V[];
  // Generic method: <X> defines a type parameter local to this method
  echoCart<X>(index: number, callbackFn: Callback<V, X>): X | undefined;
}

// String Store Implementation
const fruitStore: Store<string> = {
  list: ["apple", "banana", "pear"],
  echoList(index, callbackFn) {
    return callbackFn(this.list[index]);
  },
};

// Number Store Implementation
const numStore: Store<number> = {
  list: [1, 2, 3, 4, 5],
  echoList(index, callbackFn) {
    return callbackFn(this.list[index]);
  },
};

// Immutable Cart Implementation
const cart1: CustomObject<string> = {
  cart: ["t-shirt", "pants", "shades", "socks", "shoes"],
  echoCart(index, callbackFn) {
    if (index < 0 || index >= this.cart.length) return undefined;
    return callbackFn(this.cart[index]);
  },
};

// Executions
const res1 = fruitStore.echoList(1, (item) => item.toUpperCase());
const res2 = numStore.echoList(1, (item) => item.toLocaleString());
const c1 = cart1.echoCart(2, (item) => item.toUpperCase());

console.log(res1, res2, c1);
