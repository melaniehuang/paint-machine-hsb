var colorA;
var colorB;
var alpha = 10;
var paintBreak = 0;
var paintGap = 50;
var rothkoCount = 0;
var horizontal = 0;
var w = 500;
var h = 120;


function preload() {
}

function setup(){
  var canvas = createCanvas(windowWidth,windowHeight);
  canvas.parent("rothkoCanvas");
  colorMode(HSB, 360, 100, 100, 100);
  origin = createVector(random(10,windowWidth-10),random(10,windowHeight-10));
  background(0,0,98,0);
  count = 0;
  rectMode(CORNERS);
}

function draw(){
  noStroke();
  var colorA = getColor("A");
  var colorB = getColor("B");

  paintBreak++;

  if (paintBreak == paintGap){
    createPaint(1, colorA, colorB, 300,400);
    paintBreak = 0;
  }
  rothko(colorA, colorB);
}

function getColor(s){
  var hsbColor = [];

  for (var i = 0; i < 3; i++){
    var slider = document.getElementById("hsb" + s + i);
    var output = document.getElementById("demo" + s + i);
    output.innerHTML = slider.value;
  
    slider.oninput = function() {
      output.innerHTML = this.value;
    }

    var selectValue = output.innerHTML;
    hsbColor[i] = selectValue;
  }
  hsbColor[3] = alpha;
  return hsbColor;
}

function createPaint(num, c1, c2, paintWidth, paintLength){
  stroke(c1);
  var x1, y1;
  var x2, y2;
  var x3, y3;
  var x4, y4;

  var interB;
  var from = c1;
  var to = c2;
  var xoff = 0;
  num = 2;

  for (var a = 0; a < num; a++){
    x1 = random(-200,windowWidth/2+200);
    y1 = random(-200, windowHeight+200);
   
    x2 = x1 + 60;
    y2 = y1 + random(-30,30);
   
    x3 = x1 + random(300,windowWidth); //length
    y3 = y1 + random(-200,300); //direction
   
    x4 = x3 - 60;
    y4 = y3 + random(-30,20);

    var rand = random(paintWidth,paintWidth*2);
   
    for(var i = 0; i <= rand; i++) {
       xoff = xoff + 1;
       var n = noise(xoff);   
       noFill();
       strokeWeight(1);
       var interB = lerpColor(from, to, n);  
       bezier(x1, y1+i, x2, y2+i, x3, y3+i, x4, y4+i);
       stroke(interB, 10);  
    }
   }
}

function rothko(c3, c4){
  noStroke();
  rectMode(CORNERS);
  c3[3] = int(random(1,2));
  c4[3] = int(random(2));

  rothkoCount++;
  var wr = random(-1,1);
  var hr = random(-1,1);
  
  fill(c3);
 
  if (rothkoCount%100 == 0){
    origin = createVector(random(10,windowWidth-10),random(10,windowHeight-10));
    rothkoCount = 0;
    horizontal++;
  }
 
  if (horizontal == 5){
    fill(c3);
    rect(origin.x, origin.y,origin.x + 300,windowHeight);
    horizontal = 0;
  }

  rect(origin.x,origin.y,origin.x - w*wr,origin.y - h*hr);
  fill(c4);
  rect(origin.x,origin.y,origin.x - w*wr,origin.y - h*hr);
}