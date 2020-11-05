let http = require('http');
let fs = require('fs');
let url = require('url')

let server = http.createServer()
server.on('request', (request, response) =>
{
	console.log(request.url)
	let query = url.parse(request.url, true).query
	if (query.name != undefined)
	{
	response.end("Hello " + query.name)
	}
	else
	{
		fs.readFile('index.html', (err, data) => 
		{
			if (err)
			{
				response.writeHead(404)
				response.end("File not found\n")
			}
			else
			{
				response.writeHead(200, 
				{
					'Content-Type': 'text/plain; charset=utf-8'
				})
				response.end('Hello World\n')
			}	
		})
	}
})
server.listen(8081)

console.log('Server running at http://127.0.0.1:8081')
