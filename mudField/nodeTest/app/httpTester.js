const http = require('http')

const server = http.createServer(function(req, res){
    console.log("Header  -- %j", req.headers);
    if(req.url === '/'){
        res.write("hello world");
        res.end();
    }

    if(req.url === '/api/ids'){
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }

    if(req.url === '/headers'){
        res.write(JSON.stringify(req.headers));
        res.end();
    }
});
server.listen(3010);


console.log("Listening on port 3010");