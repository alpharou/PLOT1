class Plotter {

	constructor(x, y, w, h, _oW = 0, _oH = 0) {
	
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.oW = _oW;
		this.oH = _oH;
		this.rgb = [120, 120, 255];
		this.cumulative = false;
		this.data = [];
		this.length = 360; //360 datapoints to show, at 60fps is 6secs.
		this.maxVal = 1;
		this.minVal = -1;
		this.input = 0;
		this.output = 0;
		
	}
	
	accu() {
		
		this.cumulative ^= true;
		return this;
		
	}
	
	setRGB(r, g, b) {
		
		this.rgb = [r, g, b];
		return this; //Testing chainable methods.
		
	}
	
	setOffset(_oW, _oH) {
		
		this.oW = oW;
		this.oH = oH;
		return this;
		
	}

	inpt(datapoint) {
		
		this.input = datapoint;
		return this;
		
	}
	
	outData() {
		
		return this.input;
		
	}
	
	updt() {
		
		this.data.push(this.input);
		
		//Slowly prune data until desirable length is reached
		//This causes a sliding effect to the left
		if (!this.cumulative) {
			
			if (this.data.length >= this.length) {
			
				this.data.splice(0, 1);
			
			}
			
			if (this.data.length >= this.length) {
			
				this.data.splice(0, 1);
			
			}
			
		}
		
		this.minVal = -1;
		this.maxVal = 1;
		
		for (let point of this.data) {
			
			if (point < this.minVal) {this.minVal = point}
			if (point > this.maxVal) {this.maxVal = point}
			
		}
		
		return this;
		
	}
	
	draw() {
		
		//Filler
		noStroke();
		fill(10);
		rect(this.x + this.oW, this.y + this.oH, this.w, this.h);
		
		//Display region
		noStroke();
		fill(255);
		rect(this.x + this.oW + 100, this.y + this.oH + 20, this.w - 120, this.h - 120);
		
		//Data line/Points
		let zeroY = map(0, this.maxVal, this.minVal, this.y + this.oH + 20, this.x + this.oH + this.h - 100);
		let dX = (this.w - 120)/(this.data.length - 1);
		noStroke();
		fill(this.rgb[0], this.rgb[1], this.rgb[2]);
		beginShape();
		vertex(this.x + this.oW + 100, zeroY);
		for (let i = 0; i < this.data.length; i++) {
			
			let y1 = map(this.data[i], this.maxVal * 1.1, this.minVal * 1.1, this.y + this.oH + 20, this.x + this.oH + this.h - 100);
			vertex(this.x + this.oW + 100 + dX * i, y1);
			
		}
		vertex(this.x + this.oW + 100 + dX * (this.data.length - 1), zeroY);
		endShape(CLOSE);
		
		//Zero line
		stroke(0);
		strokeWeight(2);
		line(this.x + this.oW + 100, zeroY, this.x + this.w + this.oW - 20, zeroY);
		
		return this;
		
	}
	
}