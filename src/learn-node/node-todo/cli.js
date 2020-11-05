const program = require("commander");
const server = require("./server");
program.option("-x", "--xxx", "description");
program
  .command("add")
  .description("add a task")
  .action((...args) => {
    const param = args.slice(1)[0];
    server.add(param.join(""));
  });
program
  .command("clear")
  .description("clear all tasks")
  .action(() => {
    server.clear();
  });
program
  .command("show")
  .description("show all tasks")
  .action(() => {
    server.showAll();
  });
if (process.argv.length === 2) {
  server.showAll();
}

program.parse(process.argv);
