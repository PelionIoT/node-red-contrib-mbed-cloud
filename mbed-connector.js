module.exports = function(RED) {
	//var connector = require("mbed-connector-api")

    function Connector(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
    }
    RED.nodes.registerType("mbed-cloud",Connector);
}