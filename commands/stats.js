
module.exports = {
    name: "status",
    description: "Send bot ram usage",
    execute(message) {
       
var os = require('os');

var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();

const chalk = require('chalk')

var  getpercentage = 
  ((usedMemory/totalMemory) * 100).toFixed(2) + '%'

message.channel.send("Memory used in GB " + (usedMemory/ Math.pow(1024, 3)).toFixed(2))
message.channel.send("Used memory " + getpercentage);
var os = require('os');
console.log(os.cpus());
console.log(os.totalmem());
console.log(os.freemem())
    }
};
