type GetArrayType<T> = T extends unknown[] ? T : never;

type T1 = GetArrayType<string[]>; // type T1 = string[]
type T2 = GetArrayType<number[]>; // type T2 = number[]

// but what we want is to extact the only type, means instead of string[] we want only string
// so thats where we should use infer keyword, it is only used right side of extends keyword

// ------- Using `Infer` Keyword -------
type GetArrayTypeUsingInfer<T> = T extends (infer I)[] ? I : "never";
/* What we're saying here is : 
i. (infer I)[] -> this will be an array of which ever thing type just infer it and store it in I, instead of saying unknown[] 
ii. T extends (infer I)[] -> this says that T is extending/is assignable to which ever thing that array is (infer I)[]
    & which ever array it is (i.e., (infer I)[]) put that which ever thing inside X 

iii. (infer I)[] -> see its nothing but unknown[] but it is extracting type of that array and storing inside I
*/

type TI1 = GetArrayTypeUsingInfer<string[]>; // type TI = string
type TI2 = GetArrayTypeUsingInfer<number[]>; // type TI2 = number
type TI3 = GetArrayTypeUsingInfer<{}>; // type TI3 = "never" -> because its not array of something

type TI4 = GetArrayTypeUsingInfer<[]>; // type TI4 = never, Why ?? =>
// Because we call empty array as never so its not possible to say never[] so its just never
// also point to note
// that this never value is coming from first condition which is from : I, not from second condition which is "never"
