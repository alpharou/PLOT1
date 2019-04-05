function setup() {
	
	createCanvas(windowWidth, windowHeight);
	
	//flag Variables
	stretchScale = false;
	doOffset = true;
	
	//Global variables
	wO = 0; //widthOffset
	hO = 0; //heightOffset
	wS = 1; //widthScale
	hS = 1; //heightScale
	
	doScale();
	plotter1 = new Plotter();
  
}

function draw() {
	
	//Scale
	if (stretchScale) {
		scale(wS, hS);
	} else {
		scale(min(wS,hS));
	}
	
	background(255);
	noFill();
	strokeWeight(2);
	rect(0 + wO, 0 + hO, 1920, 1080);
	line(0 + wO, 0 + hO, 1920 + wO, 1080 + hO);
	rect(40 + wO ,40 + hO, 1840, 1000);
	
}

function doScale() {

	//True workspace size is 1920x1080px
	wS = windowWidth/1920;
	console.log("wS = " + wS);
	hS = windowHeight/1080;
	console.log("hS = " + hS);
	
	//Calculate offsets to center the piece on the canvas
	if (!stretchScale && doOffset) {
		wO = (windowWidth - 1920*min(wS,hS)) / min(wS,hS); //WTF OFFSET??
		wO /= 2;
		console.log("wO = " + wO);
		hO = (windowHeight - 1080*min(wS,hS)) / min(wS,hS); //EXCUSE WTF??
		hO /= 2;
		console.log("hO = " + hO);
	}
	
	return [wS, hS];

}

function mouseMoved() {
	
	
	
}

function windowResized() {
	
	resizeCanvas(windowWidth, windowHeight);
	doScale();
	
}