// 假的fs
'use strict';


const fs = jest.createMockFromModule('fs');
const realFS = jest.requireActual("fs")
Object.assign(fs,realFS)
const readMocks = {}

fs.setReadMock = (path, error, data) => {
    readMocks[path] = [error,data]
}
fs.readFile = (path,options,cb) => {
    if(cb === undefined) {
        options = cb
    }
    if(path in readMocks) {
        cb(...readMocks[path])
    } else {
        realFS.readFile(...arguments)
    }
}
const writeMocks = {}
fs.setWriteMock = (path, fn) => {
   writeMocks[path] = fn
}
fs.writeFile = (path,data,options,cb) => {
    if( path in writeMocks) {
        writeMocks[path](path,data,options,cb)
    } else {
        realFS.writeFile(path,data,options,cb)
    }

}
module.exports = fs;