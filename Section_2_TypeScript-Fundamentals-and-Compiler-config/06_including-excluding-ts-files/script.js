const fs = require("fs");
const { SourceMapConsumer } = require("source-map");

// Load your FULL .map file (not just the mappings string)
const mapData = fs.readFileSync("./dist/app.js.map", "utf8");
const mapJson = JSON.parse(mapData);

SourceMapConsumer.with(mapJson, null, (consumer) => {
  consumer.sources.forEach((sourcePath) => {
    const content = consumer.sourceContentFor(sourcePath);
    if (content) {
      console.log(`--- ${sourcePath} ---`);
      console.log(content);
      // Optional: Write to file
      // fs.writeFileSync(`./restored/${sourcePath}`, content);
    } else {
      console.log(`No content found for ${sourcePath}`);
    }
  });
});
