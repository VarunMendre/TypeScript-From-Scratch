// type RecursiveGeneric<T> = {
//   value: RecursiveGeneric<T>;
// };

// const obj: RecursiveGeneric<string> = {
//   value: {
//     value: {
//       value: {
//         value: {
//           value: {
//             value: {
//               value: {}, // error : Property 'value' is missing in type '{}' but required in type 'RecursiveGeneric<string>'.
//             },
//           },
//         },
//       },
//     },
//   },
// };

// to fix this infinity use optional chaining ?

type RecursiveGeneric<T> = {
  value?: RecursiveGeneric<T>;
};

const obj: RecursiveGeneric<string> = {
  value: {
    value: {
      value: {
        value: {
          value: {
            value: {
              value: {}, // no error
            },
          },
        },
      },
    },
  },
};

type AdjacencyList<T, W> = Map<T, { target: T; weight: W }[]>;

const graph: AdjacencyList<number, number> = new Map([
  [1, [{ target: 2, weight: 3 }]],
  [2, [{ target: 3, weight: 4 }]],
  [3, []],
]);

const neighbor = graph.get(1);
console.log(neighbor); // [ { target: 2, weight: 3 } ]
