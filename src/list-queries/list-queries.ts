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

import { DeviceDirectoryApi } from "mbed-cloud-sdk";

class ListQueries {
    private connect = null;
    private config;
    private limit;
    constructor(private node, config, RED) {
        this.config = RED.nodes.getNode(config.config);
        if (this.config) {
            this.connect = new DeviceDirectoryApi({
                apiKey: this.config.credentials.apikey,
                host: this.config.host
            });
        }

        this.limit = config.limit;

        this.node.on("input", this.inputHandler.bind(this));
    }

    private inputHandler(msg) {
        const limit = this.limit || msg.limit;
        const filter = msg.filter;
        this.connect.listQueries( { limit, filter } )
            .then(queries => {
                msg.payload = queries;
                this.node.send(msg);
            }).catch(error => {
                this.node.status({
                    fill: "red",
                    shape: "ring",
                    text: "Error retreiving queries"
                });
                this.node.error(error);
            });
    }
}
export = RED => {
    // tslint:disable-next-line:only-arrow-functions
    RED.nodes.registerType("list-queries", function(config) {
        const node = this;
        RED.nodes.createNode(node, config);
        // tslint:disable-next-line:no-unused-expression
        new ListQueries(node, config, RED);
    });
};
