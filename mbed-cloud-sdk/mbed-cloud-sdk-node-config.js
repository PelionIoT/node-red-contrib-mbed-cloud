module.exports = function(RED) {

    var mbed = require("mbed-cloud-sdk");

    function CloudSDKConfig(n) {
        RED.nodes.createNode(this,n);

        this.name = n.name;
        this.apikey = n.apikey;

        this.on('close', function(msg) {

        });
    }

    RED.nodes.registerType("mbed-cloud-sdk-config", CloudSDKConfig, {
        credentials: {
            apikey: {type: "text"}
        }
    });

}