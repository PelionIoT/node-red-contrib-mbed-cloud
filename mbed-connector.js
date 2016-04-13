module.exports = function(RED) {
	var connector = require("mbed-connector-api")

    function Connector(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            // handle input
            this.log(msg);
        });

        this.on('output', function(msg){
			// Handle Output
			this.log(msg)
        });

		this.on('close', function(msg){
			// tidy up any state left behind
        });
    }
    RED.nodes.registerType("mbed-cloud",Connector);
}