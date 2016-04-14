module.exports = function(RED) {
	var connector = require("mbed-connector-api")

    function connectorInput(config) {
        RED.nodes.createNode(this,config);
        
        this.log("APIKey = "+this.apikey+" host= "+this.host);
        this.status({fill:"red",shape:"ring",text:"disconnected"});

        this.server = RED.nodes.getNode(config.server);

        // TODO: add connection management here

		this.on('close', function(msg){
			// tidy up any state left behind
        });
    }
    RED.nodes.registerType("mbed-cloud-in",connectorInput);
}