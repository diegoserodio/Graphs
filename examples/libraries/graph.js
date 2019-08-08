class Graph{
  constructor(size = 50, directed = 'directed'){
    if(directed == 'directed')this.directed=true;
    else if(directed == 'non-directed')this.directed=false;
    this.size = size;
    this.node = [];
    this.link = [];
    this.label = [];
    this.nodePressed = undefined;
    this.g = createCanvas(windowWidth, windowHeight);
    this.g.mousePressed((e)=>{this.nodePressed=this.getNodeBelow(e.pageX, e.pageY);});
    this.g.mouseMoved((e)=>{this.moveNode(this.nodePressed, e);});
    this.g.mouseReleased(()=>{this.nodePressed=undefined});
  }

  //////////////////////////////////////////////METRICS
  //TODO Shortest Path

  getMatrix(){
    var matrix = [];
    for(var i = 0; i < this.node.length; i++){
      matrix[i] = [];
      for(var j = 0; j < this.node.length; j++){
        var weight = 0;
        for(var k = 0; k < this.link.length; k++){
          var node_a = this.node[i], node_b = this.node[j];
          var link = this.link[k];
          if((link.sourceNode == node_a && link.targetNode == node_b) || (link.sourceNode == node_b && link.targetNode == node_a)){
            weight = link.weight;
          }
        }
        matrix[i][j] = weight;
      }
    }
    return matrix;
  }

  outDegreeCentrality(n = null){
    var centrality = [];
    if(n == null){
      for(var i = 0; i < this.node.length; i++){
        var node = this.node;
        centrality[i] = node[i].links.length/(node.length-1);
      }
      this.colorizeVertices(centrality, 0,0, 0,0, 0,255);
    }else{
      centrality[0] = this.node[n].links.length/(this.node.length-1);
    }
    return centrality;
  }

  inDegreeCentrality(n = null){
    var centrality = [];
    if(n == null){
      for(var i = 0; i < this.node.length; i++){
        var node = this.node;
        centrality[i] = node[i].inLinks.length/this.link.length;
      }
      this.colorizeVertices(centrality, 0,0, 0,0, 0,255);
    }else{
      centrality[0] = this.node[n].inLinks.length/this.link.length;
    }
    return centrality;
  }

  //BUG: NaN when specifing a node
  eigenvectorCentrality(n = null){
    var matrix = this.getMatrix(), eigenvector = [];
    if(n == null){
      for(var i = 0; i < this.node.length; i++){
        eigenvector[i] = 0;
        for(var j = 0; j < this.node[i].links.length; j++){
          eigenvector[i] += this.node[i].links[j].weight*matrix[i][this.label[this.node[i].links[j].label]];
        }
      }
      this.colorizeVertices(eigenvector, 0,255, 0,0, 0,0);
    }else{
      for(var j = 0; j < this.node[n].links.length; j++){
        eigenvector[0] += this.node[n].links[j].weight*matrix[n][this.label[this.node[n].links[j].label]];
      }
    }
    return eigenvector;
  }

  clean(){
    for(var i = 0; i < this.node.length; i++){
      this.node[i].color = {
        r: 0,
        g: 0,
        b: 0
      }
    }
    for(var i = 0; i < this.link.length; i++){
      this.link[i].color = {
        r: 100,
        g: 100,
        b: 100
      }
    }
  }

  //////////////////////////////////////////////SAVING ON FILES

  writeMatrix(){
    var matrix = this.getMatrix();
    let writer = createWriter('matrix.csv');
    for(var i = 0; i < this.node.length; i++){
      writer.write(";");
      writer.write(i);
    }
    writer.write("\n");
    for(var i = 0; i < this.node.length; i++){
      writer.write(i);
      for(var j = 0; j < this.node.length; j++){
        writer.write(";");
        writer.write(matrix[i][j]);
      }
      writer.write("\n");
    }
    writer.close();
  }

  writeVertexWeights(){
    let writer = createWriter('vertexWeights.csv');
    writer.write("Values");
    writer.write('\n');
    for(var i = 0; i < this.node.length; i++){
      writer.write(this.node[i].weight);
      writer.write('\n');
    }
    writer.close();
  }

  writeLinksWeights(){
    let writer = createWriter('linksWeights.csv');
    writer.write("Values");
    writer.write('\n');
    for(var i = 0; i < this.link.length; i++){
      writer.write(this.link[i].weight);
      writer.write('\n');
    }
    writer.close();
  }

  writeToFile(values, name, normalized=false){
    var max = this.min_max(values).max;
    let writer = createWriter(name);
    writer.write("Values");
    writer.write('\n');
    for(var i = 0; i < values.length; i++){
      if(normalized)writer.write(values[i]/max);
      else writer.write(values[i]);
      writer.write('\n');
    }
    writer.close();
  }

  //////////////////////////////////////////////GRAPH GENERATORS/MODIFIERS
  //TODO Generate graph from matrix

  makeEmptyGraph(n){
    for(var i = 0; i < n; i++){
      this.label[i]= i;
      this.node[i] = new Node(i, this.size);
    }
  }

  generateGraphFromArray(source, targets){
    var nodes_qtn = 0;
    if(typeof targets[0] == 'object'){
      for(var i = 0; i < source.length; i++){
        if(!this.existsNode(source[i])){
          this.label[source[i]]= nodes_qtn;
          this.node[nodes_qtn] = new Node(source[i], this.size);
          nodes_qtn++;
        }
        for(var j = 0; j < targets[i].length; j++){
          if(!this.existsNode(targets[i][j])){
            this.label[targets[i][j]]= nodes_qtn;
            this.node[nodes_qtn] = new Node(targets[i][j], this.size);
            nodes_qtn++;
          }
        }
      }
    }else{
      for(var i = 0; i < source.length; i++){
        if(!this.existsNode(source[i])){
          this.label[source[i]]= nodes_qtn;
          this.node[nodes_qtn] = new Node(source[i], this.size);
          nodes_qtn++;
        }
        if(!this.existsNode(targets[i])){
          this.label[targets[i]]= nodes_qtn;
          this.node[nodes_qtn] = new Node(targets[i], this.size);
          nodes_qtn++;
        }
      }
    }
    this.createLinks(source, targets);
  }

  createLinks(source, targets){
    if(typeof targets[0] == 'object'){
      var links_qtn = 0;
      for(var i = 0; i < source.length; i++){
        var node_a = this.node[this.label[source[i]]];
        for(var j = 0; j < targets[i].length; j++){
          var node_b = this.node[this.label[targets[i][j]]];
          node_a.connect(node_b);
          this.link[links_qtn] = new Link(node_a, node_b);
          links_qtn++;
          if(!this.directed){
            node_b.connect(node_a);
            this.link[links_qtn] = new Link(node_b, node_a);
            links_qtn++;
          }
        }
      }
    }else{
      for(var i = 0; i < source.length; i++){
        var node_a = this.node[this.label[source[i]]], node_b = this.node[this.label[targets[i]]];
        node_a.connect(node_b);
        this.link[i] = new Link(node_a, node_b);
        if(!this.directed){
          node_b.connect(node_a);
          this.link[i] = new Link(node_b, node_a);
        }
      }
    }
    this.setLocations();
  }

  setLinksWeights(weights){
    for(var i = 0; i < this.link.length; i++){
      this.link[i].weight = weights[i];
    }
  }

  setVertexWeights(weights){
    for(var i = 0; i < this.node.length; i++){
      if(weights[i]!=0){
        this.node[i].weight = weights[i];
      }
    }
  }

  setVertexSize(size){
    for(var i = 0; i < this.node.length; i++){
      if(size[i]!=0){
        this.node[i].size = size[i];
      }
    }
  }

  setLocations(){
    for(var i = 0; i < this.node.length; i++){
      var node = this.node[i];
      for(var j = 0; j < this.node[i].links.length; j++){
        var theta = random(0, TWO_PI);
        var radius = this.node[i].links.length;
        var x = node.position.x+radius*Math.cos(theta)*20;
        var y = node.position.y-radius*Math.sin(theta)*20;
        this.node[i].links[j].setPosition(x, y);
      }
    }
  }

  colorizeVertices(values, r_min, r_max, g_min, g_max, b_min, b_max){
    var data = this.min_max(values);
    for(var i = 0; i < this.node.length; i++){
      this.node[i].color = {
        r:map(values[i], data.min, data.max, r_min, r_max),
        g:map(values[i], data.min, data.max, g_min, g_max),
        b:map(values[i], data.min, data.max, b_min, b_max)
      }
    }
  }

  //////////////////////////////////////////////MATH FUNCTIONS

  getDistance(a, b){
    var delta_x = a.position.x-b.position.x;
    var delta_y = a.position.y-b.position.y;
    return Math.sqrt(delta_x*delta_x + delta_y*delta_y);
  }

  xyOrientation(a, b){
    var orientation = {
      x: 0,
      y: 0
    }
    if(a.position.x >= b.position.x){
      orientation.x = 1;
    }else{
      orientation.x = -1;
    }
    if(a.position.y >= b.position.y){
      orientation.y = 1;
    }else{
      orientation.y = -1;
    }
    return orientation;
  }

  min_max(values){
    var data={max:0, min:0};
    data.max = values.reduce(function(a, b){return Math.max(a, b);});
    data.min = values.reduce(function(a, b){return Math.min(a, b);});
    return data;
  }

  //////////////////////////////////////////////VALIDATORS

  existsNode(label){
    for(var i = 0; i < this.node.length; i++){
      if(label == this.node[i].label){
        return true;
      }
    }
    return false;
  }

  nodesOverlap(){
    for(var i = 0; i < this.node.length-1; i++){
      for(var j = i+1; j < this.node.length; j++){
        var node_a = this.node[i];
        var node_b = this.node[j];
        var dist = getDistance(node_a, node_b);
        if(dist <= node_a.size/2+node_b.size/2){
          return true;
        }
      }
    }
    return false;
  }

  //////////////////////////////////////////////USER INTERACTION

  getNodeBelow(x, y){
    for(var i = 0; i < this.node.length; i++){
      var radius = this.node[i].size/2;
      var node_x = this.node[i].position.x;
      var node_y = this.node[i].position.y;
      var delta_x = x-node_x;
      var delta_y = y-node_y;
      var dist = Math.sqrt(delta_x*delta_x + delta_y*delta_y);
      if(dist <= radius){
        return this.node[i];
      }
    }
  }

  moveNode(node, position){
    var x = position.pageX, y = position.pageY;
    if(node != undefined){
      node.setPosition(x, y);
    }
  }

  //////////////////////////////////////////////GRAPH VISUALIZATION

  spreadNodes(spreadLevel){
    for(var i = 0; i < this.node.length-1; i++){
      for(var j = i+1; j < this.node.length; j++){
        var node_a = this.node[i];
        var node_b = this.node[j];
        var radius_a = node_a.size/2+(node_a.links.length+1)*spreadLevel;
        var radius_b = node_b.size/2+(node_b.links.length+1)*spreadLevel;
        var dist = this.getDistance(node_a, node_b);
        if(dist <= radius_a+radius_b){
          node_a.move(this.xyOrientation(node_a, node_b));
          node_b.move(this.xyOrientation(node_b, node_a));
        }
      }
    }
  }

  drawArrow(a, b){
    var orientation = this.xyOrientation(a, b);
    var delta_x = b.position.x-a.position.x;
    var delta_y = b.position.y-a.position.y;
    var theta = Math.atan(Math.abs(delta_y/delta_x));
    var radius = b.size/2;
    var x = b.position.x + radius*Math.cos(theta)*orientation.x;
    var y = b.position.y + radius*Math.sin(theta)*orientation.y;
    fill(255, 0, 0);
    noStroke();
    ellipse(x, y, 8);
  }

  show(){
    for(var i = 0; i < this.node.length; i++){
      for(var j = 0; j < this.node[i].links.length; j++){
        var node = this.node[i];
        var link = this.link[j];
        stroke(link.color.r, link.color.g, link.color.b);
        strokeWeight(link.weight+1);
        line(node.position.x, node.position.y, node.links[j].position.x, node.links[j].position.y);
        this.drawArrow(node, node.links[j]);
      }
    }
    for(var i = 0; i < this.node.length; i++){
      var node = this.node[i];
      fill(node.color.r, node.color.g, node.color.b);
      stroke(0,0,0);
      ellipse(node.position.x, node.position.y, node.size);
      stroke(50, 50, 50);
      fill(200, 200, 200);
      textSize(14);
      text(i, node.position.x-5, node.position.y+5);
    }
    if(this.nodesOverlap){
      this.spreadNodes(2);
    }
  }
}

