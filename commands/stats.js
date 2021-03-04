
module.exports = {
    name: "status",
    description: "Send bot ram usage",
    execute(message) {
       
var os = require('os');

var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();

var  getpercentage = 
  ((usedMemory/totalMemory) * 100).toFixed(2) + '%'

message.channel.send("Memory used in GB" + (usedMemory/ Math.pow(1024, 3)).toFixed(2))
message.channel.send("Used memory" + getpercentage);
var os = require('os');
message.channel.send(`${os.cpus()}`);
    }
};
