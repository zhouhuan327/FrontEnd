const { Readable } = require('stream')

const inSteam = new Readable()

inSteam.push('adfasfdasf')
inSteam.push('3434324')
inSteam.push(null)

// inSteam.pipe(process.stdout)

inSteam.on('data',chunk => {
    console.log('写数据了',chunk)
    process.stdout.write(chunk)
})