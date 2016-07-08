(function(){
	var rRoute, rFormat;
	/**
	 * 在一个对象中查询指定路径代表的值，找不到时返回undefined
	 * @param {Object} obj 被路由的对象
	 * @param {Object} path 路径
	 */
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
	/**
	 * 格式化一个字符串
	 */
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

/**
 * 日历类
 * @param {Object} date
 */
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
		date.setDate(date.getDate() - (isSundayFirst ? day : day == 0 ? -6 : (day - 1)));
		return date;
	}
};
$.widget('meixx.webCalendar', {
	options: {
		onselect: $.noop
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var now = this.today = new Date(), year = now.getFullYear(), month = now.getMonth() + 1;
		
		this.panel = $elem.find('ul.js-cld-panel');
		this.tmplDate = '<li class="{monthClass}" date="{date}"><span class="border"></span><div class="solar_date">{solar}</div><div class="lunar_date">{lunar}</div></li>';
		
		this._showCurrentTime();
		this.initCalendar(year, month);
		opt.onselect.call(self, now, lunar(now));
		this.handleClick();
		this.initDatePicker();
	},
	_showCurrentTime: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		this.timeContainer = $elem.find('div.time');
		setInterval(function(){
			var d = new Date();
      var tzo = d.getTimezoneOffset();
      var tzn = Math.floor(Math.abs(tzo/60));
      var tzs = tzo > 0 ? ("西"+tzn) : tzo < 0 ? ("东"+tzn) : "零时";
      var tzd = tzo - (-480);
      var tzds = tzd > 0 ? ("早" + (Math.floor(Math.abs(tzd/60)*2)/2)) : ("晚" + (Math.floor(Math.abs(tzd/60)*2)/2));
      if(tzd){
        self.timeContainer.addClass("notbj")
        self.timeContainer.attr("title","您所在的时区为" + tzs + "区（如果您的时区设置了夏时制，则要相应调整一个时区），该时区比北京时间"+tzds+"小时");
      }
			self.timeContainer.html($.padWithZero($.format('{getHours}:{getMinutes}:{getSeconds}', d)));
		}, 1000);
	},
	initCalendar: function(year, month){
		var self = this, $elem = $(this.element), opt = this.options;
		var d = new Date(year, month - 1, 1), c = new Calendar(d), firstDay = c.getCalendarFirstDate(true), t = this.today;
		this.year = d.getFullYear();
		this.month = d.getMonth() + 1;
		
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
		//2015年放假安排
		var festival2015 = {}, workday2015 = {};
		$.each('m1d1 m1d2 m1d3 m2d18 m2d19 m2d20 m2d21 m2d22 m2d23 m2d24 m4d4 m4d5 m4d6 m5d1 m5d2 m5d3 m6d20 m6d21 m6d22 m9d26 m9d27 m9d3 m9d4 m9d5 m10d1 m10d2 m10d3 m10d4 m10d5 m10d6 m10d7'.split(' '), function(_, key){
			festival2015[key] = 'rest';
		});
		
		$.each('m1d4 m2d15 m2d28 m9d6 m10d10'.split(' '), function(_, key){
			workday2015[key] = 'work';
		});

		var iterator = new Date(firstDay), rowsHtml = $.map(new Array(42), function(_, i){
			var y = iterator.getFullYear(), m = iterator.getMonth(), d = iterator.getDate(), w = iterator.getDay(), l = lunar(iterator);
			var selector = [], key = 'm' + (m + 1) + 'd' + d;
			m != month - 1 && selector.push('nextbefor');
			d == t.getDate() && m == t.getMonth() && y == t.getFullYear() && selector.push('today');
			(w == 0 || w == 6) && selector.push('weekend');
			var festival = l.festival();
			l.term ? selector.push('solar') : festival.length ? selector.push('isolar') : '';
			if (y == 2014) {
				festival2014[key] && selector.push(festival2014[key], 'vacation');
				workday2014[key] && selector.push(workday2014[key]);
			}
			if (y == 2015) {
				festival2015[key] && selector.push(festival2015[key], 'vacation');
				workday2015[key] && selector.push(workday2015[key]);
			}

			iterator.setDate(iterator.getDate() + 1);
			return $.format(self.tmplDate, {
				monthClass: selector.join(' '),
				solar: d,
				lunar: festival[0] && festival[0].desc.length < 7 && festival[0].desc || l.term || l.dateIndex == 0 && (l.lMonth + '月' + (l.isBigMonth ? '大' : '小')) || l.lDate,
				date: [y, m + 1, d].join('/')
			});
		});
		this.panel.html(rowsHtml);
	},
	handleClick: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		$('li', self.panel).live('click', function(){
			self.panel.find('li.on').removeClass('on');
			self.panel.find('li.reston').removeClass('reston').addClass('rest');
			self.panel.find('li.workon').removeClass('workon').addClass('work');
			var $li = $(this).addClass('on'), strDate = $li.attr('date'), d = new Date(strDate), year = d.getFullYear(), month = d.getMonth() + 1;
			if (month != self.month || year != self.year && self.dltYear.fakeSelect('hasValue', year)) {
				self.dltYear.fakeSelect('setValue', year);
				self.dltMonth.fakeSelect('setValue', month);
				self.dltMonth.fakeSelect('triggerChange');
				self.panel.find('li[date="' + strDate + '"]').click();
			} else {
				opt.onselect.call(self, d, lunar(d));
			}
		});
	},
	initDatePicker: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		
		var yearMonthChange = function(val){
			var year, month;
			if (this.name == 'year') {
				year = val;
				month = self.dltMonth.fakeSelect('getValue');
				val += ('0' + month).slice(-2);
			} else {
				year = self.dltYear.fakeSelect('getValue');
				month = val
				val = year + ('0' + month).slice(-2);
			}
			self.initCalendar(year, month);
			self.dltFestival.fakeSelect('setValue', val);
		};
		var festivalChange = function(val){
			var year = val.slice(0, 4) - 0, month = val.slice(-2) - 0;
			self.initCalendar(year, month);
			self.dltYear.fakeSelect('setValue', year);
			self.dltMonth.fakeSelect('setValue', month);
		};
		
		this.dltYear = $elem.find('div.select_year').fakeSelect({
			name: 'year',
			value: this.today.getFullYear(),
			onchange: yearMonthChange,
			data: $.map(new Array(2100 - 1900), function(_, i){
				var year = 1901 + i;
				return {
					value: year,
					text: year + '年'
				}
			})
		});
		this.dltMonth = $elem.find('div.select_month').fakeSelect({
			name: 'month',
			value: this.today.getMonth() + 1,
			onchange: yearMonthChange,
			circle: true,
			data: $.map(new Array(12), function(_, i){
				var month = i + 1;
				return {
					value: month,
					text: month + '月'
				}
			})
		});
		this.dltFestival = $elem.find('div.select_day').fakeSelect({
			name: 'festival',
			onchange: festivalChange,
			data: [{
				value: '',
				text: '假日安排'
			}, {
				value: '201501',
				text: '元旦'
			}, {
				value: '201502',
				text: '春节'
			}, {
				value: '201504',
				text: '清明节'
			}, {
				value: '201505',
				text: '劳动节'
			}, {
				value: '201506',
				text: '端午节'
			}, {
				value: '201509',
				text: '中秋节'
			}, {
				value: '201510',
				text: '国庆节'
			}]
		});
		
		this.btnToday = $elem.find('a.return_today_btn').click(function(evt){
			evt.preventDefault();
			self.dltYear.fakeSelect('setValue', self.today.getFullYear());
			self.dltMonth.fakeSelect('setValue', self.today.getMonth() + 1);
			self.dltMonth.fakeSelect('triggerChange');
			self.panel.find('li.today').click();
		});
	}
});

