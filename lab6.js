const http = require('http');

http.createServer(function(request,response){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<html>');
    response.write('<head>');
    response.write('<title>Hello world</title>');
    response.write('</head>');
    response.write('<body> <h1>Hello Nodejs 2021<h1>');
    response.write(`<p>${request.url}</p></body>`)
    response.write('</html>');
    response.end();
})
.listen(3000,()=>{
    console.log('app listen port',3000);
})