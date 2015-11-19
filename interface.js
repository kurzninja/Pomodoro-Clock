var Interface = function() {

    var colorArray = fillColorArray();
    var $background = $('.clock-inside');
    
    
    var $workPlusBtn = $('#workPlusBtn');
    var $workMinusBtn = $('#workMinusBtn');
    var $workTimeInput = $('#workTimeInput');
    
    var $breakPlusBtn = $('#breakPlusBtn');
    var $breakMinusBtn = $('#breakMinusBtn');
    var $breakTimeInput = $('#breakTimeInput');
    
    
    var $tickerSlider = $('.ticker');
    var $workLabel = $('#workLabel');
    var $restLabel = $('#breakLabel');
    var $timer = $('.timer');
    var running = false;
    
    var self = this;
    var tickerState = false;
   function fillColorArray(){
        return randomColor({count: 100});
    }
    
    this.changeBGColor = function() {
        if (colorArray.length < 1) {
            fillColorArray();
        }
        $background.css('background-color', colorArray.shift());        
    }
    
    var animateTicker= function() {
        
        var left = "0%";
        var right = "95%";
        var move = function(whichWay){
            $tickerSlider.animate({
                left: whichWay
            }, 500, "easeOutCubic"); //changes bgcolor at end of animation
        }
        
            //tickerstate false = ticker on left
            if (!tickerState) { 
                tickerState = !tickerState;
//                console.log("moving right", "tickerstate: " + tickerState);
                self.changeBGColor();
                move(right);
            //tickerstate true = ticker on right
            } else {
                tickerState = !tickerState;
//                console.log("moving left", "tickerstate: " + tickerState);
                self.changeBGColor();
                move(left);
            } //end if/else
        
    } //end animateTicker() 
    
    function updateMinutes(seconds) {
        
    }
    
    $workPlusBtn.on('click', function () {
        if ($workTimeInput.val() < 121)
            $workTimeInput.val(parseInt($workTimeInput.val(), 10) + 1);
    });

    $workMinusBtn.on('click', function () {
        if ($workTimeInput.val() > 1)
            $workTimeInput.val(parseInt($workTimeInput.val(), 10) - 1);
    });

    $breakPlusBtn.on('click', function () {
        if ($breakTimeInput.val() < 61)
            $breakTimeInput.val(parseInt($breakTimeInput.val(), 10) + 1);
    });

    $breakMinusBtn.on('click', function () {
        if ($breakTimeInput.val() > 1)
            $breakTimeInput.val(parseInt($breakTimeInput.val(), 10) - 1);
    });
    
    $background.on('click', function(){
        
        if (running) {
            console.log('$background clicked, stopped');
            EventTracker.emit('stop');
            running = false;
        } else {
            
            var initialState = {
                startTime: parseInt($('#workTimeInput').val()),
                breakTime: parseInt($('#breakTimeInput').val())
            }
            console.log('$background click, starting');
            EventTracker.emit('start', initialState); 
            running = true;
        }
    });
    
    $workTimeInput.focusout(function(){
       if ($workTimeInput.val() < 1 || /\D/.test($workTimeInput.val())) {
           $workTimeInput.val(1);
           alert("Work time must be a number between 1 - 120");           
           $workTimeInput.focus();
       }
    });
    
    $breakTimeInput.focusout(function(){
       if ($breakTimeInput.val() < 1 || /\D/.test($breakTimeInput.val())) {
           $breakTimeInput.val(1);
           alert("Break time must be a number between 1 - 120");           
           $breakTimeInput.focus();
       }
    });
    
    EventTracker.on('tick', function(){
        console.log("interface.tick handler");
        animateTicker();
    });
    EventTracker.on('counted', function(timeLeft){
        var minutes = Math.floor(timeLeft / 60).toString();
        var seconds = (timeLeft % 60).toString();
        $timer.html(timeLeft);        
        
    });
};