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
	let t = frameCount/60;
	let dataIn = sin(t) * (sin(0.5*t) - sin(0.33*t));
	plotter.inpt(dataIn).updt().draw(); 
	
	//Snap data in plotter
	//plotter.updt();
	
	//Draw plotter
	//plotter.draw();
	
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

function mouseMoved() {
	
	
	
}

function windowResized() {
	
	resizeCanvas(windowWidth, windowHeight);
	doScale();
	
}