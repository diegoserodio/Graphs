var source = [], targets = [];

function preload() {
  var csv = loadStrings("data/dados_teste.csv", handleFile);
}

function handleFile(file){
	var companies = [];
	for(var i = 1; i < file.length; i++){
		companies[i-1] = file[i].split(',')[0];
		source[i-1] = file[i].split(',')[1];
		targets[i-1] = [];
		for(var j = 2; j < file[i].split(',').length; j++){
			targets[i-1][j-2] = file[i].split(',')[j].replace(/\"/g, "").replace(" ","");
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
