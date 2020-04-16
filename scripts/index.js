const argv = require("minimist")(process.argv.slice(2));

const { default: compile } = require("./compile");
if (argv._.includes("compile")) {
  compile();
}