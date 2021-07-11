const fs = require('fs');
const path = require('path');

let ip1 = '34.48.240.111';
let ip2 = '89.123.1.41';

const readStream = new fs.ReadStream('./access.log', 'utf8');
const writeStream1 = fs.createWriteStream(path.join(__dirname, ip1 + '_request.log'), { flags: 'a', encoding: 'utf8' });
const writeStream2 = fs.createWriteStream(path.join(__dirname, ip2 + '_request.log'), { flags: 'a', encoding: 'utf8' });

readStream.on('data', (chunk) => {
	// console.log('Chunk');
	// console.log(chunk);

    let stringsArr = chunk.toString().split("\n");
    for(let i = 0; i < stringsArr.length; i++) {
        if (stringsArr[i].includes(ip1)) {
            writeStream1.write(stringsArr[i] + "\n");
        }

        if (stringsArr[i].includes(ip2)) {
            writeStream2.write(stringsArr[i] + "\n");
        }
    }
});

readStream.on('end', () => console.log('File reading finished'));
readStream.on('error', () => console.log(err));