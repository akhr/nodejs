const GetGoodReadsJson = require('./goodReads/getGoodReadsJson');

function test() {
    console.log("In test.js");
    GetGoodReadsJson.getBook("0441172717")
    .then((json) => {
        // console.log(`JSON resp : ${JSON.stringify(json)}`);
    }).catch((e) => {
        console.log("Error : "+e);
    });
    
}

test();