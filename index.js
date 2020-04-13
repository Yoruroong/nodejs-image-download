var fs = require('fs'),
       request = require('request');

var download = function(uri, filename, callback){
     request.head(uri, function(err, res, body){
       console.log('content-type:', res.headers['content-type']);
       console.log('content-length:', res.headers['content-length']);

       request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
     });
};

download('https://cdn.pixabay.com/photo/2020/04/04/03/07/lake-5000642_960_720.jpg', 'image.png', function(){
     console.log('done');
});