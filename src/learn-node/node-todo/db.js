const path = require("path");
const fs = require("fs");
const homeDir = require("os").homedir();
const home = process.env.HOME || homeDir;
const dbPath = path.join(home, ".todo");
const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: "a+" }, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        let list;
        try {
          list = JSON.parse(data.toString());
        } catch (e) {
          list = [];
        }
        resolve(list);
      });
    });
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list);
      fs.writeFile(path, string + "\n", (err) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve();
      });
    });
  },
};
module.exports = db;
