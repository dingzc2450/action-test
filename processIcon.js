const https = require('https');
const fs = require('fs');

const ICON_DOWNLOAD_URL = 'https://at.alicdn.com/t/c/font_4474791_w6ixqbalh2h.js';

function downloadFile(fileUrl, outputLocationPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(outputLocationPath);
        // const sendReq = request.get(fileUrl);
        const sendReq = https.get(fileUrl, (response) => {
            // check if response is success
            if (response.statusCode !== 200) {
                return reject('Response status was ' + response.statusCode);
            }

            response.pipe(file);
        });

        // check for request error too
        sendReq.on('error', (err) => {
            fs.unlink(outputLocationPath);
            return reject(err);
        });

        file.on('finish', () => {
            file.close(() => {
                resolve();
            });
        }
        );

        file.on('error', (err) => {
            fs.unlink(outputLocationPath);
            return reject(err);
        }
        );
    });
}


downloadFile(ICON_DOWNLOAD_URL, 'iconfont111111.js').then(() => {
    // 查看当前目录
    fs.readdir('./', (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    });
    // git执行查看到当前代码所在分支
    const exec = require('child_process').exec;
    exec('git branch', function (err, stdout, stderr) {
        console.log(stdout);
    });


})