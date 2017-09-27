/*
* Mbed Cloud JavaScript SDK
* Copyright Arm Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { ConnectApi } from "mbed-cloud-sdk";

class MbedCloud {

    private connect = null;
    private server;

    constructor(private node, config, RED) {

        this.connect = new ConnectApi({
            apiKey: "",
            host: "https://lab-api.mbedcloudintegration.net"
        });

        this.server = RED.nodes.getNode(config.server);
        this.node.on("input", this.inputHandler.bind(this));
    }

    private inputHandler(msg) {
        // tslint:disable-next-line:no-console
        console.log(this);
        this.connect.listConnectedDevices()
        .then(devices => {
            msg.payload = devices;
            this.node.send(msg);
        })
        .catch(error => {
            this.node.status({
                fill: "red",
                shape: "ring",
                text: "Error retreiving devices"
            });
            this.node.error(error);
        });
    }
}
/*
function ListDevices(config) {
    RED.nodes.createNode(this, config);

    const node: any = this;
    const connect = new ConnectApi({
        apiKey: "ak_1MDE1YmM4NTQ4YzJkMDI0MjBhMDE2ZDA2MDAwMDAwMDA015bc8a826dc02420a016d0600000000xpM3Zmxb8LyR0soyilNbArhSAUWrHEqT",
        host: "https://lab-api.mbedcloudintegration.net"
    });

    node.on("input", msg => {
        connect.listConnectedDevices()
        .then(devices => {
            msg.payload = devices;
            node.send(msg);
        })
        .catch(error => {
            node.status({
                fill: "red",
                shape: "ring",
                text: "Error retreiving devices"
            });
            node.error(error);
        });
    });
}
/*
class MbedCloud {
    constructor(private RED) {
        // tslint:disable-next-line:no-console
        console.log(RED.nodes);
        RED.nodes.registerType("list-devices", this.ListDevices);
    }

    public ListDevices(config) {
        // tslint:disable-next-line:no-console
        console.log(this);
        // tslint:disable-next-line:no-console
        console.log(config);
        // tslint:disable-next-line:no-console
        console.log(this.RED.nodes);
        this.RED.nodes.createNode(this, config);

        const node: any = this;
        const connect = new ConnectApi({
            apiKey: "ak_1MDE1YmM4NTQ4YzJkMDI0MjBhMDE2ZDA2MDAwMDAwMDA015bc8a826dc02420a016d0600000000xpM3Zmxb8LyR0soyilNbArhSAUWrHEqT",
            host: "https://lab-api.mbedcloudintegration.net"
        });

        node.on("input", msg => {
            connect.listConnectedDevices()
            .then(devices => {
                msg.payload = devices;
                msg.rob = " sdas";
                node.send(msg);
            })
            .catch(error => {
                node.status({
                    fill: "red",
                    shape: "ring",
                    text: "Error retreiving devices"
                });
                node.error(error);
            });
        });
    }
}

export = RED => {
    // tslint:disable-next-line:no-unused-expression
    new MbedCloud(RED);
};

/*

// tslint:disable-next-line:only-arrow-functions
export = function(RED) {
    function ListDevices(config) {
        RED.nodes.createNode(this, config);

        const node: any = this;
        const connect = new ConnectApi({
            apiKey: "ak_1MDE1YmM4NTQ4YzJkMDI0MjBhMDE2ZDA2MDAwMDAwMDA015bc8a826dc02420a016d0600000000xpM3Zmxb8LyR0soyilNbArhSAUWrHEqT",
            host: "https://lab-api.mbedcloudintegration.net"
        });

        node.on("input", msg => {
            connect.listConnectedDevices()
            .then(devices => {
                msg.payload = devices;
                node.send(msg);
            })
            .catch(error => {
                node.status({
                    fill: "red",
                    shape: "ring",
                    text: "Error retreiving devices"
                });
                node.error(error);
            });
        });
    }

    RED.nodes.registerType("list-devices", ListDevices);
};

*/

export = RED => {
    // tslint:disable-next-line:only-arrow-functions
    RED.nodes.registerType("list-devices", function(config) {
        const node = this;
        // tslint:disable-next-line:no-unused-expression
        new MbedCloud(node, config, RED);
        RED.nodes.createNode(node, config);
    });
};
