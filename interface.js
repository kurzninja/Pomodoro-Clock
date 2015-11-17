var interface = (function() {

    var colorArray = fillColorArray();
    var $background = $('.clock-inside');
    var $minuteCounter = $('')
    var $tickerSlider = $('.ticker');
    
    function fillColorArray(){
        return randomColor({count: 100});
    }
    
    function changeBGColor() {
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
    
    
    eventTracker.on('counted', );
});