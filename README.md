# Pomodoro-Clock
FreeCodeCamp Pomodoro Clock zipline WIP

This zipline contains 3 original modules and one utility module:

##clock.js
- This module responds "start", "stop", and "timeout" events and triggers "tick" events

##counter.js
- This module keeps track of the Pomodoro clock "state" as it runs. It receives an "init" event that initializes all of the clock variables and triggers a "start" event to start the clock module ticking.
It responds to "tick" events by decrementing how much time is left and emitting a "counted" event signaling that the time has changed to alert the interface to update.

##interface.js
- This module keeps track of all the UI elements and handles user interaction (clicks and data input) and DOM manipulation/rendering.
Triggers emitting an "init" event when user clicks on the clock to push current data state to the counter. 
Responds to "counted" events to update the UI counter with the current time data.

##eventTracker.js
- Pub/sub implementation taken from https://gist.github.com/learncodeacademy/777349747d8382bfb722
Only current utilizing the .on() and .emit() functions; could be made even smaller by removing the unused .off() function

### index.html / style.css
Basic html page containing necessary elements for clock to run: 4 modules above, jquery, bootstrap for styling/grid
