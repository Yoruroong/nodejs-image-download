const readline=require("readline");
 
const rl=readline.createInterface({
  input:process.stdin,
  output:process.stdout
});
 
rl.setPrompt("다운할 이미지 URL(CTRL+C => STOP)");
 
rl.prompt();
rl.on("line",(data)=>{
    var fs = require('fs'),
    request = require('request');

    var download = function(uri, filename, callback){
        request.head(uri, function(err, res, body){
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };

    download(data, 'image.png', function(){
        console.log('Done');
        process.exit()
    });
});