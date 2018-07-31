![Status](https://img.shields.io/badge/status-Preview_Release-orange.svg)

# Mbed Cloud plugin for Node-RED

Node-RED nodes to talk to mbed-cloud. This will enable various 3rd party services that already have node-RED workflows to connect to Mbed Cloud.
 
## How to install
For now we don't have an NPM package, so please follow the instructions in [DEVELOPMEND.md](DEVELOPMENT.md).

## How to use
Import the following code:
```
[
    {
        "id": "1a178161.5a8187",
        "type": "tab",
        "label": "Set Get Resource Value",
        "disabled": false,
        "info": ""
    },
    {
        "id": "ff3952e9.d5a43",
        "type": "set-resource-value",
        "z": "1a178161.5a8187",
        "config": "c6bb36d.f301ec8",
        "deviceId": "015e3854194000000000000100100223",
        "resourceURI": "5001/0/1",
        "payload": "node-red-payload-5",
        "x": 321,
        "y": 180,
        "wires": [
            [
                "f3744107.8875d"
            ]
        ]
    },
    {
        "id": "c44e6fb3.1a908",
        "type": "inject",
        "z": "1a178161.5a8187",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "str",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 106.5,
        "y": 89,
        "wires": [
            [
                "ff3952e9.d5a43"
            ]
        ]
    },
    {
        "id": "f3744107.8875d",
        "type": "get-resource-value",
        "z": "1a178161.5a8187",
        "config": "c6bb36d.f301ec8",
        "deviceId": "",
        "resourceURI": "",
        "x": 534.5,
        "y": 271,
        "wires": [
            [
                "df00e36e.1bcb6"
            ]
        ]
    },
    {
        "id": "df00e36e.1bcb6",
        "type": "debug",
        "z": "1a178161.5a8187",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 724.5,
        "y": 349,
        "wires": []
    },
    {
        "id": "c6bb36d.f301ec8",
        "type": "cloud-config",
        "z": "",
        "host": "https://lab-api.mbedcloudintegration.net"
    }
]
```

Further examples can be found in the examples folder.

## Liscense
Apache 2.0
