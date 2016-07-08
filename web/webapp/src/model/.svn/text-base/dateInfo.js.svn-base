define(function(require, exports, module) {	
	var $l = require("../common/solarAndLunar.js");
	
	var festival2013 = {}, workday2013 = {};
	$.each('m1d1 m1d2 m1d3 m2d9 m2d10 m2d11 m2d12 m2d13 m2d14 m2d15 m4d4 m4d5 m4d6 m4d29 m4d30 m5d1 m6d10 m6d11 m6d12 m9d19 m9d20 m9d21 m10d1 m10d2 m10d3 m10d4 m10d5 m10d6 m10d7'.split(' '), function(_, key){
		festival2013[key] = 'rest';
	});
	
	$.each('m1d5 m1d6 m2d16 m2d17 m4d7 m4d27 m4d28 m6d8 m6d9 m9d22 m9d29 m10d12'.split(' '), function(_, key){
		workday2013[key] = 'work';
	});
	var festival2014 = {}, workday2014 = {};
	$.each('m1d1 m1d31 m2d1 m2d2 m2d3 m2d4 m2d5 m2d6 m4d5 m4d6 m4d7 m5d1 m5d2 m5d3 m5d31 m6d1 m6d2 m9d6 m9d7 m9d8 m10d1 m10d2 m10d3 m10d4 m10d5 m10d6 m10d7'.split(' '), function(_, key){
		festival2014[key] = 'rest';
	});
	
	$.each('m1d26 m2d8 m5d4 m9d28 m10d11'.split(' '), function(_, key){
		workday2014[key] = 'work';
	});
	
	
	//	21 * 2 month view
	function getFlatMonthViewDateInfo(startDate, calMonth){
		return $.map(new Array(42), function(_, i){
			var dateInfo = getDateInfo(startDate, calMonth, i % 7 == 0 ? '<tr>' : '', i % 7 == 6 ? '</tr>' : '');
			void (startDate.setDate(startDate.getDate() + 1));
			return dateInfo;
		});
	}
	
	
	//	7 * 6 month view
	function getMonthViewDateInfo(startDate, calMonth){
		return $.map(new Array(42), function(_, i){
			var dateInfo = getDateInfo(startDate, calMonth, i % 7 == 0 ? '<tr>' : '', i % 7 == 6 ? '</tr>' : '');
			void (startDate.setDate(startDate.getDate() + 1));
			return dateInfo;
		});
	}
	
	function getDateInfo(date, calMonth, rowStart, rowEnd){
		var y = date.getFullYear(), m = date.getMonth(), d = date.getDate(), w = date.getDay();
		var t = new Date();
		var l = $l.lunar(date);
		var festival = l.festival();
		var isToday = (d == t.getDate() && m == t.getMonth() && y == t.getFullYear());
		var key = 'm' + (m + 1) + 'd' + d;
		return {
			rowStart:rowStart,
			rowEnd:rowEnd,
			todaytext: isToday ? '<span class="today-text">今天</span>' : '',
			vocationtext: getVocationText(y, key),
			worktext: getWorkText(y, key),
			monthClass: m < calMonth ? 'month_befor' : m > calMonth ? 'month_after' : isToday ? 'today' : w == 0 || w == 6 ? 'weekend' : '',
			solar: date.getDate(),
			lunar: festival[0] && festival[0].desc || l.term || l.dateIndex == 0 && (l.lMonth + '月' + (l.isBigMonth ? '大' : '小')) || l.lDate,
			date: formatDate(date),
			color: festival.length || l.term ? '198500' : '808080'
		};
	}
	
	function getVocationText(y, key){
		return (y == 2013 && festival2013[key]) || (y == 2014 && festival2014[key]) ? '<span class="vocationt-text">放假</span>' : '';
	}
	
	function getWorkText(y, key){
		return (y == 2013 && workday2013[key]) || (y == 2014 && workday2014[key]) ? '<span class="work-text">工作</span>' : '';
	}
	
	function getLunarDateInfo(date){
		var l = $l.lunar(date);
		var lMonth = l.lMonth;
		if(lMonth == "十一"){
			lMonth = "冬";
		}
		if(lMonth == "十二"){
			lMonth = "腊";
		}
		return lMonth +"月"+ l.lDate;
	}
	
	function formatDate(date){
		return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
	}
	
	//set the time of date zero
	function setTimeZero(date){
		var ndate = new Date(date);
		ndate.setHours(0);
		ndate.setMinutes(0);
		ndate.setSeconds(0);
		ndate.setMilliseconds(0);	
		return ndate;
	}
	function getDayMatter(date){
		var t = setTimeZero(new Date());
		var d = setTimeZero(date);
		var num = Math.floor((d.getTime() - t.getTime()) / 86400000);
		
		if(num == 0){
			return "";
		}else if(num == 1){
			return "明天";
		}else if(num == -1){
			return "昨天";
		}else if(num > 0){
			return num + "天后";
		}else{
			return -num + "天前";
		}
	}
	var chineseDay = ["周日","周一","周二","周三","周四","周五","周六"];
	function getChineseDay(date){
		return chineseDay[date.getDay()];
	}
	function getLunartimeForScheduleTip(date){
		return getLunarDateInfo(date) + " " + getChineseDay(date) + " " + getDayMatter(date);
	}
	module.exports = {
		getMonthViewDateInfo:getMonthViewDateInfo,
		getLunarDateInfo:getLunarDateInfo,
		getDayMatter:getDayMatter,
		getChineseDay:getChineseDay,
		getLunartimeForScheduleTip:getLunartimeForScheduleTip
	};	
});