var interface = (function() {

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
    
    function fillColorArray(){
        return randomColor({count: 100});
    }
    
    this.changeBGColor = function() {
        if (colorArray.length < 1) {
            fillColorArray();
        }
        $background.css('background-color', colorArray.shift());        
    }
    
    function animateTicker() {
        var tickerState = false;
        var left = "0%";
        var right = "95%";
        function move(whichWay){
            $tickerSlider.animate({
                left: whichWay
            }, 500, bgChange); //changes bgcolor at end of animation
        }
        return function() {
            //tickerstate false = ticker on left
            if (!tickerState) { 
                tickerState = true;
                move(right);
            //tickerstate true = ticker on right
            } else {
                tickerState = false;
                move(left);
            } //end if/else
        } //end return function
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
    
    eventTracker.on('tick', animateTicker);
    eventTracker.on('counted', function(timeLeft){
        var minutes = Math.floor(timeLeft / 60).toString();
        var seconds = (timeLeft % 60).toString();
        $timer.html(timeLeft);        
        
    });
});