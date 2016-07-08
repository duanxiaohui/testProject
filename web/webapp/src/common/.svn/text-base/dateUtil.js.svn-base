define(function(require, exports, module) {
	var self = {};
	module.exports = self;
	//set the time of date zero
	self.setTimeZero = function(date){
		var ndate = new Date(date);
		ndate.setHours(0);
		ndate.setMinutes(0);
		ndate.setSeconds(0);
		ndate.setMilliseconds(0);	
		return ndate;
	}
	
	//get the first date in the month where `date` in
	self.getMonthFirst = function(date){
		var ndate = new Date(date);
		ndate.setDate(1);
		return ndate;
	}
	
	//add `inc` time which `mode` said on `date`
	self.addTime  = function(date, inc, mode){
		var ndate = new Date(date);
		switch(mode)
		{
			case "day":
				ndate.setDate(date.getDate()+inc); 
				break;
			case "week": 
				ndate.setDate(date.getDate()+7*inc); 
				break;
			case "month": 
				ndate.setMonth(date.getMonth()+inc); 
				break;
			case "year": 
				ndate.setYear(date.getFullYear()+inc); 
				break;
			case "hour": 
				ndate.setHours(date.getHours()+inc); 
				break;
			case "minute": 
				ndate.setMinutes(date.getMinutes()+inc); 
				break;
			default:
				return ndate;
		}
		return ndate;
	}

	//get the first date in the week where `date` in
	self.getWeekFirst = function(date){
		var day = date.getDay();
		if ( day == 0 )
		{
			day = 7;
		}
		return self.addTime(date, 0-day+1, "day");
	}
	
	self.getMonthDateStr = function(a){
		var month=a.getMonth()+1;
		var day=a.getDate();
		month<10&&(month="0"+month);
		day<10&&(day="0"+day);
		return month+""+day;
	}
	
	self.getFullDateStr = function(date)
	{
		var month = date.getMonth()+1;
		var day = date.getDate();
		var year = date.getFullYear();
		return year+"-"+month+"-"+day;
	}
	//add `inc` time which `mode` said on `date`
	self.addTime = function(date, inc, mode){
		var ndate = new Date(date);
		switch(mode)
		{
			case "day":
				ndate.setDate(date.getDate()+inc); 
				break;
			case "week": 
				ndate.setDate(date.getDate()+7*inc); 
				break;
			case "month": 
				ndate.setMonth(date.getMonth()+inc); 
				break;
			case "year": 
				ndate.setYear(date.getFullYear()+inc); 
				break;
			case "hour": 
				ndate.setHours(date.getHours()+inc); 
				break;
			case "minute": 
				ndate.setMinutes(date.getMinutes()+inc); 
				break;
			default:
				return ndate;
		}
		return ndate;
	}
});
