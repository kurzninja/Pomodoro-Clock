var Clock = function () {

    var ticker = "";

    var start = function () {
        ticker = setInterval(function () {
            EventTracker.emit('tick');
//            console.log("ticked \n");
        }, 1000);
    }

    var stop = function () {
        console.log("clock.stop stopping");
        clearInterval(ticker);
    }

    EventTracker.on('start', function(initialState){
        EventTracker.emit('init', initialState);
        start();
    });
    EventTracker.on('stop', stop);
    EventTracker.on('timeup', stop);

};