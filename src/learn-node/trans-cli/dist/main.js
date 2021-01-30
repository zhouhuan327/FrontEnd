"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
var https = __importStar(require("https"));
var querystring = __importStar(require("querystring"));
var md5 = require("md5");
var translate = function (word) {
    var from, to;
    if (/[a-zA-Z]/.test(word[0])) {
        from = 'en';
        to = 'zh';
    }
    else {
        from = 'zh';
        to = 'en';
    }
    var appid = '20210129000684881';
    var appSecret = 'FOchvDNqdRyNrgDXqN_l';
    var salt = Math.random();
    var sign = md5(appid + word + salt + appSecret);
    var query = querystring.stringify({
        q: word,
        from: from, to: to, appid: appid, salt: salt, sign: sign
    });
    var options = {
        hostname: 'api.fanyi.baidu.com',
        port: 443,
        path: '/api/trans/vip/translate?' + query,
        method: 'GET'
    };
    var request = https.request(options, function (response) {
        // console.log(`状态码: ${response.statusCode}`)
        var chunks = [];
        response.on('data', function (chunk) {
            chunks.push(chunk);
        });
        response.on('end', function () {
            var string = Buffer.concat(chunks).toString();
            var object = JSON.parse(string);
            if (object.error_code) {
                console.log(object.error_msg);
                process.exit(2);
            }
            var result = object.trans_result[0].dst;
            console.log(result);
            process.exit(0);
        });
    });
    request.on('error', function (error) {
        console.error(error);
    });
    request.end();
};
exports.translate = translate;
