const goodReadsJSONResponse = require('goodreads-json-api');
const https = require('https');
const API_KEY = require('./api.key'); 

function getBook(isbn) {
    console.log("Starting to getBook ... ");
    var promise = new Promise((resolve, reject) => {
        https.get(`https://www.goodreads.com/book/isbn/${isbn}?key=${API_KEY.key}`, (res) => {
            const options = {
                xml: {
                    normalizeWhitespace: true
                }
            }
            const statusCode = res.statusCode;
            const contentType = res.headers['content-type'];
            
            let error;
            if (statusCode !== 200) {
                error = new Error(`Request Failed.\n Status Code: ${statusCode}`);
            }
    
            if (error) {
                console.log(error.message);
                // consume response data to free up memory
                res.resume();
                return;
            }
    
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => rawData += chunk);
            res.on('end', () => {
                try {
                    // console.log("Raw Response "+rawData);
                    const resp = goodReadsJSONResponse.convertToJson(rawData);
                    console.log(resp)
                    resolve(resp);
                } catch (e) {
                    console.log(e.message);
                    reject(e);
                }
            });
        }).on('error', (e) => {
            console.log(`Got error: ${e.message}`);
            reject(e);
        });
    });

    return promise;
}

module.exports.getBook = getBook;
