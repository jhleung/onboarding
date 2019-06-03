const path = require('path');
const filePath = path.join(__dirname, '../index.html');
const http = require('http');

const server = http.createServer((req, res) => {
	sendHtmlContent(res, filePath);
}).listen(9000).on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\n');
})

function sendHtmlContent(response, fileName){
	var fs = require('fs');
  fs.readFile(fileName, function(err, html){
    if(err){
      response.writeHead(404);
      response.write("Not Found!");
    }
    else{
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(html);
    }
		response.end();
  });
}
