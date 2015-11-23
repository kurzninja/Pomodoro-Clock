/* 
Clock object constructor that emits "ticks" at one second intervals, responds to "start" and "stop" events appropriately
*/


var Clock = function () {

    var ticker = "";

    function start(initialTime) {
        EventTracker.emit('started', initialTime);
        ticker = setInterval(function () {
            EventTracker.emit('tick');
            //            console.log("ticked \n");
        }, 1000);
    };

    function stop() {
        //        console.log("clock.stop stopping");
        clearInterval(ticker);
    }

    EventTracker.on('start', start);
    EventTracker.on('stop', stop);
    EventTracker.on('timeup', stop);

};