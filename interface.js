/*
Interface object constructor that keeps track of UI elements and handles controls, inputs, and visual rendering of clock state
*/

var Interface = function () {

    // array of random color values
    var colorArray = fillColorArray();

    // jQuery object of clock for click tracking
    var $background = $('.clock-inside');

    // "work" module controls/input
    var $workPlusBtn = $('#workPlusBtn');
    var $workMinusBtn = $('#workMinusBtn');
    var $workTimeInput = $('#workTimeInput');
    var $workLabel = $('#workLabel');

    // "break" module controls/input
    var $breakPlusBtn = $('#breakPlusBtn');
    var $breakMinusBtn = $('#breakMinusBtn');
    var $breakTimeInput = $('#breakTimeInput');
    var $breakLabel = $('#breakLabel');

    // animated ticker slider
    var $tickerSlider = $('.ticker');

    // visual countdown timer
    var $timer = $('.timer');
    var running = false;

    // local interface variables
    var self = this;
    var tickerState = false;

    //interface methods

    // fills colorArray with random color values
    function fillColorArray() {
        return randomColor({
            count: 100
        });
    }

    // changes background color of clock, refills color array if empty
    this.changeBGColor = function () {
        if (colorArray.length < 1) {
            fillColorArray();
        }
        $background.css('background-color', colorArray.shift());
    }

    //function to animate clock
    var animateTicker = function () {

            var left = "0%";
            var right = "95%";
            var move = function (whichWay) {
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


    //updates .timer clock on each tick
    function updateTimer(seconds) {
        var minutes = Math.floor(seconds / 60);
        var seconds = seconds % 60;

        // zero pads minutes and seconds if < 10
        var time = ((minutes < 10) ? "0" + minutes : minutes) + ":" + ((seconds < 10) ? "0" + seconds : seconds);
        $timer.html(time);
    }

    function resetModeDisplay() {
      $workLabel.css("background-color", "#FFF");
      $breakLabel.css("background-color", "#FFF");
    }

    function updateModeDisplay(mode) {
      //console.log(mode);
      //mode: true = work, false = break;
        if (mode) {
          $workLabel.css("background-color", "#3F3");
          $breakLabel.css("background-color", "#FFF");
        } else {
          $workLabel.css("background-color", "#FFF");
          $breakLabel.css("background-color", "#3F3");
        }
    }

    //click handlers for control buttons
    $workPlusBtn.on('click', function () {
        if ($workTimeInput.val() < 120 && !running)
            $workTimeInput.val(parseInt($workTimeInput.val(), 10) + 1);
    });

    $workMinusBtn.on('click', function () {
        if ($workTimeInput.val() > 1 && !running)
            $workTimeInput.val(parseInt($workTimeInput.val(), 10) - 1);
    });

    $breakPlusBtn.on('click', function () {
        if ($breakTimeInput.val() < 60 && !running)
            $breakTimeInput.val(parseInt($breakTimeInput.val(), 10) + 1);
    });

    $breakMinusBtn.on('click', function () {
        if ($breakTimeInput.val() > 1 && !running)
            $breakTimeInput.val(parseInt($breakTimeInput.val(), 10) - 1);
    });
    // end click handlers

    // input validation for keyboard entry of work time
    $workTimeInput.focusout(function () {
        var workVal = $workTimeInput.val();
        if (workVal < 1 || workVal > 120 || /\D/.test(workVal)) {
            $workTimeInput.val(1);
            alert("Work time must be a number between 1 - 120");
            $workTimeInput.focus();
        }
    });

    // input validation for keyboard entry of break time
    $breakTimeInput.focusout(function () {
        var breakVal = $breakTimeInput.val();
        if (breakVal < 1 || breakVal > 60 || /\D/.test(breakVal)) {
            $breakTimeInput.val(1);
            alert("Break time must be a number between 1 - 60");
            $breakTimeInput.focus();
        }
    });

    // disable buttons during running state
    function disableButtons(){
        $workPlusBtn.addClass('disabled');
        $workMinusBtn.addClass('disabled');
        $breakPlusBtn.addClass('disabled');
        $breakMinusBtn.addClass('disabled');
    }

    function enableButtons(){
        $workPlusBtn.removeClass('disabled');
        $workMinusBtn.removeClass('disabled');
        $breakPlusBtn.removeClass('disabled');
        $breakMinusBtn.removeClass('disabled');
    }

    EventTracker.on('tick', function () {
        //        console.log("interface.tick handler");
        animateTicker();
    });

    //'counted' handler receives (work or break) time left, and clock mode
    EventTracker.on('counted', function (data) {
      //data.mode: true = work, false = break;
        updateModeDisplay(data.mode);
        updateTimer(data.timeLeft);
    });

    EventTracker.on('timeup', function(){ //resets running mode on timeup event
        running = false;
    });

    EventTracker.on('started', function(initialTime){
        updateTimer(initialTime);

    });

    $background.on('click', function () {

        if (running) {
            console.log('$background clicked, stopped');
            EventTracker.emit('stop');
            running = false;
            $timer.html("Click here to start");
            enableButtons();
            resetModeDisplay();
        } else {

            var initialState = {
                    startTime: parseInt($('#workTimeInput').val()),
                    breakTime: parseInt($('#breakTimeInput').val())
                }
            console.log('$background click, starting');
            EventTracker.emit('init', initialState);
            running = true;
            disableButtons();
            updateModeDisplay(running);
        }
    });
};
