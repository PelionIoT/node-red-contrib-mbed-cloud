## Installing 

Install node-red by following the instructions [here](https://nodered.org/docs/getting-started/installation).

After cloning the repository, install the npm dependencies:

```bash
> npm install
```

## Building

Simply use the default ```gulp``` task to build the nodes

```bash
> npm run gulp
```

## Using nodes in node-red

The node-red installation creates a .node-red folder in your home directory. Inside this directory, create a new folder called nodes.

```bash
> mkdir nodes
> cd nodes
```

Inside the nodes folder you need to install the mbed-cloud-sdk.

```bash
> npm install --save mbed-cloud-sdk
```

Now move the .js and .html from the project dist folder into the nodes folder. If node-red was running, restart and the mbed-cloud nodes should be in the palette.

More information on how to ass nodes locally can be found [here](https://nodered.org/docs/getting-started/adding-nodes).