var s = ['Ana', 'Ana', 'Carlos', 'Eduardo', 'Carlos', 'Fernando', 'Diego']; //Array com pessoas 'source'
var t = ['Bernardo', 'Rafael', 'Eduardo', 'Fernando', 'Diego', 'Diego', 'Eduardo']; //Array com pessoas 'target'

let graph; //Declaração do grafo

function setup() { //Função da biblioteca p5.js, executada uma vez no início do programa
	createCanvas(windowWidth, windowHeight); //Função da biblioteca p5.js, cria um canvas na tela
	graph = new Graph(); //Instanciando o objeto grafo
	graph.generateGraphFromArray(s, t); //Gera o grafo determinado pelas arrays
}

function draw() { //Função da biblioteca p5.js, executada constantemente
  background(255); //Função da biblioteca p5.js, define a cor do background
	graph.show(); //Mostra o grafo gerado
}
