const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => { 
    if(req.url === "/"){
        fs.readFile("./index.html", "UTF-8", function(err, html){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
        });
    }else if(req.url.match("\.css$")){
        var fileStream = fs.createReadStream('./index.css', "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);

    } else if(req.url.match("index\.js$")){
        var fileStream = fs.createReadStream('./index.js', "UTF-8");
        res.writeHead(200, {"Content-Type": "text/javascript"});
        fileStream.pipe(res);
    } 
    else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("No Page Found");
    }
})

console.log("<< Login page running on port 8000 >>");
server.listen(8000);