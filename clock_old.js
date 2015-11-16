var clock = function() {

	var self = this;

	this.colorArray = this.fillColorArray();
	this.$ticker = $('.ticker');
	this.$tickerState = true;
	this.$background = $('.clock-inside');
	this.$workTime = parseInt($('.work .number').html(), 10);
	this.$breakTime = parseInt($('.break .number').html(), 10);
	this.startTime = $workTime * 60;
	this.timeLeft = startTime;
	this.ticking = false;
	
	this.start = function() {
		this.ticking = true;
		this.tick();
	}

	this.stop = function() {
		this.ticking = false;
	}

	this.fillColorArray = function() {
		return randomColor({count: 100});
	}

	this.bgChange = function() {
		if (this.colorArray.length == 0) {
			this.colorArray = this.fillColorArray();
		}
		var nextColor = this.colorArray.shift();
		this.$background.css('background-color', nextColor);
	}	

	this.tick = function() {
		if (!this.ticking) {
			return;
		}
		if (this.$tickerState) {
			if (this.$timeLeft > 0) {
				this.$timeLeft--;
				this.$ticker.animate({
					left: "95%"
				}, 500, bgChange);
				setTimeOut(self.tick(), 1000);
			} else {
				return;
			}
		} else {
			if (this.$timeLeft > 0) {
				this.$timeLeft--;
				this.$ticker.animate({
					left: "0%"
				}, 500, bgChange);
				setTimeOut(self.tick(), 1000);
			} else {
				return;
			}
		} //if/else (this.$tickerstate) (40/50)
	} //this.tick() (36)

}