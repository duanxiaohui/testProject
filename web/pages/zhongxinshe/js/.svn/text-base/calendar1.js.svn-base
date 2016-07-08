/**
 * 
 * @authors 张明臣 (vest0804@gamil.com)
 * @date    2014-12-11 11:03:39
 * @version 1.0
 */

(function(){
	var rRoute, rFormat;
	$.route = function(obj, path){
		obj = obj || {};
		var m;
		(rRoute || (rRoute = /([\d\w_]+)/g)).lastIndex = 0;
		while ((m = rRoute.exec(path)) !== null) {
			obj = obj[m[0]];
			if (obj == undefined) {
				break
			}
		}
		return obj
	};
	$.format = function(){
		var args = $.makeArray(arguments), str = String(args.shift() || ""), ar = [], first = args[0];
		args = $.isArray(first) ? first : typeof(first) == 'object' ? args : [args];
		$.each(args, function(i, o){
			ar.push(str.replace(rFormat || (rFormat = /\{([\d\w\.]+)\}/g), function(m, n, v){
				v = n === 'INDEX' ? i : n.indexOf(".") < 0 ? o[n] : $.route(o, n);
				return v === undefined ? m : ($.isFunction(v) ? v.call(o, n) : v)
			}));
		});
		return ar.join('');
	};
	var rPad;
	$.padWithZero = function(str){
		return str.replace((rPad || (rPad = /(^|\D)(\d)(?=$|\D)/g)), '$10$2');
	};
})();
$.widget('meixx.webCalendar', {
	options: {

	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		this.tmplDate = '<div class="icon">{icon}</div>\
    	<div class="solar_lunar_box">\
    		<div class="date_solar">{year}年{month}月{date}日 星期{week}</div>\
    		<div class="date_lunar">今天是中国农历{lmonth}月{ldate} [{animal}]年</div>\
    	</div>';
    	var date = new Date();
		var timezoneOffset = date.getTimezoneOffset(); // 中国（东八区）为-480
		if(timezoneOffset!="-480"){
			var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
			date = new Date(utc + (3600000*8));
		}
		var y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate(),ld=lunar(date);
		$('.calendar_box').html($.format(this.tmplDate,{
				year:y,
				month:m,
				date:d,
				week:ld.cnDay,
				ldate:ld.lDate,
				lmonth: ld.lMonth,
				animal: ld.animal,
				icon:ld.festival[0] && ld.festival[0].desc.length < 7 && ld.festival[0].desc || ld.term || ld.lDate
			})
		)
	},
});
$(function(){
	$('.calendar_box').webCalendar();
});
