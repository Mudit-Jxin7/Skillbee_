const { Eta } = require("eta");
const path = require("path");
const fs = require("fs");

const eta = new Eta({ views: path.join(__dirname, "templates") });

// Render the template
const res = eta.render("./simple", { name: "Ben" });
const outputFilePath = path.join(__dirname, "output.html");

fs.writeFileSync(outputFilePath, res);

console.log("HTML content has been written to output.html"); 