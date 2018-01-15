var colorA;
var colorB;

function preload() {
}

function setup(){
  var canvas = createCanvas(windowWidth,windowHeight);
  canvas.parent("rothkoCanvas");
  colorMode(HSB, 360, 100, 100);
  origin = createVector(random(10,windowWidth-10),random(10,windowHeight-10));
  background(0,0,98);
  count = 0;
  rectMode("CENTER");
}

function draw(){
  noStroke();
  var colorA = getColor("A");
  background(colorA);
  var colorB = getColor("B");
  fill(colorB);
  rect(windowWidth/2, windowHeight/2, 500,500);
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
  return hsbColor;
}