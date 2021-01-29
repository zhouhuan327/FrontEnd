import * as https from "https";
import * as querystring from "querystring";
import md5 = require("md5");

interface BaiduResult {
    error_code?: string;
    error_msg?: string;
    from: string;
    to: string;
    trans_result: Array<{
        src: string;
        dst: string;
    }>
}

export const translate = (word: string) => {
    let from, to
    if (/[a-zA-Z]/.test(word[0])) {
        from = 'en'
        to = 'zh'
    } else {
        from = 'zh'
        to = 'en'
    }
    const appid = '20210129000684881';
    const appSecret = 'FOchvDNqdRyNrgDXqN_l';
    const salt = Math.random();
    const sign = md5(appid + word + salt + appSecret)
    const query = querystring.stringify({
        q: word, from, to, appid, salt, sign
    })
    const options = {
        hostname: 'api.fanyi.baidu.com',
        port: 443,
        path: '/api/trans/vip/translate?' + query,
        method: 'GET'
    }
    const request = https.request(options, response => {
        // console.log(`状态码: ${response.statusCode}`)
        let chunks: Array<Buffer> = []
        response.on('data', (chunk: Buffer) => {
            chunks.push(chunk)
        })
        response.on('end', () => {
            const string = Buffer.concat(chunks).toString()
            const object: BaiduResult = JSON.parse(string)
            if (object.error_code) {
                console.log(object.error_msg)
                process.exit(2)
            }
            const result = object.trans_result[0].dst
            console.log(result);
            process.exit(0)
        })
    })

    request.on('error', error => {
        console.error(error)
    })

    request.end()
}