const fs = require('fs');

fs.writeFile('lab7.html',"<h1> noi dung da thay doi</h1>",(err)=>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log("đổi file thành công");
})

// const http = require('http');


// http.createServer(function(request,response){
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     fs.readFile('lab7.html','utf8',(err,data)=>{
//         if(err) console.log(err.message);
//         response.write(data)
//         response.end();

//     })
// })
// .listen(3000,()=>{
//     console.log('app listen port',3000);
// })
