let graph;

var s = [], t = [], w = [], n = 30, u = ['Diego', 'Diego', 'Diego', 'Mika', 'Pedro', 'Victória', 'Pedro', 'Mika', 'Mika', 'Diego'], v = ['Pedro', 'Mika', 'Henrique', 'Pedro', 'Caique', 'Bruno', 'Guilherme', 'Diego', 'Victória', 'Guilherme'];
//var m = ['A', 'B', 'C'], n = [['B', 'C'], ['A', 'B'], ['A', 'B']];

function setup() {
	createCanvas(windowWidth, windowHeight);
  for(var i = 0; i < n; i++){
    var a = floor(random(n));
    var b = floor(random(n));
    var c = random(10, 50);
    s.push(a);
    t.push(b);
    w.push(c);
  }
	graph = new Graph(50);
  // graph.makeEmptyGraph(n);
  // graph.createLinks(s, t);
  // graph.setWeights(w);
	graph.generateGraphFromArray(u, v);
}

function draw() {
  background(0);
	graph.show();
}
