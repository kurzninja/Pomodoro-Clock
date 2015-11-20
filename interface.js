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
        var time = "";
        var minutes = Math.floor(seconds / 60);
        var seconds = seconds % 60;

        // zero pads minutes and seconds if < 10
        time = ((minutes < 10) ? "0" + minutes : minutes) + ":" + ((seconds < 10) ? "0" + seconds : seconds);
        $timer.html(time);
    }
    
    
    function updateModeDisplay() {
        //implement work and break color coding here
    }

    //click handlers for control buttons
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
    // end click handlers

    // input validation for keyboard entry of work time
    $workTimeInput.focusout(function () {
        if ($workTimeInput.val() < 1 || /\D/.test($workTimeInput.val())) {
            $workTimeInput.val(1);
            alert("Work time must be a number between 1 - 120");
            $workTimeInput.focus();
        }
    });

    // input validation for keyboard entry of break time
    $breakTimeInput.focusout(function () {
        if ($breakTimeInput.val() < 1 || /\D/.test($breakTimeInput.val())) {
            $breakTimeInput.val(1);
            alert("Break time must be a number between 1 - 120");
            $breakTimeInput.focus();
        }
    });

    EventTracker.on('tick', function () {
        //        console.log("interface.tick handler");
        animateTicker();
    });
    
    //'counted' handler receives (work or break) time left, and clock mode
    
    $background.on('click', function () {

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
            EventTracker.emit('init', initialState);
            running = true;
        }
    });
