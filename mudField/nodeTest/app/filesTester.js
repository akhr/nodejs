const path = require('path')
const fs = require('fs')

var pathObj = path.parse(__filename);
console.log(pathObj);

var filesList = fs.readdir('.', function(err, files){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Files List Async: ${files}`);
});

