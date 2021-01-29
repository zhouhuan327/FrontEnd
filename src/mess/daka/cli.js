#! /usr/bin/env node
const program = require("commander");
const chalk = require('chalk')
const server = require('./server')
program.option("-x", "--xxx", "daka cli");

program
  .version('0.1.0')
  .arguments('<username>')
  .description('test command', {
    xuehao: '学号后两位'
  })
  .action((xuehao) => {
    if(isNaN(xuehao)) {
        console.log(chalk.red('请输入正确的学号后两位'))
    }
    server.run(Number(xuehao))
  });

program.parse(process.argv);
