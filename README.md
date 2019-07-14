# Graphs

A library wrote in Javascript with p5.js and node.js that allows for free creation and manipulation of graphs. The graphs are displayed in the browser and anyone connected to the network can see it.

# Run

In order to run this project you need to have Node.js installed in your computer (see `https://nodejs.org/en/`), after the installation run the server.js file and then access `http://localhost:8080` in the web browser. It's also necessary to have the p5.js libraries installed and the "libraries" folder present in your project directory.

# Create Graphs

In your javascript file running a website, create a Graph object:
```javascript
let graph;

function setup(){
  createCanvas(windowWidth, windowHeight);
  graph = new Graph();
}
```
then generate the graph with "generateGraphFromFile()" or "makeEmptyGraph()":

```javascript
let graph;

function setup(){
  createCanvas(windowWidth, windowHeight);
  graph = new Graph();
  graph.generateGraphFromFile(//SOURCE AND TARGET ARRAYS);
}
```

To display the generated graph:

```javascript
function draw(){
  background(0, 0, 0);
	graph.show();
}
```
