var counter = (function() {
    
    var workTime = parseInt($('.work .number')).html(), 10);
    var breakTime = parseInt($('.break .number')).html(), 10);
    var startTime = workTime * 60;
    var timeLeft = startTime;
    
    var tick = function() {
        if (timeLeft > 0) {
            timeLeft--;
            eventTracker.emit('counted', timeLeft);
        } 
        else {
            eventTracker.emit('timeup');
        }
            
    }
	
    eventTracker.on('tick', tick);
	
});