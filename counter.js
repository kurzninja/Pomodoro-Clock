var counter = (function() {
    
    var workTime = $('#workTimeInput').val();
    var breakTime = $('#breakTimeInput').val();
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