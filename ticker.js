var clock = (function() {
	
	var status = false; //false is off, true is on

	var ticker = setInterval(function() {
		
		/* 
		insert 'tick' emitting here 
		*/

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