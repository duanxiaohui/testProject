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
var holidayDate=[{
			name: '元旦',
			time: '1月1日',
			month: 1,
			py: 'yuandan',
			exp: '1月1日放假。',
			from: '/1/1',
			to: '/1/1'
		}, {
			name: '春节',
			time: '1月31日~2月6日',
			month: 2,
			py: 'chunjie',
			exp: '1月31日~2月6日放假，2月7日、2月8日（周六）上班。',
			from: '/1/31',
			to: '/2/6'
		}, {
			name: '清明节',
			time: '4月5日~7日',
			month: 4,
			py: 'qingmingjie',
			exp: '4月5日~7日放假。',
			from: '/4/5',
			to: '/4/7'
		}, {
			name: '劳动节',
			time: '5月1日~5月3日',
			month: 5,
			py: 'laodong',
			exp: '5月1日~5月3日放假。',
			from: '/5/1',
			to: '/5/3'
		}, {
			name: '端午节',
			time: '5月31日~6月2日',
			month: 6,
			py: 'duanwu',
			exp: '5月31日~6月2日放假。',
			from: '/5/31',
			to: '/6/2'
		}, {
			name: '中秋节',
			time: '9月6日~9月8日',
			month: 9,
			py: 'zhongqiu',
			exp: '9月6日~8日放假。',
			from: '/9/6',
			to: '/9/8'
		}, {
			name: '国庆节',
			time: '10月1日~10月7日',
			month: 10,
			py: 'guoqing',
			exp: '10月1日~7日放假，10月8日~10月11日上班。',
			from: '/10/1',
			to: '/10/7'
		}];

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
		var festival2013 = {}, workday2013 = {};
		$.each('m1d1 m1d2 m1d3 m2d9 m2d10 m2d11 m2d12 m2d13 m2d14 m2d15 m4d4 m4d5 m4d6 m4d29 m4d30 m5d1 m6d10 m6d11 m6d12 m9d19 m9d20 m9d21 m10d1 m10d2 m10d3 m10d4 m10d5 m10d6 m10d7'.split(' '), function(_, key){
			festival2013[key] = 'rest';
		});
		$.each('m1d5 m1d6 m2d16 m2d17 m4d7 m4d27 m4d28 m6d8 m6d9 m9d22 m9d29 m10d12'.split(' '), function(_, key){
			workday2013[key] = 'work';
		});
		var festival2014 = {}, workday2014 = {};
        self.nextFestival = null;
        var today = new Date(year, month - 1, data);
		$.each('m1d1 m1d31 m2d1 m2d2 m2d3 m2d4 m2d5 m2d6 m4d5 m4d6 m4d7 m5d1 m5d2 m5d3 m5d31 m6d1 m6d2 m9d6 m9d7 m9d8 m10d1 m10d2 m10d3 m10d4 m10d5 m10d6 m10d7'.split(' '), function(_, key){
			festival2014[key] = 'rest';
		});
		$.each('m1d1 m1d31 m4d5 m5d1 m5d31 m9d6 m10d1'.split(' '), function(_, key){
            var festivalDate=new Date();
            var temp = key.split('d');
            var m = temp[0].substr(1);
            var d = temp[1];
            festivalDate.setMonth(m-1,d);
            if(festivalDate > today && !self.nextFestival ){
                console.log(key);
                self.nextFestival = festivalDate;
            }
		});
		$.each('m1d26 m2d8 m5d4 m9d28 m10d11'.split(' '), function(_, key){
			workday2014[key] = 'work';
		});
		var iterator = new Date(firstDay), rowsHtml = $.map(new Array(42), function(_, i){
			var y = iterator.getFullYear(), m = iterator.getMonth(), d = iterator.getDate(), w = iterator.getDay(), l = lunar(iterator);
			var selector = [], key = 'm' + (m + 1) + 'd' + d, festival = l.festival(), isVoc = false;
			if (y == 2014) {
				if (vocFrom) {
					if (+iterator >= +vocFrom && +iterator <= +vocTo) {
						festival2014[key] && (isVoc = true) && selector.push(festival2014[key], 'vacation');
						workday2014[key] && (isVoc = true) && selector.push(workday2014[key]);
					}
					if (!isVoc) {
						selector.push('befor');
					}
				} else {
					festival2014[key] && selector.push(festival2014[key], 'vacation');
					workday2014[key] && selector.push(workday2014[key]);
					data==d && m == month - 1&& selector.push('on');
					m != self.month - 1 && selector.push('befor');
					d == t.getDate() && m == t.getMonth() && y == t.getFullYear() && selector.push('today');
					(w == 0 || w == 6) && selector.push('weekend');
					l.term ? selector.push('solar') : festival.length ? selector.push('isolar') : '';
				}
			} else {
				data==d && m == month - 1&& selector.push('on');
				m != self.month - 1 && selector.push('befor');
				d == t.getDate() && m == t.getMonth() && y == t.getFullYear() && selector.push('today');
				(w == 0 || w == 6) && selector.push('weekend');
				l.term ? selector.push('solar') : festival.length ? selector.push('isolar') : '';
			}
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
        
        if(year==2014){
            $(".vacation_distance").show();
            var _name = instance.getNameByDay(self.nextFestival);
            var days =parseInt((self.nextFestival.getTime()-date.getTime())/86400000);
            $(".vacation_distance").html("距离"+_name+"放假还有"+"<span class='txt_day'>"+days+"</span>"+"天");
        }
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
		</div><div class="yj_box e_clear"><div class="yi"></div><div class="ji"></div></div>';
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
			$.getScript('http://baidu365.duapp.com/wannianlibaidu/js/huangli/hl' + y + '.js', function(){
				self.fillLuckyData(HuangLi['y' + y][strDate]);
			});
		} else {
			this.fillLuckyData({
				'y': '',
				'j': ''
			});
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
		$elem.append(opt.tmplHead + $.format(opt.tmplBody, opt.data) + opt.tmplTail);
		$elem.click(function(evt){
			evt.preventDefault();
			evt.stopPropagation();
			var $tip = $('div.vac_solar_layer', this), isVisible = $tip.is(':visible');
			$('#div_buttons div.vac_solar_layer').not($tip).hide().parent().removeClass('on');
			$tip[isVisible ? 'hide' : 'show']('fade').parent()[isVisible ? 'removeClass' : 'addClass']('on');
		});
		$elem.find('li').click(function(evt){
			evt.stopPropagation();
			var $li = $(this), year = opt.type == 'v' ? 2014 : ($('#bd').webCalendar('getYear') - ($('#bd').webCalendar('getMonth') == 1 ? 1 : 0)), idx = $li.attr('idx') - 0;
			var month = opt.type == 'v' ? $li.attr('month') - 0 : Math.ceil((idx + 1) / 2) + 1;
			$elem.find('div.vac_solar_layer').hide();
			$elem.removeClass("on");
			if (opt.type == 's') {
				$('#bd').webCalendar('initCalendar', year, month);
				$('#bd').webCalendar('getPanel').find('li:not(.befor).solar:' + (idx % 2 ? 'last' : 'first')).addClass('on').click();
			} else if (opt.type == 'v') {
				$('#bd').webCalendar('initCalendar', year, month, '2014' + $li.attr('from'), '2014' + $li.attr('to'));
				$(".vacation_exp").html($li.attr('exp'));
			}
		});
		$("body").click(function(evt){
			evt.stopPropagation();
			var $tip = $('div.vac_solar_layer', this), isVisible = $tip.is(':visible');
			$(".vacation_exp").text('');
            $(".vacation_distance").hide();
			if (isVisible) {
				$tip.hide('fade');
				$("#div_buttons a").removeClass("on");
			}
		});
		if (opt.bdParam.slice(0, 4) != 'rili') {
			if(opt.bdParam=="jieqi"){
				opt.type == 's' && $elem.click();
			}
			if(opt.bdParam=="jiaqi"){
				opt.type == 'v' && $elem.click();
			}
			var reg = /^([1-2]\d{3})[\/|\-](0?[1-9]|10|11|12)[\/|\-]([1-2]?[0-9]|0[1-9]|30|31)$/ ;ac=reg.test(opt.bdParam);
			if(ac){
				var dateArry = opt.bdParam.split("-");
                var year = dateArry[0], month = parseInt(dateArry[1],10), date = parseInt(dateArry[2],10);
                var d = new Date();
                d.setFullYear(year);
                d.setMonth(month - 1);
                d.setDate(date);
                $('#bd').webCalendar("setCalendarDate", d);
			}else{
				$elem.find('div.vac_solar_layer li[pinyin="' + opt.bdParam + '"]').click();
			}
		}
	}
});
function zoom(){
	var $win = $(window), $bd = $('#bd'),$yi=$('.yi'),$ji=$('.ji'),$h=$win.height(),$w=$win.width();
	if($win.width()> $win.height()){
		$bd.removeClass("smallcd").removeClass("mi").addClass("bigcd");
		$yi.width(70);
		$ji.width(70);
	}else{
		$bd.removeClass("bigcd").addClass("smallcd");
		var smbg = $('.smallcd').find(".calendar_bg").width(), smct = $('.smallcd').find(".alm_content").width(),yjw;
        $yi.width($w-50);
        $ji.width($w-50);
			
	}
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
    zoom();
    
	$('#div_buttons a.operate_vacation').vacationLayer({
		type: 'v',
		bdParam: bdParam,
		tmplHead: '<div class="vac_solar_layer vac_layer none"><div class="arror_top"></div><h3>2014年公休放假安排</h3><ul class="e_clear">',
		tmplTail: '</ul></div>',
		tmplBody: '<li month="{month}" from="{from}" to="{to}" exp="{exp}" pinyin="{py}"><p class="name">{name}</p><p class="time">{time}</p></li>',
		data: holidayDate
	});
	$("#div_buttons a.solar_terms").vacationLayer({
		type: 's',
		bdParam: bdParam,
		tmplHead: '<div class="vac_solar_layer solar_layer none"><div class="arror_top"></div><h3>中国农历·二十四节气</h3><ul class="e_clear">',
		tmplTail: '</ul></div>',
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

