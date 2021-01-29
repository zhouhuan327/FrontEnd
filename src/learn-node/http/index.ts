import * as http from 'http'
import { IncomingMessage } from 'http'
const server = http.createServer()

server.on('request',(request: IncomingMessage,response) => {
    console.log(request.headers)
    response.end('hi')
})

server.listen(8887);
