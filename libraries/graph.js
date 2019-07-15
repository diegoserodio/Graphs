class Graph{
  constructor(){
    this.source = [];
    this.targets = [];
    this.node = [];
    this.link = [];
    this.label = [];
  }

  generateGraphFromFile(source, targets){
    this.source = source;
    this.targets = targets;
    var nodes_qtn = 0;
    for(var i = 0; i < this.source.length; i++){
      if(!this.existsNode(this.source[i])){
        this.label[this.source[i]]= nodes_qtn;
        this.node[nodes_qtn] = new Node(this.source[i]);
        nodes_qtn++;
      }
      for(var j = 0; j < this.targets[i].length; j++){
        if(!this.existsNode(this.targets[i][j])){
          this.label[this.targets[i][j]]= nodes_qtn;
          this.node[nodes_qtn] = new Node(this.targets[i][j]);
          nodes_qtn++;
        }
      }
    }
    this.createLinks();
  }

  existsNode(label){
    for(var i = 0; i < this.node.length; i++){
      if(label == this.node[i].label){
        return true;
      }
    }
    return false;
  }

  createLinks(){
    for(var i = 0; i < this.source.length; i++){
      for(var j = 0; j < this.targets[i].length; j++){
        this.node[this.label[this.source[i]]].connect(this.node[this.label[this.targets[i][j]]]);
        //------FOR NON-DIRECTED GRAPH UNCOMMENT LINE BELOW------
        //this.node[this.label[this.targets[i][j]]].connect(this.node[this.label[this.source[i]]]);
      }
    }
  }

  show(){
    var links_qtn = 0;
    for(var i = 0; i < this.node.length; i++){
      for(var j = 0; j < this.node[i].links.length; j++){
        this.link[links_qtn] = new Link(this.node[i], this.node[i].links[j]);
        stroke(255, 255, 255);
        strokeWeight(this.link[links_qtn].weight);
        line(this.node[i].position.x, this.node[i].position.y, this.node[i].links[j].position.x, this.node[i].links[j].position.y);
        this.drawArrow(this.node[i], this.node[i].links[j]);
        links_qtn++;
      }
      fill(255, 255, 255);
      stroke(0,0,0);
      ellipse(this.node[i].position.x, this.node[i].position.y, this.node[i].size);
      fill(0, 0, 255);
      text(i, this.node[i].position.x-this.node[i].size/2, this.node[i].position.y-this.node[i].size/2);
    }
    this.dominanceArea();
  }

  drawArrow(a, b){
    var x_orientation = 0, y_orientation = 0;
    if(b.position.x >= a.position.x){
      x_orientation = -1;
    }else{
      x_orientation = 1;
    }
    if(b.position.y >= a.position.y){
      y_orientation = -1;
    }else{
      y_orientation = 1;
    }
    var theta = Math.atan(Math.abs((b.position.y-a.position.y)/(b.position.x-a.position.x)));
    var radius = b.size-8;
    var x = b.position.x + radius*Math.cos(theta)*x_orientation;
    var y = b.position.y + radius*Math.sin(theta)*y_orientation;
    fill(255, 0, 0);
    noStroke();
    ellipse(x, y, 6);
  }

  dominanceArea(){
    var delta_d = 1;
    for(var i = 0; i < this.node.length; i++){
      noStroke();
      fill(50, 50, 50);
      if(this.node[i].links.length != 0){
        for(var j = i; j < this.node.length; j++){
          if(this.node[j].links.length != 0){
            var delta_x = this.node[i].position.x-this.node[j].position.x;
            var delta_y = this.node[i].position.y-this.node[j].position.y;
            var dist = Math.sqrt(delta_x*delta_x + delta_y*delta_y);
            if(dist != 0 && dist <= this.node[i].links.length/2+this.node[j].links.length/2){
              fill(255, 0, 0);
              var x_orientation = 0, y_orientation = 0;
              if(this.node[i].position.x >= this.node[j].position.x){
                x_orientation = 1;
              }else{
                x_orientation = -1;
              }
              if(this.node[i].position.y >= this.node[j].position.y){
                y_orientation = 1;
              }else{
                y_orientation = -1;
              }
              this.node[i].position.x += x_orientation*delta_d;
              this.node[i].position.y += y_orientation*delta_d;
            }
          }
        }
      }
      ellipse(this.node[i].position.x, this.node[i].position.y, this.node[i].links.length);
    }
  }
}

class Node{
  constructor(label = "", weight = 1){
    this.label = label;
    this.weight = weight;
    this.links = [];
    this.size = 20;
    this.position = {
      x: floor(random(this.size, windowWidth-this.size)),
      y: floor(random(this.size, windowHeight-this.size))
    }
  }

  connect(node){
    this.links.push(node);
    // this.size = (this.links.length+1)*10;
    // node.size = (node.links.length+1)*10;
    this.position.x = floor(random(this.size, windowWidth-this.size));
    this.position.y = floor(random(this.size, windowHeight-this.size));
  }
}

class Link{
  constructor(sourceNode, targetNode, weight = 1){
    this.weight = weight;
    this.sourceNode = sourceNode;
    this.targetNode = targetNode;
  }
}
