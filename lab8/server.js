const fs = require('fs');
const http = require('http');
const url = require('url');

http.createServer(function(req,res){
    let urlParse = url.parse(req.url,true);
    let path = urlParse.path;
    console.log(res.statusCode,"path url: ",path);
    res.writeHead(200, {'Content-Type': 'text/html'});
    if(path==='/'){
        fs.readFile('./index.html',(err,data)=>{
            if(err){
                res.write("<h1>Not found</h1>");
                res.end();
            }
            else{
                res.write(data);
                res.end();
            }
        });
    }
    else{
        file = `.${path}.html`;
        fs.readFile(file,(err,data)=>{
            if(err){
                res.write("<h1>Not found</h1><br><a href='/'>Trang chủ</a>");
                res.end();
            }
            else{
                res.write(data);
                res.end();
            }
        })
    }
}).listen(3000,()=>{
    console.log(`app listen port 3000`);
})