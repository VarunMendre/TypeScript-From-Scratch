// generate-benchmarks.js
const fs = require("fs");

const COUNT = 1000000;

// 1. Generate Interfaces File
let interfaceContent = "";
for (let i = 0; i < COUNT; i++) {
  interfaceContent += `export interface InterfaceDef${i} {\n  id: number;\n  name: string;\n  isActive: boolean;\n  data: string[];\n}\n`;
}
interfaceContent += "\n// Instantiating Objects\n";
for (let i = 0; i < COUNT; i++) {
  interfaceContent += `const objInt${i}: InterfaceDef${i} = { id: ${i}, name: "Item${i}", isActive: true, data: ["a", "b"] };\n`;
}
fs.writeFileSync("interfaces.ts", interfaceContent);
console.log(`✅ Generated interfaces.ts with ${COUNT} interfaces and objects.`);

// 2. Generate Types File
let typeContent = "";
for (let i = 0; i < COUNT; i++) {
  typeContent += `export type TypeDef${i} = {\n  id: number;\n  name: string;\n  isActive: boolean;\n  data: string[];\n};\n`;
}
typeContent += "\n// Instantiating Objects\n";
for (let i = 0; i < COUNT; i++) {
  typeContent += `const objType${i}: TypeDef${i} = { id: ${i}, name: "Item${i}", isActive: true, data: ["a", "b"] };\n`;
}
fs.writeFileSync("types.ts", typeContent);
console.log(`✅ Generated types.ts with ${COUNT} types and objects.`);
