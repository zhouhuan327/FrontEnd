const { Duplex } = require('stream')

const inoutStream = new Duplex({
    write(chunk,encoding,cb) {
        console.log(chunk.toString())
        cb()
    },
    read(size) {
        this.push(String.fromCharCode(this.currentCharCode++))
        if(this.currentCharCode > 90) {
            this.push(null)
        }
    }
})
inoutStream.currentCharCode = 65;

process.stdin.pipe(inoutStream).pipe(process.stdout)