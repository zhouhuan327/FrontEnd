#!/usr/bin/env node
const program = require("commander");
const package = require("./package.json");
program
  .version(package.version)
  .command("rmdir <dir> [otherDirs...]")
  .option("-f, --foo", "enable some foo")
  .option("-b, --bar", "enable some bar")
  .option("-B, --baz", "enable some baz");

program.on("--help", function () {
  console.log("");
  console.log("Examples:");
  console.log("  $ custom-help --help");
  console.log("  $ custom-help -h");
});
program.on("-f", function () {
  console.log("test");
});

program.parse(process.argv);
