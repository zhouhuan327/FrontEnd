const child_process = require('child_process')
const { exec,execFile,spawn } = child_process
// 都是用来创建进程 执行命令

// exec('ls ../', (error,stdout,stderr) => {
//     console.log(error,stdout,stderr)
// })

const res = exec('pwd')
res.stdout.on('data',chunk => {
    console.log('chunk',chunk.toString())
})
// exec 可以被注入代码

execFile('ls',['-la'],{
    cwd:'/Users/mac/code',
    env: {NODE_EVN: 'development'},
    maxBuffer: 1024
},(error,stdout) => {
    console.log(error,stdout)
})

const streams = spawn('ls',['-la'],{
    cwd:'/Users/mac/code/FrontEnd'
})
streams.stdout.on('data',chunk => {
    console.log('chunk',chunk.toString())
})

