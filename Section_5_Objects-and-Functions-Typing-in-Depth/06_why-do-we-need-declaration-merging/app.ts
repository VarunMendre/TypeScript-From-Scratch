// ============================================
// DESCRIPTION: Merging multiple interface declarations
// The compiler combines all properties into a single type.
// Later declarations add new members; conflicting non-function
// properties must have the same type.
// ============================================

interface Product {
  id: number;
  name: string;
}

// This declaration merges with the one above
interface Product {
  price?: number; // Optional property added
}

// EXAMPLE USAGE:
const product: Product = {
  id: 1,
  name: "Laptop",
  // price is optional, so omission is valid
};

console.log(product);
// Output: { id: 1, name: "Laptop" }


// ============================================
// DESCRIPTION: Extending the global 'Window' interface
// to include a custom property 'myAppConfig'.
// 'declare global' tells TypeScript this augmentation
// applies to the global scope, not just this file.
// Requires the file to be a module (have import/export).
// ============================================

// Ensure this file is treated as a module
export {};

declare global {
  interface Window {
    myAppConfig: {
      apiEndpoint: string;
      debugMode: boolean;
    };
  }
}

// EXAMPLE USAGE:
// Now TypeScript recognizes 'myAppConfig' on 'window'
window.myAppConfig = {
  apiEndpoint: "https://api.example.com",
  debugMode: true
};

console.log(window.myAppConfig.apiEndpoint);
// Output: "https://api.example.com"   