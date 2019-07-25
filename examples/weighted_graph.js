var s = [], t = []; //Arrays para guardar os vértices 'source' e os alvos('targets')
var n = 5; //Número de vértices do grafo
var w = [20, 15, 38, 50, 27]; //Array para definir os pesos de cada nó

let graph; //Declaração do grafo

function setup() { //Função da biblioteca p5.js, executada uma vez no início do programa
	createCanvas(windowWidth, windowHeight); //Função da biblioteca p5.js, cria um canvas na tela
	//Populando aleatóriamente as arrays de 'source' e 'targets' vértices
	for(var i = 0; i < n; i++){
		var a = floor(random(n));
		var b = floor(random(n));
		s.push(a);
		t.push(b);
	}
	graph = new Graph(); //Instanciando o objeto grafo, o parâmetro passado defini o diâmetro do nó
  graph.makeEmptyGraph(n); //Inicializando um grafo vazio com n vértices
	graph.createLinks(s, t); //Cria os links usando arrays
	graph.setWeights(w); //Aplica os pesos da array para o grafo
}

function draw() { //Função da biblioteca p5.js, executada constantemente
  background(255); //Função da biblioteca p5.js, define a cor do background
	graph.show(); //Mostra o grafo gerado
}
