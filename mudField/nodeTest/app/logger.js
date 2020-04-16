const EventEmitter = require('events');

class Logger extends EventEmitter{
    constructor(initialMsg){
        super();
        console.log("Constructor - %s", initialMsg);
    }
    log(logMessage){
        console.log("Emitting event : +s", logMessage);
        this.emit("onMessage", logMessage);  
    }
}

module.exports = Logger;