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
    var radius = b.size/2;
    var x = b.position.x + radius*Math.cos(theta)*x_orientation;
    var y = b.position.y + radius*Math.sin(theta)*y_orientation;
    fill(255, 0, 0);
    noStroke();
    ellipse(x, y, 6);
  }

  dominanceArea(){
    var delta_d = 1;
    for(var i = 0; i < this.node.length; i++){
      var node_a = this.node[i];
      var dominance = node_a.links.length*5;
      noStroke();
      fill(50, 50, 50);
      if(dominance != 0){
        for(var j = i; j < this.node.length; j++){
          var node_b = this.node[j];
          if(node_b.links.length != 0){
            var delta_x = node_a.position.x-node_b.position.x;
            var delta_y = node_a.position.y-node_b.position.y;
            var dist = Math.sqrt(delta_x*delta_x + delta_y*delta_y);
            if(dist != 0 && dist <= dominance/2+node_b.links.length/2){
              fill(255, 0, 0);
              var x_orientation = 0, y_orientation = 0;
              if(node_a.position.x >= node_b.position.x){
                x_orientation = 1;
              }else{
                x_orientation = -1;
              }
              if(node_a.position.y >= node_b.position.y){
                y_orientation = 1;
              }else{
                y_orientation = -1;
              }
              node_a.position.x += x_orientation*delta_d;
              node_a.position.y += y_orientation*delta_d;
              if(node_a.position.x <= node_a.size/2){
                node_a.position.x = node_a.size/2;
              }else if(node_a.position.x >= windowWidth-node_a.size/2){
                node_a.position.x = windowWidth-node_a.size/2;
              }
              if(node_a.position.y <= node_a.size/2){
                node_a.position.y = node_a.size/2;
              }else if(node_a.position.y >= windowHeight-node_a.size/2){
                node_a.position.y = windowHeight-node_a.size/2;
              }
            }
          }
        }
      }
      //ellipse(node_a.position.x, node_a.position.y, dominance);
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
      x: floor(random(this.size, windowWidth-this.size)),
      y: floor(random(this.size, windowHeight-this.size))
    }
  }

  connect(node){
    this.links.push(node);
  }
}

class Link{
  constructor(sourceNode, targetNode, weight = 0, color = {r:220, g:220, b:220}){
    this.weight = weight;
    this.sourceNode = sourceNode;
    this.targetNode = targetNode;
    this.color = color;
  }
}
