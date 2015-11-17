var clock = function () {
	
	var status = false; //false is off, true is on
    
	var ticker = function() {
        return setInterval(function() {		
        eventTracker.emit('tick', null);
		}, 1000);
    }
	
	var start = function () {		
		if (!status) {	//if status is false (= off)
			status = "on";
			tick();
		}
	}

	var stop = function() {
		clearInterval(ticker);
	}	
    
    eventTracker.on('start', start);
    eventTracker.on('stop', stop);
    eventTracker.on('timeup', stop);
    
};