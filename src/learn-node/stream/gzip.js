const fs = require('fs')
const zlib = require('zlib')
const file = process.argv[2]
const { Transform } = require('stream')

const reportProgress = new Transform({
    transform(chunk,encode,cb) {
        process.stdout.write('.')
        cb(null,chunk)
    }
})
fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(reportProgress) // 进度条
    .pipe(fs.createWriteStream(file+'.gz'))
    .on('finish',() => console.log('done'))