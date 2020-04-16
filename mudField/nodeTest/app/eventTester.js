const Logger = require('./Logger');
const util = require('util')

var logger = new Logger("super machi");
// console.log("**** - "+util.inspect(logger, true, null, true));
// console.log('**** - %j', logger);

logger.on('onMessage', function(data){
    console.log("Event received by listener : %j", data);
});

logger.log({name: "testEvent", id: 1234});

