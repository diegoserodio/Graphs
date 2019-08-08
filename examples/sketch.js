var s = [], t = []; //Arrays para guardar os vértices 'source' e os alvos('targets')
var n = 10;

let graph; //Declaração do grafo

function setup() { //Função da biblioteca p5.js, executada uma vez no início do programa
	createCanvas(windowWidth, windowHeight); //Função da biblioteca p5.js, cria um canvas na tela
	for(var i = 0; i < n; i++){
		s.push(floor(random(n)));
		t.push(floor(random(n)));
	}
	graph = new Graph(); //Instanciando o objeto grafo
  graph.generateGraphFromArray(s, t);
}

function draw() { //Função da biblioteca p5.js, executada constantemente
  background(255); //Função da biblioteca p5.js, define a cor do background
	graph.show(); //Mostra o grafo gerado
}
