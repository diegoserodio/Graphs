# Graphs

A library wrote in Javascript with p5.js and node.js that allows for free creation and manipulation of graphs. The graphs are displayed in the browser and anyone connected to the network can see it.

# Features

- Generate random or empty graphs
- Generate graphs from: arrays or matrices
- Automatic graph arrangement on the screen
- Move nodes with a mouse click

# Using the library in your javascript project

Copy the library file (graph.js) to your library's folder of your project. It's also necessary to have the p5.js libraries installed in the library's folder. The files index.html and sketch.js required to work with p5.js are also present in the project. The main Javascript file in which the Graph object will be used, need to be called in the html file (```html<script src="sketch.js"></script>```)

# Running the examples

In order to run the examples in the examples folder of the repo, you need to have Node.js installed in your computer (see `https://nodejs.org/en/`), after the installation run the server.js file present in the examples folder and then access `http://localhost:8080` in the web browser. It's also recommended to install supervisor.js and run the server with the supervisor tool. Supervisor will listen for any changes in the files and restart the server automatically, then just restart the web page to see the changes.
There're many example files in the examples folder(hello_world.js; random_graph.js,...), in order to choose which script to use, change the script tag in the html file.

# Create Graphs

In your javascript file running a website, create a Graph object:
```javascript
let graph;

function setup(){
  createCanvas(windowWidth, windowHeight);
  graph = new Graph();
}
```

The Graph object allows you to define it's default node's size and if the graph is directed or not. If you leave these empty, it's going to be used as default a directed graph with a node size of 50.
To initiate a non-directed graph with a node size of 70 for example:
```javascript
graph = new Graph(70, false);
```
then generate the graph with "generateGraphFromArray()" or "makeEmptyGraph()":

```javascript
let graph;

function setup(){
  createCanvas(windowWidth, windowHeight);
  graph = new Graph();
  graph.generateGraphFromArray(); //SOURCE AND TARGET ARRAYS AS PARAMETERS
}
```
or

```javascript
let graph;

function setup(){
  createCanvas(windowWidth, windowHeight);
  graph = new Graph();
  graph.makeEmptyGraph(); //NUMBER OF NODES AS PARAMETERS
  graph.createLinks(); //SOURCE AND TARGET ARRAYS AS PARAMETERS
}
```

To display the generated graph:

```javascript
function draw(){
  background(255);
	graph.show();
}
```

# UPCOMING

- Shortest path (Dijkstra/A*)
- Generating graph from adjacency matrix
