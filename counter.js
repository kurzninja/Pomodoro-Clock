/*
Counter object constructor that keeps track of how much time is left, when time is up, and which state the Pomodoro clock is in (work or break).
*/

var Counter = function() {
    
    
    var workTimeLeft = "";
    var breakTimeLeft = "";
    var mode = true; //true = work, false = break;
    
    var tick = function() {
        if (mode) {  // if in work mode      
//        console.log("counter.tick ticked", "timeLeft: " + timeLeft);
            if (workTimeLeft > 0) { // if time left in work mode
                workTimeLeft--;
                EventTracker.emit('counted', workTimeLeft, mode);
            } 
            else {   // work mode time runs out
                mode = false; //switch to break mode
                EventTracker.emit('counted', breakTimeLeft, mode); //transmit break start time
            }
        } else { // if in break mode
            if (breakTimeLeft > 0) { // if time left in break mode
                breakTimeLeft--;
                EventTracker.emit('counted', breakTimeLeft, mode);                
            } 
            else { // break mode time runs out
                mode = true;
                EventTracker.emit('timeup');
            }            
        }            
    }
    
    EventTracker.on('init', function(initialState){
        workTimeLeft = initialState.startTime * 60;        
        breakTimeLeft = initialState.breakTime * 60;
        EventTracker.emit('start');
    });
	
    EventTracker.on('tick', tick);
	
};