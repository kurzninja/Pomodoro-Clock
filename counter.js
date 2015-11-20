/*
Counter object constructor that keeps track of how much time is left, when time is up, and which state the Pomodoro clock is in (work or break).
*/

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