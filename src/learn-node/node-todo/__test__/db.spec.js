const db = require("../db.js");
const fs = require("fs")
jest.mock('fs')

describe("db", () => {
  it("can read", async () => {
    expect(db.read instanceof Function).toBe(true)
    const data = [{title:'hi',done:false}]
    fs.setReadMock("/test",null,JSON.stringify(data))
    const list = await db.read("/test")
    expect(list).toStrictEqual(data)
  });
  it("can write", async () => {
    expect(db.write instanceof Function).toBe(true)
    let fakeFile
    fs.setWriteMock("/test2", (path,data,cb) => {
      fakeFile = data
      cb(null)
    })
    const data = [{title:'hi',done:false}]
    await db.write(data,'/test2')
    expect(fakeFile).toBe(JSON.stringify(data)+'\n')
  });
});
