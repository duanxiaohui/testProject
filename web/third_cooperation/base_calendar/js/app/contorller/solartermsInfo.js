define(['zepto'],function($) {

	var solarTerm = ["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"];
	var sTermInfo = [0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758];
	//节气例外调整
	var SolarTermException = {
		"2012/5/21":"2012/5/20",
		"2012/12/6":"2012/12/7",
		"2013/2/3":"2013/2/4",
		"2013/7/23":"2013/7/22",
		"2013/12/21":"2013/12/22",
		"2014/3/5":"2014/3/6",
		"2015/1/5":"2015/1/6",
		"2016/6/6":"2016/6/7",
		"2017/7/23":"2017/7/22",
		"2017/12/21":"2017/12/22",
		"2018/2/18":"2018/2/19",
		"2018/3/20":"2018/3/21",
		"2019/2/5":"2019/2/4",
		"2019/6/22":"2019/6/21",
		"2020/7/7":"2020/7/6",
		"2020/8/23":"2020/8/22",
		"2020/12/6":"2020/12/7"
	};

	function getsolarTermDateInfo(){
		var self = this;
		var date = new Date();
		return $.map(solarTerm, function(_, i){
			return sTerm(date.getFullYear(),i);
		});
	}

	/*某年的第n个节气为几日(从0小寒起算)*/
	function sTerm(y,n) {
		var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) + Date.UTC(1900,0,6,2,5) );
		var term = {};
		var termDate = offDate.getFullYear()+"/"+(offDate.getMonth()+1)+"/"+offDate.getUTCDate();

		if(typeof SolarTermException[termDate] != 'undefined'){
			term.date =  SolarTermException[termDate];
		}else {
			term.date = termDate;
		}
		term.name = solarTerm[n];

		return term;
	}

	return {
		init:getsolarTermDateInfo
	};
});