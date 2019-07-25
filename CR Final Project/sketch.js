var source = [], targets = [], gini = [];

function preload() {
  var csv = loadStrings("data/dados_teste_4.csv", handleFile);
  var gini_indice = loadStrings("data/teste_gini_2.csv", handleGiniFile);
}

function handleFile(file){
	for(var i = 0; i < file.length; i++){
		source[i] = file[i].split(',')[0].replace(/\"/g, "").trim();
		targets[i] = [];
		for(var j = 1; j < file[i].split(',').length; j++){
			targets[i][j-1] = file[i].split(',')[j].replace(/\"/g, "").trim();
		}
	}
}

function handleGiniFile(file){
  for(var i = 0; i < file.length; i++){
		gini[i] = parseFloat(file[i].replace(/\"/g, "").replace(",", ".").trim())*100;
	}
}

let graph;

function setup() {
	createCanvas(windowWidth, windowHeight);
	graph = new Graph(20);
	graph.generateGraphFromArray(source, targets);
	graph.setWeights(gini);
}

function draw() {
  background(255);
	graph.show();
}
