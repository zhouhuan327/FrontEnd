import * as http from 'http'
import { IncomingMessage } from 'http'
const server = http.createServer()
import * as fs from 'fs';
import * as path from 'path'
import * as url from "url";

const publicDir = path.resolve(__dirname,'public')
server.on('request',(request: IncomingMessage,response) => {
    // const array = []
    // request.on('data', chunk => {
    //     array.push(chunk)
    // })
    // request.on('end', () => {
    //     const body = Buffer.concat(array).toString()
    //     console.log(body)
    //     response.end(body)
    // })
    const { url:realUrl,method } = request
    const {pathname,search} = url.parse(realUrl)
    const filename = pathname.substr(1);
    fs.readFile(path.resolve(publicDir,filename),(err,data) => {
        if(err) {
            response.statusCode = 404
            response.end('文件不存在')
        }
        response.setHeader('Cache-Control','public, max-age=30000')
        response.end(data)
    })


})

server.listen(8887);
