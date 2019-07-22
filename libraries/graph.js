class Graph{
  constructor(){
    this.node = [];
    this.link = [];
    this.label = [];
  }

  generateGraphFromArray(source, targets){
    var nodes_qtn = 0;
    for(var i = 0; i < source.length; i++){
      if(!this.existsNode(source[i])){
        this.label[source[i]]= nodes_qtn;
        this.node[nodes_qtn] = new Node(source[i]);
        nodes_qtn++;
      }
      for(var j = 0; j < targets[i].length; j++){
        if(!this.existsNode(targets[i][j])){
          this.label[targets[i][j]]= nodes_qtn;
          this.node[nodes_qtn] = new Node(targets[i][j]);
          nodes_qtn++;
        }
      }
    }
    this.createLinks(source, targets);
    this.setLocations();
  }

  existsNode(label){
    for(var i = 0; i < this.node.length; i++){
      if(label == this.node[i].label){
        return true;
      }
    }
    return false;
  }

  createLinks(source, targets){
    var links_qtn = 0;
    for(var i = 0; i < source.length; i++){
      for(var j = 0; j < targets[i].length; j++){
        this.node[this.label[source[i]]].connect(this.node[this.label[targets[i][j]]]);
        //------FOR NON-DIRECTED GRAPH UNCOMMENT LINE BELOW------
        //this.node[this.label[targets[i][j]]].connect(this.node[this.label[source[i]]]);
      }
    }
    for(var i = 0; i < this.node.length; i++){
      for(var j = 0; j < this.node[i].links.length; j++){
        var node = this.node[i];
        this.link[links_qtn] = new Link(node, node.links[j]);
        links_qtn++;
      }
    }
  }

  setWeights(weights){
    for(var i = 0; i < this.node.length; i++){
      if(weights[i]!=0){
        this.node[i].weight = weights[i];
        this.node[i].size = (weights[i]*15)*(weights[i]*15);
      }else{
        this.node[i].weight = 0;
        this.node[i].size = 20;
        this.node[i].color = {
          r: 100,
          g: 100,
          b: 100
        };
      }
    }
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
      fill(0, 255, 0);
      text(i, node.position.x-node.size/2, node.position.y-node.size/2);
    }
    if(this.nodesOverlap){
      this.spreadNodes();
    }
  }

  nodesOverlap(){
    for(var i = 0; i < this.node.length; i++){
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

  drawArrow(a, b){
    var orientation = this.xyOrientation(a, b);
    var theta = Math.atan(Math.abs((b.position.y-a.position.y)/(b.position.x-a.position.x)));
    var radius = b.size/2;
    var x = b.position.x + radius*Math.cos(theta)*orientation.x;
    var y = b.position.y + radius*Math.sin(theta)*orientation.y;
    fill(255, 0, 0);
    noStroke();
    ellipse(x, y, 6);
  }

  setLocations(){
    for(var i = 0; i < this.node.length; i++){
      var node = this.node[i];
      for(var j = 0; j < this.node[i].links.length; j++){
        var theta = random(0, TWO_PI);
        var radius = this.node[i].links.length;
        this.node[i].links[j].setPosition(node.position.x+radius*Math.cos(theta), node.position.y-radius*Math.sin(theta));
      }
    }
  }

  spreadNodes(){
    for(var i = 0; i < this.node.length; i++){
      for(var j = i+1; j < this.node.length; j++){
        var node_a = this.node[i];
        var node_b = this.node[j];
        var dist = this.getDistance(node_a, node_b);
        if(dist != 0 && dist <= (node_a.size/2+(node_a.links.length+1)*2)+(node_b.size/2+(node_b.links.length+1)*2)){
          node_a.move(this.xyOrientation(node_a, node_b));
        }
      }
    }
  }
}

class Node{
  constructor(label = "", weight = 0, color = {r:255, g:255, b:0}){
    this.label = label;
    this.weight = weight;
    this.links = [];
    this.size = 0;
    this.color = color;
    this.position = {
      // x: floor(random(this.size+50, windowWidth-this.size-50)),
      // y: floor(random(this.size+50, windowHeight-this.size-50))
      x: floor(random(windowWidth/2-0, windowWidth/2+0)),
      y: floor(random(windowHeight/2-0, windowHeight/2+0))
    }
  }

  connect(node){
    this.links.push(node);
  }

  move(delta){
    this.position.x += delta.x;
    this.position.y += delta.y;
    if(this.position.x <= this.size/2+10){
      this.position.x = this.size/2+10;
    }else if(this.position.x >= windowWidth-this.size/2-10){
      this.position.x = windowWidth-this.size/2-10;
    }
    if(this.position.y <= this.size/2+10){
      this.position.y = this.size/2+10;
    }else if(this.position.y >= windowHeight-this.size/2-10){
      this.position.y = windowHeight-this.size/2-10;
    }
  }

  setPosition(x, y){
    this.position.x = x;
    this.position.y = y;
    if(this.position.x <= this.size/2+10){
      this.position.x = this.size/2+10;
    }else if(this.position.x >= windowWidth-this.size/2-10){
      this.position.x = windowWidth-this.size/2-10;
    }
    if(this.position.y <= this.size/2+10){
      this.position.y = this.size/2+10;
    }else if(this.position.y >= windowHeight-this.size/2-10){
      this.position.y = windowHeight-this.size/2-10;
    }
  }
}

class Link{
  constructor(sourceNode, targetNode, weight = 0, color = {r:255, g:255, b:255}){
    this.weight = weight;
    this.sourceNode = sourceNode;
    this.targetNode = targetNode;
    this.color = color;
  }
}
