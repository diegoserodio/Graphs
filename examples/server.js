var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
console.log("Received Request: " + request.url.slice(1));
    if(request.url.indexOf('.html') != -1) {
        fs.readFile(request.url.slice(1), function (error, data) {
            if (error) {
                response.writeHead(404, {"COntent-type":"text/plain"});
                response.end("No Html Page Found.");
            } else{
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
                response.end();
            }

        });
    }
    else if(request.url.indexOf('.js') != -1) {
        fs.readFile(request.url.slice(1), function (error, data) {
            if (error) {
                response.writeHead(404, {"COntent-type":"text/plain"});
                response.end("No Javascript Page Found.");
            } else{
                response.writeHead(200, {'Content-Type': 'text/javascript'});
                response.write(data);
                response.end();
            }

        });
    }
    else if(request.url.indexOf('.css') != -1) {
        fs.readFile(request.url.slice(1), function (error, data) {
            if (error) {
                response.writeHead(404, {"COntent-type":"text/plain"});
                response.end("No Css Page Found.");
            } else{
                response.writeHead(200, {'Content-Type': 'text/css'});
                response.write(data);
                response.end();
            }

        });
    }
    else if(request.url.indexOf('.csv') != -1) {
        fs.readFile(request.url.slice(1), function (error, data) {
            if (error) {
                response.writeHead(404, {"COntent-type":"text/plain"});
                response.end("No Css Page Found.");
            } else{
                response.write(data);
                response.end();
            }

        });
    }
    else {
      fs.readFile('index.html', function(err, data) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(data);
      response.end();
      });
    }
}).listen(8080);
