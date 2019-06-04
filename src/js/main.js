const path = require('path');
const filePath = path.join(__dirname, '../index.html');
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	fs.readFile(filePath, (err, html) => {
		if(err) {
			res.writeHead(404);
			res.write("Not Found!");
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(html);
		}
		res.end();
	})
}).listen(9000);