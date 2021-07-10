const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');

let ip1 = '34.48.240.111';
let ip2 = '89.123.1.41';

const rs = new fs.ReadStream('./access.log', 'utf8');
const ws1 = fs.createWriteStream(path.join(__dirname, ip1 + '_request.log'), { flags: 'a', encoding: 'utf8' });
const ws2 = fs.createWriteStream(path.join(__dirname, ip2 + '_request.log'), { flags: 'a', encoding: 'utf8' });

find(ip1, ws1);
find(ip2, ws2);

function find (ip, ws) {
    const transformStream1 = new Transform({
        transform(chunk, encoding, callback) {
            let transformedChunk = [];
            let stringsArr = chunk.toString().split("\n");
            for(let i = 0; i < stringsArr.length; i++) {
                if (stringsArr[i].includes(ip)) {
                    transformedChunk.push(stringsArr[i]);
                }
            }
     
            this.push(transformedChunk.join("\n") + "\n");
            
            callback();
        }
     });

     rs.pipe(transformStream1).pipe(ws); 
}