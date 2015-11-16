var clock = (function() {
	
	this.prototype = Object.clone(EventEmitter.protoype)
    
    var status = false; //false is off, true is on
    var self = this;
	var ticker = setInterval(function() {
		
		

		} , 1000);
	
	var start = function () {
		
		if (!status) {	//if status is false (= off)
			status = "on";
			tick();
		}

	}

	var stop = function() {
		clearInterval(ticker);
	}

	return {
		start: start,
		stop: stop,
	}
	
});