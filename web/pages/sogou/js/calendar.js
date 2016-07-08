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
function Calendar(date){
	this.date = date ? new Date(+date) : (G.currDate || new Date);
}

Calendar.prototype = {
	getMonthFirstDate: function(){
		var date = new Date(+this.date);
		date.setDate(1);
		return date;
	},
	getCalendarFirstDate: function(isSundayFirst){
		var date = this.getMonthFirstDate(), day = date.getDay();
		date.setDate(date.getDate() - (isSundayFirst ? day : day == 0 ? 6 : (day - 1)));
		return date;
	}
};
var holidayDate = festivalInfo;

var instance = {
    getNameByDay: function(date){
        var dateString = '/' + (date.getMonth() + 1) + '/' + date.getDate();
        console.log(dateString);
        for(var i = 0, l = holidayDate.length; i < l; i++){
            if(holidayDate[i].from === dateString){
                return holidayDate[i].name
            }
        }
        return '';
    }
};

$.widget('meixx.webCalendar', {
	options: {
		defDate: new Date(),
		onselect: $.noop
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var now = this.today = opt.defDate, year = now.getFullYear(), month = now.getMonth() + 1;
		this.panel = $elem.find('ul.js-cld-panel');
		this.tmplDate = '<li class="{monthClass}" date="{date}"><div class="date_box"><div class="icon"></div><div class="calendar_date">{solar}</div><div class="calendar_lunar">{lunar}</div></div></li>';
		this.initCalendar(year, month);
		opt.onselect.call(self, now, lunar(now));
		this.handleClick();
		this.initDatePicker();
	},
	initCalendar: function(year, month, vocFrom, vocTo ,data){
		var self = this, $elem = $(this.element), opt = this.options;
		var d = new Date(year, month - 1, 1), c = new Calendar(d), firstDay = c.getCalendarFirstDate(), t = this.today, day;
		if (vocFrom) {
			vocFrom = new Date(vocFrom);
			vocTo = new Date(vocTo);
			if (vocFrom < firstDay) {
				firstDay = new Date(vocFrom);
				day = firstDay.getDay()
				firstDay.setDate(firstDay.getDate() - (day == 0 ? 6 : (day - 1)));
			}
		}
		this.year = d.getFullYear();
		this.month = d.getMonth() + 1;
		$('#sp_year').html(this.year);
		$('#sp_month').html(this.month);
        var today = new Date(year, month - 1, data);

		var iterator = new Date(firstDay), rowsHtml = $.map(new Array(42), function(_, i){
			var y = iterator.getFullYear(), m = iterator.getMonth(), d = iterator.getDate(), w = iterator.getDay(), l = lunar(iterator);
			var selector = [], key = 'm' + (m + 1) + 'd' + d, festival = l.festival(), isVoc = false;
			if (worktime[y]) {
				if (vocFrom) {
					if (+iterator >= +vocFrom && +iterator <= +vocTo) {
						worktime[y]['festival'][key] && (isVoc = true) && selector.push(worktime[y]['festival'][key], 'vacation');
						worktime[y]['workday'][key] && (isVoc = true) && selector.push(worktime[y]['workday'][key]);
					}
					if (!isVoc) {
						selector.push('befor');
					}
				} else {
					worktime[y]['festival'][key] && selector.push(worktime[y]['festival'][key], 'vacation');
					worktime[y]['workday'][key] && selector.push(worktime[y]['workday'][key]);
					m != self.month - 1 && selector.push('befor');
					d == t.getDate() && m == t.getMonth() && y == t.getFullYear() && selector.push('today');
					(w == 0 || w == 6) && selector.push('weekend');
					l.term ? selector.push('solar') : festival.length ? selector.push('isolar') : '';
				}
			} else {
				m != self.month - 1 && selector.push('befor');
				d == t.getDate() && m == t.getMonth() && y == t.getFullYear() && selector.push('today');
				(w == 0 || w == 6) && selector.push('weekend');
				l.term ? selector.push('solar') : festival.length ? selector.push('isolar') : '';
			}
			data==d && m == month - 1&& selector.push('on');
			iterator.setDate(iterator.getDate() + 1);
			return $.format(self.tmplDate, {
				monthClass: selector.join(' '),
				solar: d,
				lunar: festival[0] && festival[0].desc.length < 7 && festival[0].desc || l.term || l.dateIndex == 0 && (l.lMonth + '月' + (l.isBigMonth ? '大' : '小')) || l.lDate,
				date: [y, m + 1, d].join('/')
			});
		});

		this.panel.css('opacity', 0.2).html(rowsHtml).fadeTo(200, 1);
		data && self.festivalClick(this.panel.find("li.on"));
	},
	setCalendarDate: function(date){
		var self = this, $elem = $(this.element), opt = this.options;
		var year  = date.getFullYear();
		var month = date.getMonth() + 1;
		var _date  =  date.getDate();
		$('#sp_year').html(year);
		$('#sp_month').html(month);
		self.initCalendar(year, month ,undefined ,undefined ,_date);
        
        // if(year==2014){
        //     $(".vacation_distance").show();
        //     var _name = instance.getNameByDay(self.nextFestival);
        //     var days =parseInt((self.nextFestival.getTime()-date.getTime())/86400000);
        //     $(".vacation_distance").html("距离"+_name+"放假还有"+"<span class='txt_day'>"+days+"</span>"+"天");
        // }
	},
	handleClick: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		$('li', self.panel).live('click', function(){
			self.panel.find('li.on').removeClass('on');
			self.panel.find('li.reston').removeClass('reston').addClass('rest');
			self.panel.find('li.workon').removeClass('workon').addClass('work');
			$('li', self.panel).removeClass('on liactive');
			var $li = $(this).addClass('on liactive'), strDate = $li.attr('date'), d = new Date(strDate), year = d.getFullYear(), month = d.getMonth() + 1;
			if (month != self.month) {
				self.initCalendar(year, month);
				self.panel.find('li[date="' + strDate + '"]').addClass('on');
				self.panel.find('li[date="' + strDate + '"]').click();
			} else {
				opt.onselect.call(self, d, lunar(d));
			}
            zoom();
		});
	},
	festivalClick: function($li){
		var self = this, $elem = $(this.element), opt = this.options;
		var strDate = $li.attr('date'), d = new Date(strDate);
		opt.onselect.call(self, d, lunar(d));
			
	},
	initDatePicker: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		$elem.find('div.operate_btn a.operate_today').click(function(evt){
			evt.preventDefault();
			self.initCalendar(self.today.getFullYear(), self.today.getMonth() + 1);
			self.panel.find('li.today').click();
		});
		$elem.find('div.operate_btn a.prev,div.operate_btn a.next').click(function(evt){
			evt.preventDefault();
			var $lnk = $(this), delta = $lnk.attr('delta') - 0;
			self.initCalendar(self.year, self.month + delta);
		});
	},
	getYear: function(){
		return this.year;
	},
	getMonth: function(){
		return this.month;
	},
	getPanel: function(){
		return this.panel;
	}
});
$.widget('meixx.dayDetail', {
	options: {},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		this.tmpl = '<div class="alm_date">{padmonth}月{paddate}日 {week}</div><div class="alm_content e_clear">{istoday}\
		<div class="today_date">{date}</div><div class="smallcd_lunar"><p>【{animal}年】{lmonth}月{ldate}</p></div>\
			</div><div class="yj_box e_clear"><div class="yi"></div><div class="ji"></div></div></div>';
	},
	init: function(date, l){
		var self = this, $elem = $(this.element), opt = this.options;
		var y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate(), now = new Date();
		$elem.html($.format(this.tmpl, {
			year: y,
			padmonth: ('0' + m).slice(-2),
			paddate: ('0' + d).slice(-2),
			date: d,
			week: '星期' + l.cnDay,
			animal: l.animal,
			istoday: now.getDate() == d && now.getMonth() == date.getMonth() && now.getFullYear() == y ? '<div class="today_icon"></div>' : '',
			lmonth: l.lMonth,
			ldate: l.lDate,
			gzyear: l.gzYear,
			gzmonth: l.gzMonth,
			gzdate: l.gzDate
		}));

		this.loadLuckyData(y, m, d);
	},
	loadLuckyData: function(y, m, d){
		var self = this, $elem = $(this.element), opt = this.options;
		var strDate = 'd' + ('0' + m).slice(-2) + ('0' + d).slice(-2);
		if (window.HuangLi && HuangLi['y' + y]) {
			this.fillLuckyData(HuangLi['y' + y][strDate]);
		} else if (y > 2007 && y < 2021) {
			$.getScript('/js/huangli/hl' + y + '.js', function(){
				self.fillLuckyData(HuangLi['y' + y][strDate]);
			});
		}else{
			$('.yj_box').hide();
		}
	},
	fillLuckyData: function(data){
		var self = this, $elem = $(this.element), opt = this.options;
		var y = data.y.replace(/^\.|\.$/g, '').split('.'), j = data.j.replace(/^\.|\.$/g, '').split('.');
		$elem.find('div.yi').html(dealString(y)).attr('title', y.join(' '));
		$elem.find('div.ji').html(dealString(j)).attr('title', j.join(' '));
	}
});
function dealString(ar){
	ar = ar.sort(function(a, b){
		return a.length - b.length;
	});
	var arRslt = [], t;
	$.each(ar, function(i, s){
		arRslt.push(s);
	});
	return arRslt.join('<br><hr>');
}
$.widget('zmc.vacationLayer', {
	options: {},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		$("body").append(opt.tmplHead + $.format(opt.tmplBody, opt.data) + opt.tmplTail);
		$elem.click(function(evt){
			evt.preventDefault();
			evt.stopPropagation();
			var $tip = $('div.vac_solar_layer').eq($(this).index()), isVisible = $tip.is(':visible');
			$('#bd').hide();
			$tip.removeClass("none");
			$tip[isVisible ? 'hide' : 'show']('fade').parent()[isVisible ? 'removeClass' : 'addClass']('on');
		});
		var $layer =$('div.vac_solar_layer').eq($elem.index());
		var $lis = $layer.find('li');
		for (var i = 0; i < $lis.length; i++) {
			$lis[i].onclick = function(evt){
				$(this).parents("div.vac_solar_layer").addClass("none");
				evt.stopPropagation();
				$('#bd').show();
				var $li = $(this), year = opt.type == 'v' ? new Date().getFullYear() : ($('#bd').webCalendar('getYear') - ($('#bd').webCalendar('getMonth') == 1 ? 1 : 0)), idx = $li.attr('idx') - 0;
				var month = opt.type == 'v' ? $li.attr('month') - 0 : Math.ceil((idx + 1) / 2) + 1;
				if (opt.type == 's') {
					$('#bd').webCalendar('initCalendar', year, month);
					$('#bd').webCalendar('getPanel').find('li:not(.befor).solar:' + (idx % 2 ? 'last' : 'first')).addClass('on').click();
				} else if (opt.type == 'v') {
					$('#bd').webCalendar('initCalendar', year, month, new Date().getFullYear() + $li.attr('from'), new Date().getFullYear() + $li.attr('to'));
					$(".vacation_exp").html($li.attr('exp'));
				}
			}
		};
		// $("body").click(function(evt){
		// 	evt.stopPropagation();
		// 	var $tip = $('div.vac_solar_layer'), isVrisible = $tip.is(':visible');
		// 	$(".vacation_exp").text('');
  //           $(".vacation_distance").hide();
		// 	if (isVisible) {
		// 		$tip.hide('fade');
		// 		$("#div_buttons a").removeClass("on");
		// 	}
		// });
		$(".return_btn").click(function(evt){
				evt.preventDefault();
				$(this).parents("div.vac_solar_layer").addClass("none");
				$('#bd').show();


		});
		if (opt.bdParam.slice(0, 4) != 'rili') {
			if(opt.bdParam=="jieqi"){
				opt.type == 's' && $elem.click();
			}
			if(opt.bdParam=="jiaqi"){
				opt.type == 'v' && $elem.click();
			}
			/*匹配日期的正则 exp:bd_param=2014-03-04*/
			var reg = /^([1-2]\d{3})[\/|\-](0?[1-9]|10|11|12)[\/|\-]([1-2]?[0-9]|0[1-9]|30|31)$/ ;ac=reg.test(opt.bdParam);
			if(ac){
				var dateArry = opt.bdParam.split("-");
                var year = dateArry[0], month = parseInt(dateArry[1],10), date = parseInt(dateArry[2],10);
                var d = new Date();
                d.setFullYear(year);
                d.setMonth(month - 1);
                d.setDate(date);
                $('#bd').webCalendar("setCalendarDate", d);
			}
		}
	}
});
function zoom(){
	var $win = $(window), $bd = $('#bd'),$yi=$('.yi'),$ji=$('.ji'),$h=$win.height(),$w=$win.width();
	// if($win.width()> $win.height()){
	// 	$("body").removeClass("smallcd").removeClass("mi").addClass("bigcd");
	// 	$yi.width(70);
	// 	$ji.width(70);
	// }else{
        $yi.width($w-60);
        $ji.width($w-60);
			
	// }
}
(function(){
	var queryJson, str;
	$.query = function(name){
		if (!queryJson) {
			queryJson = {};
			if (str = location.search.slice(1) + '&' + location.hash.slice(1)) {
				$.each(str.split('&'), function(i, s, key, value){
					s = s.split('='), key = s[0], value = s[1];
					if (key in queryJson) {
						if ($.isArray(queryJson[key])) {
							queryJson[key].push(value);
						} else {
							queryJson[key] = [queryJson[key], value];
						}
					} else {
						queryJson[key] = value;
					}
				});
			}
		}
		return queryJson[name];
	};
})();
$(function(){
	$(window).resize(function(){
		zoom();
	});
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad"; 
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsXiaomi = sUserAgent.match(/xiaomi/i) == "xiaomi";
	if(bIsXiaomi){
		$(".down_iphon").attr("href","http://d2.365rili.com/coco.apk");
	}
	
	var $detail = $('#div_day_detail'), bdParam = ($.query('bd_param') || '').toLowerCase();
	$detail.dayDetail();
	$('#bd').webCalendar({
		defDate: bdParam.slice(0, 4) == 'rili' && bdParam.indexOf("_") > -1 ? new Date(bdParam.split('_')[1], 0, 1) : void (0),
		onselect: function(d, l){
			$detail.dayDetail('init', d, l);
		}
	});
    
	$('#div_buttons a.operate_vacation').vacationLayer({
		type: 'v',
		bdParam: bdParam,
		tmplHead: '<div class="vac_solar_layer vac_layer none"><div class="vac_solar_nav"><a href="javascript:;" class="return_btn">返回</a></div><div class="vac_box"><h3>2016年公休放假安排</h3><ul class="e_clear">',
		tmplTail: '</ul></div></div>',
		tmplBody: '<li month="{month}" from="{from}" to="{to}" exp="{exp}" pinyin="{py}"><p class="name">{name}</p><p class="time">{time}</p></li>',
		data: holidayDate
	});
	$("#div_buttons a.solar_terms").vacationLayer({
		type: 's',
		bdParam: bdParam,
		tmplHead: '<div class="vac_solar_layer solar_layer none"><div class="vac_solar_nav"><a href="javascript:;" class="return_btn">返回</a></div><div class="solar_box"><h3>中国农历·二十四节气</h3><ul class="e_clear">',
		tmplTail: '</ul></div></div>',
		tmplBody: '<li idx="{INDEX}" pinyin="{py}"><p>{name}</p></li>',
		data: [{
			name: '立春',
			py: 'lichun'
		}, {
			name: '雨水',
			py: 'yushui'
		}, {
			name: '惊蛰',
			py: 'jingzhe'
		}, {
			name: '春分',
			py: 'chunfen'
		}, {
			name: '清明',
			py: 'qingming'
		}, {
			name: '谷雨',
			py: 'guyu'
		}, {
			name: '立夏',
			py: 'lixia'
		}, {
			name: '小满',
			py: 'xiaoman'
		}, {
			name: '芒种',
			py: 'mangzhong'
		}, {
			name: '夏至',
			py: 'xiazhi'
		}, {
			name: '小暑',
			py: 'xiaoshu'
		}, {
			name: '大暑',
			py: 'dashu'
		}, {
			name: '立秋',
			py: 'liqiu'
		}, {
			name: '处暑',
			py: 'chushu'
		}, {
			name: '白露',
			py: 'bailu'
		}, {
			name: '秋分',
			py: 'qiufen'
		}, {
			name: '寒露',
			py: 'hanlu'
		}, {
			name: '霜降',
			py: 'shuangjiang'
		}, {
			name: '立冬',
			py: 'lidong'
		}, {
			name: '小雪',
			py: 'xiaoxue'
		}, {
			name: '大雪',
			py: 'daxue'
		}, {
			name: '冬至',
			py: 'dongzhi'
		}, {
			name: '小寒',
			py: 'xiaohan'
		}, {
			name: '大寒',
			py: 'dahan'
		}]
	});
});

