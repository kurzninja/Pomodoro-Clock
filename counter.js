var Counter = function() {
    
    
    var timeLeft = "";
    
    var tick = function() {
//        console.log("counter.tick ticked", "timeLeft: " + timeLeft);
        if (timeLeft > 0) {
            timeLeft--;
            EventTracker.emit('counted', timeLeft);
        } 
        else {   
            console.log("Counter: time's up");
            EventTracker.emit('timeup');
        }
            
    }
    
    EventTracker.on('init', function(initialState){
        timeLeft = initialState.startTime * 60;        
    });
	
    EventTracker.on('tick', tick);
	
};