(function(){
	$.widget('meixx.fakeSelect', {
		options: {
			data: [],
			onchange: $.noop,
			value: '',
			circle: false
		},
		_create: function(){
			var self = this, $elem = $(this.element), opt = this.options;
			
			this.name = opt.name;
			this.prev = $elem.find('a.left_arrow');
			this.next = $elem.find('a.right_arrow');
			this.cont = $elem.find('div.dropselectbox');
			this.header = $elem.find('h4');
			this.list = this.cont.find('ul');
			
			this.list.html($.format('<li val="{value}">{text}</li>', opt.data));
			
			this.opts = this.list.find('li');
			
			this.header.click(function(){
				self.list.toggle();
				if (self.list.is(':visible')) {
					var value = self.header.attr('val') || '', $selected = self.opts.removeClass('on').filter('[val="' + value + '"]').addClass('on');
					$selected.size() && self.list.scrollTop($selected.prop('offsetTop') - 51);
				}
			});
			
			this.opts.mouseenter(function(){
				self.opts.removeClass('on');
				$(this).addClass('on');
			}).click(function(evt){
				self.list.hide();
				var $li = $(this).addClass('on'), val = $li.attr('val'), text = $li.text(), oldVal = self.header.attr('val');
				if (oldVal != val) {
					self.header.html(text).attr('val', val);
					val && opt.onchange.call(self, val, oldVal);
				}
			});
			
			if (this.prev.size()) {
				this.prev.add(this.next).click(function(evt){
					evt.preventDefault();
					var $lnk = $(this), val = self.header.attr('val') || '', $selected = self.opts.filter('[val="' + val + '"]');
					if ($selected.size()) {
						$selected = $selected[$lnk.attr('method')]();
						if ($selected.size()) {
							$selected.triggerHandler('click');
						}
					}
				});
			}
			var $selected = self.opts.filter('[val="' + opt.value + '"]');
			self.header.html($selected.text()).attr('val', $selected.attr('val'));
			//$selected.triggerHandler('click');
			
			$('body').click(function(evt){
				if (!self.cont.find(evt.target).size()) {
					self.list.hide();
				}
			});
		},
		hasValue: function(value){
			var self = this, $elem = $(this.element), opt = this.options;
			var $selected = self.opts.filter('[val="' + value + '"]');
			return $selected.size() ? $selected : null;
		},
		setValue: function(value){
			var self = this, $elem = $(this.element), opt = this.options;
			var $selected = this.hasValue(value);
			if ($selected) {
				this.header.attr('val', value).text($selected.text());
			} else {
				this.setValue('');
			}
		},
		getValue: function(){
			return this.header.attr('val');
		},
		triggerChange: function(){
			this.options.onchange.call(this, this.header.attr('val'), '');
		}
	});
})();

