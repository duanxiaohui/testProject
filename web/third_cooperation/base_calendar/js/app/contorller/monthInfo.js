define(['zepto','data','lunar'],function($,__data,_lunar) {

	var festivalYear = {},
	_lunar = _lunar || undefined;
	//添加月视图中节假日的样式表class
	var _data = __data.data;
	for(var year in _data){
		festivalYear[year] = {};
		$.each(_data[year].festiArr.concat(_data[year].festiArrSupplemental),function(_,h){
			var start = new Date(h.from),
				end = new Date(h.to);
			var key, m, d;
			//计算节假日并插入到festivalYear中
			while(1){
				m = start.getMonth();
				d = start.getDate();
				key = (m+1) + '/' + d;
				festivalYear[year][key] = 'rest';
				if(m == end.getMonth() &&  d==+ end.getDate()) {
					break;
				}
				start.setDate(start.getDate()+1);
			}
		});
	}

	//生成月视图数据
	function getMonthViewDateInfo(startDate, calMonth){
		//calMonth = calMonth;
		return $.map(new Array(42), function(_, i){
			var dateInfo = getDateInfo(startDate, calMonth);
			void (startDate.setDate(startDate.getDate() + 1));
			return dateInfo;
		});
	}

	//生成每个格子数据
	function getDateInfo(date, calMonth){
		var y = date.getFullYear(), m = date.getMonth(), d = date.getDate(), w = date.getDay();
		var t = new Date();
		var l,festival;
		var isToday = (d == t.getDate() && m == t.getMonth() && y == t.getFullYear());
		var key = (m+1) + '/' + d;
		//如果加载农历模块则生成农历
		if (_lunar) {
			l = _lunar.lunar(date);
			festival = l.festival();
		}
		return {
			monthClass: (function () {
				/**
				 * 需要完整的日信息
				 */
				var monClassAr = [];
				m != calMonth ? monClassAr.push('other-month') : monClassAr.push('this-month');
				isToday && monClassAr.push('today');
				(w == 0 || w == 6) && monClassAr.push('weekend');
				if(festivalYear[y] && festivalYear[y][key]) monClassAr.push("rest");
				if(_data[y] && _data[y].workArr[key]) monClassAr.push("work");
 				return monClassAr.join(" ");
			}()),
			solar: date.getDate(),
			lunar: l ? festival[0] && festival[0].desc || l.term || l.dateIndex == 0 && (l.lMonth + '月' + (l.isBigMonth ? '大' : '小')) || l.lDate : "",
			date: formatDate(date)
			//color: festival.length || l.term ? '198500' : '808080'
		};
	}

	//格式化时间
	function formatDate(date){
		return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('\/').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
	}

	/**
		月视图对象
	**/
	function Calendar(date){
		this.date = date ? new Date(+date) : new Date;
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
	return {
		getMonthViewDateInfo:getMonthViewDateInfo,
		Calendar: Calendar
	};
});