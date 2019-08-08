let graph; //Declares graph object
var source = [], targets = [], gini = [], idh_band=[]; //Initialize arrays

//Loads the .csv data files and calls a function to handle it
function preload() {
  var csv = loadStrings("data/dados_4.csv", handleDataFile);
  var gini_indice = loadStrings("data/gini_2.csv", handleGiniFile);
  var idh_faixa = loadStrings("data/faixas_idh.csv", handleIDHBandFile);
}

function handleDataFile(file){
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

function handleIDHBandFile(file){
  for(var i = 0; i < file.length; i++){
		idh_band[i] = parseFloat(file[i].replace(/\"/g, "").replace(",", ".").trim());
	}
}

//Setup function from p5.js library
function setup() {
	createCanvas(windowWidth, windowHeight); //p5.js necessary function
	graph = new Graph(); //Creates graph object
	graph.generateGraphFromArray(source, targets); //Make the graph from the arrays obtained
	graph.setVertexSize(gini); //Set the vertices' sizes to the gini values
  graph.setVertexWeights(idh_band); //Set the vertices' weights to the IDH band values
  graph.setLinksWeights(getLinksWeights()); //Set the links' weights
}

//Setup function from p5.js librarynode
function draw() {
  background(255);
	graph.show();
}

//Function to download a file with count of neighbors' weights of all nodes
function writeNeighborsToFile(){
  let writer = createWriter('neighbors.csv');
  writer.write(["Nodes", "Weight 1", "Weight 2", "Weight 3", "Weight 4"]);
  writer.write("\n");
  for(var i = 0; i < graph.node.length; i++){
    var weight_4 = 0, weight_3 = 0, weight_2 = 0, weight_1 = 0;
    for(var j = 0; j < graph.node[i].inLinks.length; j++){
      switch (graph.node[i].inLinks[j].weight) {
        case 1:
          weight_1++;
          break;
        case 2:
          weight_2++;
          break;
        case 3:
          weight_3++;
          break;
        default:
          weight_4++;
          break;
      }
    }
    writer.write([graph.node[i].label, weight_1, weight_2, weight_3, weight_4]);
    writer.write("\n");
  }
  writer.close();
}

//Calculate links weights
function getLinksWeights(){
  var weights = []
  for(var i = 0; i < graph.link.length; i++){
    var link = graph.link[i];
    var diff = Math.abs(link.sourceNode.weight-link.targetNode.weight);
    weights.push(diff);
  }
  return weights;
}

//Colorize links
function colorLinks(){
  for(var i = 0; i < graph.link.length; i++){
    var link = graph.link[i];
    switch (link.weight){
      case 3:
        link.color = {r: 255, g: 0, b: 0}
        break;
      case 2:
        link.color = {r: 0, g: 255, b: 0}
        break;
      case 1:
        link.color = {r: 255, g: 255, b: 0}
        break;
      default:
        link.color = {r: 0, g: 0, b: 255}
        break;
    }
  }
}
