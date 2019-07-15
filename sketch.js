var source = [], targets = [];

function preload() {
  var csv = loadStrings("data/dados_teste_3.csv", handleFile);
}

function handleFile(file){
	//var companies = [];
	for(var i = 0; i < file.length; i++){
		// companies[i] = file[i].split(',')[0];
		source[i] = file[i].split(',')[0].replace(/\"/g, "").replace(" ","").trim();
		targets[i] = [];
		for(var j = 1; j < file[i].split(',').length; j++){
			targets[i][j-1] = file[i].split(',')[j].replace(/\"/g, "").replace(" ","").trim();
		}
	}
}

let graph;

function setup() {
	createCanvas(windowWidth, windowHeight);
	graph = new Graph();
	graph.generateGraphFromFile(source, targets);
}

function draw() {
  background(0, 0, 0);
	graph.show();
}
