module.exports = function(RED) {
	var connector = require("mbed-connector-api")

    function Connector(n) {
        RED.nodes.createNode(this,n);
        this.apikey = n.apikey;
        this.host = n.host;
        this.port = n.port;
        this.apiversion = n.apiversion;
        this.log.debug("HI MOM!!!");
        this.log("APIKey = "+this.apikey+" host= "+this.host);
        this.status({fill:"red",shape:"ring",text:"disconnected"});

        // TODO: add connection management here

		this.on('close', function(msg){
			// tidy up any state left behind
        });
    }
    RED.nodes.registerType("mbed-cloud",Connector,{
		credentials:{
			apikey:{type:"text"}
		}
    });
}