const program = require("commander");

program.option("-x", "--xxx", "description");
program
  .command("add")
  .description("add a task")
  .action((...args) => {
    const param = args.slice(1)[0];
    console.log(param.join(" "));
  });
program
  .command("clear")
  .description("clear all tasks")
  .action(() => {
    console.log("clear success");
  });
program.parse(process.argv);
