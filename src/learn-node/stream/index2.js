const fs = require('fs')

const RStream = fs.createReadStream('./big_file.txt')
const WStream = fs.createWriteStream('./write.txt')
let count = 0
RStream.on('data', chunk => {
    count++
    if(count > 3) {
        RStream.pause()
        console.log('可读流停止了')
    }
    WStream.write(chunk)
})
setTimeout(() => {
    RStream.resume()
    console.log('可读流恢复了')
},2000)
RStream.on('end',() => {
    WStream.end()
})
// console.log('缓冲到内存')
// WStream.cork()
// setTimeout(() => {
//     WStream.uncork();
//     console.log('uncork')
// },1000)

WStream.on('drain', () => {
    console.log('write string drain')
})
WStream.on('finish', () => {
    console.log('finish')
})
