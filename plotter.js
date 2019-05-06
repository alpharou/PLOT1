class Plotter {

	constructor(x, y, w, h, _oW = 0, _oH = 0) {
	
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.oW = _oW;
		this.oH = _oH;
		this.rgb = [120, 120, 255];
		this.hardLimit = 1000; //Limit on the Y axis
		this.hardTime = 3600; //60secs * 60 frames in 1 sec * X min //Limit on the X axis
		this.autoScale = true;
		this.cumulative = true;
		this.data = [];
		this.length = 360; //360 datapoints to show, at 60fps is 6secs.
		this.maxVal = 1;
		this.minVal = -1;
		this.workData = 0;
		
	}
	
	setHardLimit(hLim) {
		
		this.hardLimit = hLim;
		
	}
	
	setLength(lngth) {
		
		this.length = lngth;
		
	}
	
	accu() {
		
		this.cumulative ^= true;
		return this;
		
	}
	
	autoScl() {
		
		this.autoScale ^= true;
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
		
		//Avoid any other check if cursor was not pressed inside plotter
		if (this.x + this.oW > x || this.y + this.oH > y || this.x + this.w + this.oW < x || this.y + this.h + this.oH < y) {return;}
		
		//Accumulate button
		if (x > this.x + this.oW + 60 && y > this.y + this.h + this.oH - 105 && x < this.x + this.oW + 105 && y < this.y + this.h + this.oH - 60 && x - this.x - this.oW - 60 > - y + this.y + this.oH + this.h - 60) {plotter.accu();}
		
		//AutoScale button
		if (x > this.x + this.oW + 60 && y > this.y + this.h + this.oH - 105 && x < this.x + this.oW + 105 && y < this.y + this.h + this.oH - 60 && x - this.x - this.oW - 60 <= - y + this.y + this.oH + this.h - 60) {plotter.autoScl();}
		
		return;
		
	}
	
	hover(x, y) {
		
		//Avoid any other check if cursor was not hovered inside 
		if (this.x + this.oW > x || this.y + this.oH > y || this.x + this.w + this.oW < x || this.y + this.h + this.oH < y) {return;}
		
		return;
		
	}

	inpt(datapoint) {
		
		this.workData = datapoint;
		return this;
		
	}
	
	output() {
		
		return this.workData;
		
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
	
	snap() {
		
		this.data.push(this.workData);
		
		if (this.data.length > this.hardTime) {this.data.splice(0, this.data.length - this.hardTime);}
		
	}
	
	updt() {
		
		//TODO: Add a proper responsive scale to the time axis just like the Y axis so that it doesnt snap into place, but slide accordingly.
		
		//Prune data until desirable length is reached
		if (!this.cumulative) {
			
			let deltaTime = abs(this.data.length - this.length);
			
			if (this.data.length >= this.length) {
			
				this.data.splice(0, ceil(deltaTime * 0.1));
			
			}
			
		}
		
		//Calculate the desired Y axis scale
		let desiredMax = 1;
		let desiredMin = -1;
		
		if (this.autoScale) {
			
			for (let point of this.data) {
			
				if (point * 1.1 < desiredMin && point > -this.hardLimit) {desiredMin = point * 1.1;}
				if (point * 1.1 > desiredMax && point < this.hardLimit) {desiredMax = point * 1.1;}
			
			}
			
		} else {
			
			desiredMax = 5;
			desiredMin = -5;
			
		}
		
		//Slowly bring it up or down.
		let deltaMax = desiredMax - this.maxVal;
		let deltaMin = desiredMin - this.minVal;
		let factor = 0.2;
		this.maxVal += deltaMax * factor;	
		this.minVal += deltaMin * factor;
		
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
		rect(this.x + this.oW + 105, this.y + this.oH + 20, this.w - 125, this.h - 125);
		
		//Data line/Points
		let zeroY = map(0, this.maxVal, this.minVal, this.y + this.oH + 20, this.x + this.oH + this.h - 100, true);
		let dX = (this.w - 125)/(/*this.data.length*/ max(this.length, this.data.length) - 1);
		noStroke();
		fill(this.rgb[0], this.rgb[1], this.rgb[2]);
		beginShape();
		vertex(this.x + this.oW + 105, zeroY);
		for (let i = 0; i < this.data.length; i++) {
			
			let y1 = map(this.data[i], this.maxVal * 1.0, this.minVal * 1.0, this.y + this.oH + 20, this.y + this.oH + this.h - 105, true);
			if (y1 == NaN) {y1 = 0;} //Avoid division by zero
			vertex(this.x + this.oW + 105 + dX * i, y1);
			
		}
		vertex(this.x + this.oW + 105 + dX * (this.data.length - 1), zeroY);
		endShape(CLOSE);
		
		//Zero line
		stroke(0);
		strokeWeight(2);
		line(this.x + this.oW + 100, zeroY, this.x + this.w + this.oW - 20, zeroY);
		
		//Accumulate button
		stroke(0);
		if (!this.cumulative) {fill(255, 255, 120);}
		else {fill(120, 255, 120);}
		//rect(this.x + this.oW + 15, this.y + this.h + this.oH - 45, 30, 30);
		beginShape();
		vertex(this.x + this.oW + 59, this.y + this.h + this.oH - 59);
		vertex(this.x + this.oW + 104, this.y + this.oH + this.h - 59);
		vertex(this.x + this.oW + 104, this.y + this.oH + this.h - 104);
		endShape(CLOSE);
		
		//AutoScale button
		stroke(0);
		if (!this.autoScale) {fill(255, 255, 120);}
		else {fill(120, 255, 120);}
		//rect(this.x + this.oW + 60, this.y + this.h + this.oH - 90, 30, 30);
		beginShape();
		vertex(this.x + this.oW + 59, this.y + this.h + this.oH - 59);
		vertex(this.x + this.oW + 104, this.y + this.oH + this.h - 104);
		vertex(this.x + this.oW + 59, this.y + this.oH + this.h - 104);
		endShape(CLOSE);
		
		//TEST BUTTONS
		fill(200,200,200);
		rect(this.x + this.oW + 15, this.y + this.h + this.oH - 90, 30, 30);
		rect(this.x + this.oW + 60, this.y + this.h + this.oH - 45, 30, 30);
		
		//Scale ruler Y
		//TODO: 
		fill(255);
		strokeWeight(2);
		stroke(0);
		rect(this.x + this.oW + 59, this.y + this.oH + 19, 45, this.h - 123);
		
		//Scale ruler Time
		//TODO:
		fill(255);
		strokeWeight(2);
		stroke(0);
		rect(this.x + this.oW + 104, this.y + this.oH + this.h - 104, this.w - 123, 45);
		
		return this;
		
	}
	
}