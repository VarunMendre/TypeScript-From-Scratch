// type str = string;
// type num = number;
// type bool = boolean;

// let username: str = "Varun";
// console.log(username)

// let age: num = 22;
// console.log(age);

//

type User = readonly [userId: number, username: string, contactNo: number, isActive: boolean];
type Cart = readonly [ItemName: string, ItemNo: number, ItemPrice: number, UserId: number];
type PaymentStatus = ("success" | "pending" | "failed");


let user: User = [1, "Varun", 123456789, true];
let cart: Cart = ["T-Shirt", 1, 550.24, 1];
let payment: PaymentStatus = "success";

console.log({ user, cart, payment });


