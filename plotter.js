class Plotter {

	constructor(x, y, w, h) {
	
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.data = [];
		this.length = 60; //60 datapoints in total, at 60fps is 1sec.
		
	}
	
	setLength(length) {
	
		this.length = length;
		
	}

	ins(data) {
	
		this.data.splice(0,0,data);
		this.data.length = this.length;
		
	}
	
}