function setup() {
	
	createCanvas(windowWidth, windowHeight);
	
	//flag Variables
	stretchScale = false;
	doOffset = true;
	
	//Global variables
	dW = 1600;
	dH = 900;
	oW = 0; //widthOffset
	oH = 0; //heightOffset
	sW = 1; //widthScale
	sH = 1; //heightScale
	
	feedback = 0; //Feedback used in closed loops.
	
	plotter = new Plotter(100, 100, dW - 200, dH - 200);
	doScale();
  
}

function draw() {
	
	//Apply scale
	if (stretchScale) {
		scale(sW, sH);
	} else {
		scale(min(sW,sH));
	}
	
	background(255);
	
	//Generator function >> plotter INPuT >> plotter UPDaTe >> plotter DRAW
	let x = frameCount/60;
	
	let dataIn = abs(x % 4 - 2) + sin(x) - sin(2*x) * cos(x/7);
	//let dataIn = sin(x) - sin(2*x) * cos(x/7); //EXAMPLE 1
	//let dataIn = 10; 
	//let dataIn = sin(x);
	plotter.inpt(dataIn);
	
	//Snap data in plotter
	if (true /*x < 10*/) {plotter.snap()};
	
	//Update plotter
	plotter.updt();
	
	//Draw plotter - MUST ALWAYS HAPPEN
	plotter.draw();
	
}

function doScale() {

	//True workspace size is dW x dH px
	sW = windowWidth/dW;
	//console.log("sW = " + sW);
	sH = windowHeight/dH;
	//console.log("sH = " + sH);
	
	//Calculate offsets to center the piece on the canvas
	if (!stretchScale && doOffset) {
		oW = (windowWidth - dW*min(sW,sH)) / min(sW,sH); //WTF OFFSET??
		oW /= 2;
		//console.log("oW = " + oW);
		oH = (windowHeight - dH*min(sW,sH)) / min(sW,sH); //EXCUSE WTF??
		oH /= 2;
		//console.log("oH = " + oH);
	}
	
	plotter.setOffset(oW, oH);
	
	return;

}

function mousePressed() {
	
	if (this.stretchScale) {plotter.click(mouseX/sW, mouseY/sH);}
	else {plotter.click(mouseX/min(sW,sH), mouseY/min(sW,sH));}
	return;
	
}

function mouseMoved() {
	
	if (this.stretchScale) {plotter.hover(mouseX/sW, mouseY/sH);}
	else {plotter.hover(mouseX/min(sW,sH), mouseY/min(sW,sH));}
	return;
	
}

function windowResized() {
	
	resizeCanvas(windowWidth, windowHeight);
	doScale();
	
}