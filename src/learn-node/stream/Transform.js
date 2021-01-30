const { Transform } = require('stream')


const upperCaseStream = new Transform({
    transform(chunk,encoding,cb) {
        this.push(chunk.toString().toLocaleUpperCase())
        cb()
    }
})

process.stdin.pipe(upperCaseStream).pipe(process.stdout)