const http = require('http');
const fs = require('fs');
const formidable = require('formidable');

http.createServer(function(req,res){
    if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
        var form = new formidable.IncomingForm();
        form.uploadDir = "uploads/";
        form.parse(req, function (err, fields, file) {
            var path = file.files.path;
            var newpath = form.uploadDir + file.files.name;
            fs.rename(path, newpath, function (err) {
                if (err) throw err;
                res.end('<h1>Upload Thanh cong!</h1>');
            });
        });
        return;
    }
    res.writeHead('200', {'Content-Type': 'text/html'});
    fs.readFile('index.html', 'utf8', function (err, data) {
        if (err) throw err;
        res.end(data);
    })
}).listen(3000,()=>{
    console.log("app listen port 3000...!");
});