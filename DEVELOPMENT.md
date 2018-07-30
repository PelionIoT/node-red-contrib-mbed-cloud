## Manual Install

**Note** Manual install is a workaround for the Preview Release. In the future it will be installable using `npm install node-red-contrib-mbed-cloud`.

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

The node-red installation creates a .node-red folder in your home directory. Inside this directory, create a new folder called `nodes`.

**NOTE** you will need both a `node_modules` and a `node` folder, the `node_modules` folder should already exist

```bash
> cd ~/.node-red
> mkdir nodes
> cd nodes
```

Next we need to copy everything from `node-red-contrib-mbed-cloud/node_modules/*` to `~/.node-red/node_modules/*`
Also copy everything from `node-red-contrib-mbed-cloud/dist/*` to `~/.node-red/node/*`



More information on how to ass nodes locally can be found [here](https://nodered.org/docs/getting-started/adding-nodes).