class Node{
  constructor(label = "", size, weight = 0, color = {r:0, g:0, b:0}){
    this.label = label;
    this.weight = weight;
    this.links = [];
    this.inLinks = [];
    this.size = size;
    this.color = color;
    this.position = {
      x: floor(random(this.size+50, windowWidth-this.size-50)),
      y: floor(random(this.size+50, windowHeight-this.size-50))
    }
  }

  connect(node){
    this.links.push(node);
    node.inLinks.push(this);
  }

  normalizePos(){
    if(this.position.x <= this.size/2+5)this.position.x = this.size/2+5;
    else if(this.position.x >= windowWidth-this.size/2-5)this.position.x = windowWidth-this.size/2-5;
    if(this.position.y <= this.size/2+5)this.position.y = this.size/2+5;
    else if(this.position.y >= windowHeight-this.size/2-5)this.position.y = windowHeight-this.size/2-5;
  }

  move(delta){
    this.position.x += delta.x;
    this.position.y += delta.y;
    this.normalizePos();
  }

  setPosition(x, y){
    this.position.x = x;
    this.position.y = y;
    this.normalizePos();
  }
}

class Link{
  constructor(sourceNode, targetNode, weight = 0, color = {r:100, g:100, b:100}){
    this.weight = weight;
    this.sourceNode = sourceNode;
    this.targetNode = targetNode;
    this.color = color;
  }
}
