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
		date.setDate(date.getDate() - (isSundayFirst ? day : day == 0 ? 6 : (day - 1)));
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
		
		this.panel = $elem.find('ul#calendar_list');
		this.tmplDate = '<li class="{monthClass}" date="{date}"><div class="calendar_date_box"><div class="rest_txt">休</div><div class="work_txt">班</div><div class="solar_date">{solar}</div><div class="lunar_date" title="{lunar}">{lunar}</div></div></li>';
		
		this.initCalendar(year, month);
		opt.onselect.call(self, now, lunar(now));
		self.selectedDate = now;
		this.handleClick();
		this.initDatePicker();
	},
	_showCurrentTime: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		this.timeContainer = $elem.find('div.time');
		setInterval(function(){
			var d = new Date();
			self.timeContainer.html($.padWithZero($.format('{getHours}:{getMinutes}:{getSeconds}', d)));
		}, 1000);
	},
	initCalendar: function(year, month,data){
		var self = this, $elem = $(this.element), opt = this.options;
		var d = new Date(year, month - 1, 1), c = new Calendar(d),firstDay = c.getCalendarFirstDate(true), t = this.today;
		this.year = d.getFullYear();
		this.month = d.getMonth() + 1;

		//判断一个月份需要占用几周，周首日为周日
		var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var iteratorCount = 35;
		if(d.getDay() == 6 && monthDays[d.getMonth()] >= 30)
			iteratorCount = 42;
		else if(d.getDay() == 5 && monthDays[d.getMonth() >= 31])
			iteratorCount = 42;
		var iterator = new Date(firstDay), rowsHtml = $.map(new Array(iteratorCount), function(_, i){
			var y = iterator.getFullYear(), m = iterator.getMonth(), d = iterator.getDate(), w = iterator.getDay(), l = lunar(iterator);
			var selector = [], key = 'm' + (m + 1) + 'd' + d;
			m != month - 1 && selector.push('nextbefor');
			data==d && m == month - 1&& selector.push('on');
			d == t.getDate() && m == t.getMonth() && y == t.getFullYear() && selector.push('today');
			(w == 0 || w == 6) && selector.push('weekend');
			var festival = l.festival();
			l.term ? selector.push('solar') : festival.length ? selector.push('isolar') : '';
			if (worktime[y]) {
				worktime[y]['festival'][key] && selector.push(worktime[y]['festival'][key], 'vacation');
				worktime[y]['workday'][key] && selector.push(worktime[y]['workday'][key]);
				if(m != month - 1){
					worktime[y]['festival'][key] && selector.push("before_rest");
					worktime[y]['workday'][key] && selector.push("before_work");	
				}
			}

			iterator.setDate(iterator.getDate() + 1);
			var lunarStr = festival[0] && festival[0].desc.length < 7 && festival[0].desc || l.term || l.dateIndex == 0 && (l.lMonth + '月' + (l.isBigMonth ? '大' : '小')) || l.lDate;
			return $.format(self.tmplDate, {
				monthClass: selector.join(' '),
				solar: d,
				lunar: lunarStr,
				date: [y, m + 1, d].join('/')
			});
		});
		this.panel.html(rowsHtml);
		data && self.festivalClick(this.panel.find("li.on"));
		if(iteratorCount == 35){
			this.panel.removeClass("calendar_list").addClass("grid_five");
		}else{
			this.panel.removeClass("grid_five").addClass("calendar_list");
		}
		var yearMonthStr = year + ('0' + month).slice(-2);
		if(festivalRestData[yearMonthStr]){
			$(".vacation_txt").html(festivalRestData[yearMonthStr]);
		}else{
			$(".vacation_txt").html('数据来源：<a href="http://www.365rili.com" target="_blank">365日历</a>');
		}
	},
	setCalendarDate: function(date){
		var self = this, $elem = $(this.element), opt = this.options;
		var year  = date.getFullYear();
		var month = date.getMonth() + 1;
		var d  =  date.getDate();
		self.initCalendar(year, month);
		var strDate = [year, month, d].join("/");
		self.panel.find('li[date="' + strDate + '"]').click();
		self.dltYear.fakeSelect('setValue', year);
		self.dltMonth.fakeSelect('setValue', month);
		self.dltFestival.fakeSelect('setValue', year + ('0' + month).slice(-2));
	},
	handleClick: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		$('li', self.panel).live('click', function(){
			self.panel.find('li.on').removeClass('on');
			var $li = $(this), strDate = $li.attr('date'), d = new Date(strDate), year = d.getFullYear(), month = d.getMonth() + 1;
			if(!$li.hasClass("today"))
				$li.addClass('on');
			self.selectedDate = d;
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
	festivalClick: function($li){
		var self = this, $elem = $(this.element), opt = this.options;
		var strDate = $li.attr('date'), d = new Date(strDate);
		opt.onselect.call(self, d, lunar(d));
			
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
			var strDate = [year, month, self.selectedDate.getDate()].join("/");
			self.panel.find('li[date="' + strDate + '"]').click();
			self.dltFestival.fakeSelect('setValue', val);
		};
		var festivalChange = function(val){
			var year = val.slice(0, 4) - 0, month = val.slice(4,6) - 0,data=val.slice(-2) - 0;
			self.initCalendar(year, month, data);			
			// var strDate = festivalDate[val];
			// self.panel.find('li[date="' + strDate + '"]').click();
			self.dltYear.fakeSelect('setValue', year);
			self.dltMonth.fakeSelect('setValue', month);
		};
		
		this.dltYear = $elem.find('div.y_select').fakeSelect({
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
		this.dltMonth = $elem.find('div.m_select').fakeSelect({
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
		function parseDate (d) {
			d = d.split('_');
			d[1] = d[1] < 10 ? '0' + d[1] : d[1];
			d[2] = d[2] < 10 ? '0' + d[2] : d[2];
			return d.join('')
		}
		this.dltFestival = $elem.find('div.vacation_btn').fakeSelect({
			name: 'festival',
			onchange: festivalChange,
			title:"假日",
			data: [{
				value: parseDate(festivalData['yuandan']),
				text: '元旦'
			}, {
				value: parseDate(festivalData['chunjie']),
				text: '春节'
			}, {
				value: parseDate(festivalData['qingmingjie']),
				text: '清明节'
			}, {
				value: parseDate(festivalData['laodong']),
				text: '劳动节'
			}, {
				value: parseDate(festivalData['duanwu']),
				text: '端午节'
			}, {
				value: parseDate(festivalData['zhongqiu']),
				text: '中秋节'
			}, {
				value: parseDate(festivalData['guoqing']),
				text: '国庆节'
			}]
		});
		
		this.btnToday = $elem.find('a.today_btn').click(function(evt){
			evt.preventDefault();
			self.dltYear.fakeSelect('setValue', self.today.getFullYear());
			self.dltMonth.fakeSelect('setValue', self.today.getMonth() + 1);
			self.dltMonth.fakeSelect('triggerChange');
			self.panel.find('li.today').click();
		});
		
		$elem.find(".next").click(function(evt){
			var year  = parseInt(self.dltYear.fakeSelect('getValue'));
			var month = parseInt(self.dltMonth.fakeSelect('getValue'));
			month++;
			if(month > 12){
				year ++;
				month = 1;
			}
			self.initCalendar(year, month);
			self.dltYear.fakeSelect('setValue', year);
			self.dltMonth.fakeSelect('setValue', month);
			var yearMonthStr = year + ('0' + month).slice(-2);
			self.dltFestival.fakeSelect("setValue", yearMonthStr);
		});
		
		$elem.find(".prve").click(function(evt){
			var year  = parseInt(self.dltYear.fakeSelect('getValue'));
			var month = parseInt(self.dltMonth.fakeSelect('getValue'));
			month--;
			if(month < 1){
				year --;
				month = 12;
			}
			self.initCalendar(year, month);
			self.dltYear.fakeSelect('setValue', year);
			self.dltMonth.fakeSelect('setValue', month);
			var yearMonthStr = year + ('0' + month).slice(-2);
			self.dltFestival.fakeSelect("setValue", yearMonthStr);
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
			this.header.mousedown(function(){
				$(this).addClass('active');
			});
			this.header.mouseup(function(){
				$(this).removeClass('active');
			});
			
			this.header.mousedown(function(){
				self.opts.removeClass('active');
				$(this).addClass('active');
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
			if(opt.title){
				self.header.html(opt.title);
			}
			
			//$selected.triggerHandler('click');
			
			$('body').click(function(evt){
				if (!self.cont.find(evt.target).size()) {
					self.list.hide();
					self.cont.find(".scroll_box").hide();
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
				//this.setValue('');
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
		this.tmpl = '<div class="almanac_solar_info">{year}年{padmonth}月{paddate}日 {week}</div><div class="alm_content{nofestival}">{istoday}\
		<div class="almanac_date">{date}</div><div class="almanac_lunar_info"><p>{gzyear}年 【{animal}年】 {lmonth}月{ldate}</p><p class="attribution">{gzmonth}月 {gzdate}日</p></div>\
		<div class="almanac_txt"><p class="yi almanac_p"></p><p class="ji almanac_p"></p>\
		<div class="almanc_layer"><h3>{year}年{padmonth}月{paddate}日<span>{lmonth}月{ldate}</span></h3>\
			<div class="almanc_layer_content">\
			<div class="almanc_layer_yi e_clear">\
			<div class="yi_icon">宜</div>\
			<div class="yi_txt"></div></div>\
			<div class="almanc_layer_ji e_clear">\
			<div class="ji_icon">忌</div>\
			<div class="ji_txt"></div>\
		</div></div></div></div></div>';
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
		
		$elem.find(".almanac_p").mouseover(function(){
			$elem.find(".almanc_layer").show();
		}).mouseout(function(){
			$elem.find(".almanc_layer").hide();
		});
		
	},
	loadLuckyData: function(y, m, d){
		var self = this, $elem = $(this.element), opt = this.options;
		var strDate = 'd' + ('0' + m).slice(-2) + ('0' + d).slice(-2)
		if (window.HuangLi && HuangLi['y' + y]) {
			this.fillLuckyData(HuangLi['y' + y][strDate]);
		} else if (y > 2007 && y < 2021) {
			$.getScript('/js/huangli/hl' + y + '.js', function(){
				self.fillLuckyData(HuangLi['y' + y][strDate]);
			});
		} else {
			this.fillLuckyData({
				'y': '',
				'j': '',
				
			});
		}
	},
	fillLuckyData: function(data){
		var self = this, $elem = $(this.element), opt = this.options;
		var y = data.y.replace(/^\.|\.$/g, '').split('.'), j = data.j.replace(/^\.|\.$/g, '').split('.');
		$elem.find('p.yi').html("宜： " + dealString(y, true));
		$elem.find('p.ji').html("忌： " + dealString(j, true));
		$elem.find(".yi_txt").html(dealString(y, false));
		$elem.find(".ji_txt").html(dealString(j, false));
		if(y==""){
			$(".yi_icon").hide();
			$(".yi").hide();
		}else if(j==""){
			$(".ji_icon").hide();
			$(".ji").hide();
		}
	}
});

function dealString(ar, slice){
	ar = ar.sort(function(a, b){
		return a.length - b.length;
	});
	var arResult = [];
	$.each(ar, function(i, s){
		arResult.push("<span>" + s + "</span>");
	});
	if(slice)
		return arResult.slice(0, 4).join('');
	else
		return arResult.join('');
}

var festivalRestData = {};
festivalRestData[globalData.targetYear + "01"] = fangjiaData['yuandan'];
festivalRestData[globalData.targetYear + "02"] = fangjiaData['chunjie'];
festivalRestData[globalData.targetYear + "04"] = fangjiaData['qingmingjie'];
festivalRestData[globalData.targetYear + "05"] = fangjiaData['laodong'];
festivalRestData[globalData.targetYear + "06"] = fangjiaData['duanwu'];
festivalRestData[globalData.targetYear + "09"] = fangjiaData['zhongqiu'];
festivalRestData[globalData.targetYear + "10"] = fangjiaData['guoqing'];

// var festivalDate = {
// 	 "201601":"2013/1/1",
// 	 "201602":"2013/2/1",
// 	 "201604":"2013/4/5",
// 	 "201605":"2013/5/1",
// 	 "201606":"2013/6/2",
// 	 "201609":"2013/9/8",
// 	 "201610":"2013/10/1"
// };
$(function(){
	var $detail = $('#calendar_almanac');
	$detail.dayDetail();
	$('#calendar_container').webCalendar({
		onselect: function(d, l){
			$detail.dayDetail('init', d, l);
		}
	});
	triggerFestival();
	
});

function triggerFestival(){
    var value = getURLParameter("so_param");
    if (value) {
        if (value == "yuandan") {
            $("#festival_select li[val='20140101']").click();
        }
        else 
            if (value == "chunjie") {
                $("#festival_select li[val='20140201']").click();
            }
            else 
                if (value == "qingming") {
                    $("#festival_select li[val='20140405']").click();
                }
                else 
                    if (value == "laodong") {
                        $("#festival_select li[val='20140501']").click();
                    }
                    else 
                        if (value == "duanwu") {
                            $("#festival_select li[val='20140602']").click();
                        }
                        else 
                            if (value == "zhongqiu") {
                                $("#festival_select li[val='20140908']").click();
                            }
                            else 
                                if (value == "guoqing") {
                                    $("#festival_select li[val='20141001']").click();
                                }
                                else 
                                    if (value == "rili_2012") {
                                        var d = new Date();
                                        d.setFullYear(2012);
                                        d.setMonth(0);
                                        d.setDate(1);
                                        $('#calendar_container').webCalendar("setCalendarDate", d);
                                    }
                                    else 
                                        if (value == "rili_2014") {
                                            var d = new Date();
                                            d.setFullYear(2014);
                                            d.setMonth(0);
                                            d.setDate(1);
                                            $('#calendar_container').webCalendar("setCalendarDate", d);
                                            
                                        }
                                        else {
                                            var dateArry = value.split("-");
                                            var year = dateArry[0], month = dateArry[1], date = dateArry[2];
                                            
                                            if (month[0] == 0) {
                                                month = parseInt(month[1]);
                                            }
                                            else {
                                                month = parseInt(month);
                                            }
                                            if (date[0] == 0) {
                                                date = parseInt(date[1]);
                                            }
                                            else {
                                                date = parseInt(date);
                                            }
                                            var d = new Date();
                                            d.setFullYear(year);
                                            d.setMonth(month - 1);
                                            d.setDate(date);
                                            $('#calendar_container').webCalendar("setCalendarDate", d);
                                        }
    }
    else {
        return;
    }
}


function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}



