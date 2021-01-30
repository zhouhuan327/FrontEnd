const child_process = require('child_process')

const child = child_process.fork('./child_process.js')

child.on('message', m => {
    console.log('父进程得到消息',m)
})