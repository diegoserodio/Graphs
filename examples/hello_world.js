var s = [1, 2, 4, 2, 3], t = [4, 1, 2, 3, 0]; //Arrays para guardar os vértices 'source' e os alvos('targets')
var n = 5; //Número de vértices do grafo

let graph; //Declaração do grafo

function setup() { //Função da biblioteca p5.js, executada uma vez no início do programa
	createCanvas(windowWidth, windowHeight); //Função da biblioteca p5.js, cria um canvas na tela
	graph = new Graph(); //Instanciando o objeto grafo
  graph.makeEmptyGraph(n); //Inicializando um grafo vazio com n vértices
	graph.createLinks(s, t); //Cria os links usando arrays
}

function draw() { //Função da biblioteca p5.js, executada constantemente
  background(255); //Função da biblioteca p5.js, define a cor do background
	graph.show(); //Mostra o grafo gerado
}
