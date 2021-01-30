const { Readable } = require('stream')

const inSteam = new Readable({
    read(size) {
        this.push(String.fromCharCode(this.currentCharCode++))
        if(this.currentCharCode > 90) {
            this.push(null)
        }
    }
})

inSteam.currentCharCode = 65 // A

inSteam.pipe(process.stdout)

// inSteam.on('data',chunk => {
//     process.stdout.write(chunk)
// })