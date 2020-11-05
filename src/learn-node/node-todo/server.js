const db = require("./db");
const inquirer = require("inquirer");
module.exports.add = async (title) => {
  const list = await db.read();
  list.push({ title, done: false });
  await db.write(list);
};
module.exports.clear = async () => {
  await db.write([]);
};
module.exports.showAll = async () => {
  const list = await db.read();
  inquirer
    .prompt({
      type: "list",
      name: "index",
      message: "请选择你想操作的任务",
      choices: [
        { name: "退出", value: -1 },
        { name: "创建任务", value: -2 },
        ...list.map((task, index) => ({
          name: `${task.done ? "[x]" : "[]"} ${task.title}`,
          value: index,
        })),
      ],
    })
    .then((ans) => {
      console.log(ans.index);
      if (ans.index === -1) {
        console.log("退出");
      } else if (ans.index === -2) {
        inquirer
          .prompt({
            type: "input",
            message: "输入任务标题栏",
            name: "title",
          })
          .then(async (ans) => {
            list.push({
              title: ans.title,
              done: false,
            });
            await db.write(list);
            console.log("创建成功！");
          });
      } else {
        askForAction(list, ans.index);
      }
    });
};
function markAsDone(list, index) {
  list[index].done = true;
  db.write(list);
}
function markAsUnDone(list, index) {
  list[index].done = false;
  db.write(list);
}
function updateTitle(list, index) {
  inquirer
    .prompt({
      type: "input",
      name: "title",
      message: "新的标题",
      default: list[index].title,
    })
    .then(async (ans) => {
      list[index].title = ans.title;
      await db.write(list);
      console.log("修改成功");
    });
}
function removeTask(list, index) {
  list.splice(index, 1);
  db.write(list);
}
function askForAction(list, index) {
  const actions = { markAsDone, markAsUnDone, updateTitle, removeTask };
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "请选择操作",
      choices: [
        { name: "退出", value: "quit" },
        { name: "已完成", value: "markAsDone" },
        { name: "未完成", value: "markAsUnDone" },
        { name: "修改", value: "updateTitle" },
        { name: "删除", value: "removeTask" },
      ],
    })
    .then((res) => {
      const action = actions[res.action];
      console.log(action);
      action && action(list, index);
    });
}
