const fs = require('fs')
const http = require('http')
// 'const stream = fs.createWriteStream('./big_file.txt')'
//
// for(let i = 0;i<100000;i++) {
//     stream.write(i+'\n')
// }
// stream.end()
// console.log('done')

const server = http.createServer()
server.on('request', (request,response) => {
    // fs.readFile('./big_file.txt',(error,data) => {
    //     if(error) throw  error;
    //     response.end(data)
    //     console.log('done')
    // })
    const stream = fs.createReadStream('./big_file.txt')
    stream.on('data', chunk => {
        console.log('读取了一次数据')
        console.log(chunk.toString())
    })
    stream.on('end', () => {
        console.log('结束了')
    })
    stream.pipe(response)
})
server.listen(8888)