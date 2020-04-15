const readline=require("readline");
const { createWriteStream } = require("fs");
const request = require("request");

const rl=readline.createInterface({
  input:process.stdin,
  output:process.stdout
});
 
rl.setPrompt("다운할 이미지 URL (Press CTRL+C to STOP)");
 
rl.prompt();

rl.on("line", data => {
    let download = (uri, filename, callback) => {
        return request.head(uri, (err, res, body) => {
            if(err) {
                console.error(err.stack || err)
                process.exit(1)
            }
            console.log('Content-Type:', res.headers['content-type']);
            console.log('Content-Length:', res.headers['content-length']);

            return request(uri).pipe(createWriteStream(filename)).on('close', callback);
        });
    };

    download(data, 'image.png', () => {
        console.log('Done');
        process.exit()
    });
});
