let graph;

function setup() {
	createCanvas(windowWidth, windowHeight);
	graph = new Graph(50);
  graph.makeEmptyGraph(n);
  graph.createLinks(s, t);
  //graph.setWeights(w);
	//graph.generateGraphFromArray(u, v);
}

function draw() {
  background(0);
	graph.show();
}
