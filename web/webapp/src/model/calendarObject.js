define(function(require, exports, module) {	
	function Calendar(date){
		this.date = date ? new Date(+date) : (G.currDate || new Date);
	}

	Calendar.prototype = {
		getMonthFirstDate: function(){
			var date = new Date(+this.date);
			date.setDate(1);
			return date;
		},
		getCalendarFirstDate: function(){
			var date = this.getMonthFirstDate(), day = date.getDay(), ar = [-6, 0, -1, -2, -3, -4, -5];
			date.setDate(date.getDate() + ar[day]);
			return date;
		},
		getCalendarSundayFirstDate: function(){
			var date = this.getMonthFirstDate(), day = date.getDay(), ar = [0, -1, -2, -3, -4, -5, -6];
			date.setDate(date.getDate() + ar[day]);
			return date;
		}
	};
	
	module.exports = Calendar;	
});