class Plotter {

	constructor(x, y, w, h, _oW = 0, _oH = 0) {
	
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.oW = _oW;
		this.oH = _oH;
		this.rgb = [120, 120, 255];
		this.hardLimit = 100;
		this.cumulative = false;
		this.data = [];
		this.length = 360; //360 datapoints to show, at 60fps is 6secs.
		this.maxVal = 1;
		this.minVal = -1;
		this.input = 0;
		this.output = 0;
		
	}
	
	setHardLimit(hLim) {
		
		this.hardLimit = hLim;
		
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
	
	click(x, y) {
		
		//Avoid any other check if cursor was not pressed inside 
		if (this.x + this.oW > x || this.y + this.oH > y || this.x + this.w + this.oW < x || this.y + this.h + this.oH < y) {return;}
		
		//Accumulate button
		if (this.x + this.oW + 20 < x && this.y + this.h + this.oH - 50 < y && this.x + this.oW + 20 + 30 > x && this.y + this.h + this.oH - 20 > y) {plotter.accu();}
		
		return;
		
	}
	
	hover(x, y) {
		
		//Avoid any other check if cursor was not hovered inside 
		if (this.x + this.oW > x || this.y + this.oH > y || this.x + this.w + this.oW < x || this.y + this.h + this.oH < y) {return;}
		
		return;
		
	}

	inpt(datapoint) {
		
		this.input = datapoint;
		return this;
		
	}
	
	outData() {
		
		return this.input;
		
	}
	
	rset() {
		
		this.hardLimit = 100;
		this.cumulative = false;
		this.data = [];
		this.length = 360; //360 datapoints to show, at 60fps is 6secs.
		this.maxVal = 1;
		this.minVal = -1;
		this.input = 0;
		this.output = 0;
		
		return this;
		
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
			
			if (point < this.minVal && point > -this.hardLimit) {this.minVal = point}
			if (point > this.maxVal && point < this.hardLimit) {this.maxVal = point}
			
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
		let zeroY = map(0, this.maxVal, this.minVal, this.y + this.oH + 20, this.x + this.oH + this.h - 100, true);
		let dX = (this.w - 120)/(this.data.length - 1);
		noStroke();
		fill(this.rgb[0], this.rgb[1], this.rgb[2]);
		beginShape();
		vertex(this.x + this.oW + 100, zeroY);
		for (let i = 0; i < this.data.length; i++) {
			
			let y1 = map(this.data[i], this.maxVal * 1.1, this.minVal * 1.1, this.y + this.oH + 20, this.y + this.oH + this.h - 100, true);
			if (y1 == NaN) {y1 = 0;} //Avoid division by zero
			vertex(this.x + this.oW + 100 + dX * i, y1);
			
		}
		vertex(this.x + this.oW + 100 + dX * (this.data.length - 1), zeroY);
		endShape(CLOSE);
		
		//Zero line
		stroke(0);
		strokeWeight(2);
		line(this.x + this.oW + 100, zeroY, this.x + this.w + this.oW - 20, zeroY);
		
		//Accumulate button
		noStroke();
		if (this.cumulative) {fill(255, 255, 120);}
		else {fill(120, 255, 120);}
		rect(this.x + this.oW + 20, this.y + this.h + this.oH - 50, 30, 30);
		
		return this;
		
	}
	
}