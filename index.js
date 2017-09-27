var test = require("./dist/test.js");
var test2 = require("./dist/test2.js");

var RED = {
    nodes: {
        createNode: function(ctx, config) {

        },
        getNode: function(node) {

        },
        registerType: function(name, fn) {
            fn.call(blob);
        }
    }
};

var blob = "hi";

test(RED);
test2(RED);

// RED.nodes.createNode(this, config);
// this.server = RED.nodes.getNode(config.server);
// RED.nodes.registerType("list-devices", ListDevices);