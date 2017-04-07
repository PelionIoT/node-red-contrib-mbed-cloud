module.exports = function(RED) {

    var mbed = require("mbed-cloud-sdk");

    function getAPI(node) {
        if (!node.server) throw new Error('Invalid API specified');

        var api = node.context().get('api') || null;
        if (api) return api;

        api = new mbed.DevicesApi({
            apiKey: node.server.credentials.apikey
        });
        api.startNotifications(function(error, data) {
            if (error) throw error;
        });
        node.context().set('api', api);
        return api;
    }

    function ListDevices(config) {
        RED.nodes.createNode(this,config);

        this.server = RED.nodes.getNode(config.server);

        var node = this;
        var deviceApi = getAPI(node);

        node.on('input', function(msg) {
            deviceApi.listConnectedDevices(function(error, devices) {
                if (error) {
                    node.status({fill: "red", shape: "ring", text: "Error retreiving devices"});
                    node.error(error);
                } else {
                    msg.devices = devices.data;
                    node.send(msg);
                }
            });
        })
    }

    function Subscribe(config) {
        RED.nodes.createNode(this,config);

        this.server = RED.nodes.getNode(config.server);
        this.path = config.path;

        var node = this;
        var deviceApi = getAPI(node);

        node.on('input', function(msg) {
            deviceApi.addResourceSubscription({
                fn: function(payload) {
                    msg.payload = payload;
                    node.send(msg);
                }, 
                id: msg.device, 
                path: node.path}, 
                function(error) {
                    if (error) {
                        node.status({fill: "red", shape: "ring", text: "Error adding subscription"});
                        node.error(error);
                    } else {
                        node.status({fill: "green", shape: "dot", text: "Connected"});
                    }
                }
            );
        });
    }

    function Send(config) {
        RED.nodes.createNode(this,config);
        
        this.server = RED.nodes.getNode(config.server);
        this.method = config.method;
        this.path = config.path;

        var node = this;
        var deviceApi = getAPI(node);

        node.on('input', function(msg) {
            if (node.method == "put") {
                deviceApi.setResourceValue({id: msg.device, path: node.path, value: msg.payload}, function(error) {
                    if (error) {
                        node.status({fill: "red", shape: "ring", text: "Error putting to resource"});
                        node.error(error);
                    }
                });
            } else {
                node.log("Posting instead of putting");
                deviceApi.executeResource({id: msg.device, path: node.path}, function(error) {
                    if (error) {
                        node.status({fill: "red", shape: "ring", text: "Error posting to resource"});
                        node.error(error);
                    }
                });
            }
        })
    }

    function Get(config) {
        RED.nodes.createNode(this,config);
        
        this.server = RED.nodes.getNode(config.server);
        this.path = config.path;

        var node = this;
        var deviceApi = getAPI(node);

        node.on('input', function(msg) {
            deviceApi.getResourceValue({id: msg.device, path: node.path}, function(error, value) {
                if (error) {
                    node.status({fill: "red", shape: "ring", text: "Error getting resource"});
                    node.error(error);
                } else {
                    msg.payload = value;
                    node.send(msg);
                }
            });
        });
    }

    RED.nodes.registerType("list-devices", ListDevices);
    RED.nodes.registerType("subscribe", Subscribe);
    RED.nodes.registerType("send", Send);
    RED.nodes.registerType("get", Get);
}