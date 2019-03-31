function setup() {
	
	createCanvas(windowWidth, windowHeight);
	
	scale = 1;
	plotter1 = new Plotter();
  
}

function draw() {
	
	scale(getScale());
	background(255);
	
}

function getScale() {

	return 1;
	
}

function mouseMoved() {
	
	
	
}