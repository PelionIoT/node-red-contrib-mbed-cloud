import { ConnectApi } from "mbed-cloud-sdk";

export class ConnectApiManager {

    private constructor() {

    }

    public static Instance(node, config) {
        const api = this.getApi(node);
        // tslint:disable-next-line:no-console
        console.log("found api " + api);
        if (api) {
            // tslint:disable-next-line:no-console
            console.log("return the api");
            return api;
        } else {
            // tslint:disable-next-line:no-console
            console.log(config);
            const newApi = new ConnectApi({
                apiKey: config.credentials.apikey,
                host: config.host
            });
            newApi.startNotifications();
            this.addToContext(newApi, node);
            // tslint:disable-next-line:no-console
            console.log("return new api");
            return newApi;
        }
    }

    private static addToContext = (api, node) => {
        const context = node.context().global;
        context.set("connectApi", api);
        return api;
    }

    private static getApi = node => {
        const context = node.context().global;
        return context.get("connectApi");
    }
}