$.widget('meixx.dayDetail', {
	options: {},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		this.tmpl = '<div class="alm_date">{year}年{padmonth}月{paddate}日 {week}</div><div class="alm_content{nofestival}">{istoday}\
		<div class="today_date">{date}</div><p>农历{lmonth}月{ldate}</p><p>{gzyear}年 {gzmonth}月 {gzdate}日</p><p>【{animal}年】</p>\
		<div class="alm_lunar_date">{festival}</div>\
		<div class="yj_box"><div class="yi"></div><div class="ji"></div></div></div>';
	},
	init: function(date, l){
		var self = this, $elem = $(this.element), opt = this.options;
		var y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate(), now = new Date(), fes = l.festival();
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
			nofestival: fes.length || l.term ? '' : ' nofestival',
			festival: fes.length && $.trim($.format('{desc} ', fes)) || l.term || '',
			gzyear: l.gzYear,
			gzmonth: l.gzMonth,
			gzdate: l.gzDate
		}));
		this.loadLuckyData(y, m, d);
	},
	loadLuckyData: function(y, m, d){
		var self = this, $elem = $(this.element), opt = this.options;
		var strDate = 'd' + ('0' + m).slice(-2) + ('0' + d).slice(-2)
		if (window.HuangLi && HuangLi['y' + y]) {
			this.fillLuckyData(HuangLi['y' + y][strDate]);
		} else if (y > 2007 && y < 2021) {
			$.getScript('/resource/erji/rili/js/hl' + y + '.js', function(){
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
		if (s.length > 3) {
			arRslt.push(s);
		} else {
			if (!arRslt.length || arRslt[arRslt.length - 1].length > 3) {
				arRslt.push(s);
			} else {
				arRslt[arRslt.length - 1] += '&nbsp;&nbsp;' + s
			}
		}
		if (arRslt.length > 4) {
			return false;
		}
	});
	return arRslt.slice(0, 4).join('<br>');
}

$(function(){
	var $detail = $('#div_day_detail');
	$detail.dayDetail();
	$('#bd').webCalendar({
		onselect: function(d, l){
			$detail.dayDetail('init', d, l);
		}
	});
});
