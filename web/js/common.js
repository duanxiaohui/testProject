/*======================一些公共的方法========================*/
$.dom = function(elementId) {
    return document.getElementById(elementId);
};

function escapeHTML(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

//设置stringBuffer
function StringBuffer() {
    this._strings = new Array();
};

StringBuffer.prototype.append = function(str) {
    this._strings.push(str);
    return this;
};

StringBuffer.prototype.toString = function() {
    var str = arguments.length == 0 ? '' : arguments[0];
    return this._strings.join(str);
};

String.prototype.leftpad = function(len, str) {
    if (!str) {
        str = '0';
    }

    var s = '';
    for (var i = 0; i < len - this.length; i++) {
        s += str;
    }
    return s + this;
};

String.prototype.htmlspecialchars = function(){
	//return this.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&acute;").replace(/&/g, "&amp;");
	return this;
}

function getMonthKey(year, month) { // 传入的month为0-11的数值
    return year.toString() + (month + 1).toString().leftpad(2) // 返回yyyyMM格式的字符串
}

function getDateKey(date) {
    return date.getFullYear().toString() +"-"+(date.getMonth() + 1).toString().leftpad(2)+"-"+date.getDate().toString().leftpad(2) // 返回yyyy-MM-dd格式的字符串
}
function is_leap_year(cur_year){
	 if(cur_year % 400 == 0 || (cur_year % 100 !=0 && cur_year % 4 == 0)) return 1;
	 return 0;
}

function getDaysByMonth(date){
	var days = [[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	            [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];
	return days[is_leap_year(date.getFullYear())][date.getMonth()];
}

function dateDiff(now, date){
	var diff = dateDiffDays(now, date);
	if(diff == 0) return "今天";
	else if(diff < 0) return (0-diff) + "天前";
	else return diff + "天后";
}

function dateDiffDays(now, date){
	var n = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	var diff = parseInt((d - n)/(24 * 60 * 60 * 1000));
	return diff;
}
  
/*==========================utils.js========================*/
var utils = {
    getEvent : function(ev) {
        return window.event ? window.event : (ev ? ev : null);
    },
    getMousePosition : function(ev) {
        var evt = this.getEvent(ev);
        if (evt.pageX || evt.pageY) {
            return {
                x : evt.pageX,
                y : evt.pageY
            };
        }
        return {
            x : evt.clientX + document.documentElement.scrollLeft
            - document.documentElement.clientLeft,
            y : evt.clientY + document.documentElement.scrollTop
            - document.documentElement.clientTop
        };
    },
    getClientWidth : function() {
        return $.browser.msie ? ieBody.clientWidth : window.innerWidth;
    },
    getClientHeight : function() {
        return $.browser.msie ? ieBody.clientHeight : window.innerHeight;
    },
	getRandomColor : function() {
		/*
		 * 
		 * getRandomColor 从colors数组获取随机颜色
		 * 
		 * @return 对象,index:索引,value:颜色代码
		 * 
		 */
		var index = Math.round(Math.random() * (colors.length - 1));
		return {
			index : index,
			value : colors[index]
		};
	},
    /*
     * obj : DOM element
     */
    getOffsetXY : function(obj, parentId) {
        /*
         *
         * getOffsetXY 获取相对坐标
         *
         * @param obj id或者dom对象 @param parentId 父级id，如果不提供则为body
         *
         * @return 坐标对象，x、y
         *
         */
//        var element;
//        if (typeof obj == 'object') {
//            element = obj;
//        } else {
//            element = document.getElementById(obj);
//        }
//        var element_X = element.offsetLeft;
//        var element_Y = element.offsetTop;
//        while (true) {
//            if ((!element.offsetParent) || (!element.offsetParent.style)
//            || (!!parentId && element.offsetParent.id == parentId)) {
//                break;
//            }
//            element_X += element.offsetParent.offsetLeft;
//            element_Y += element.offsetParent.offsetTop;
//            element = element.offsetParent;
//        }
//        element_X = element_X - document.body.scrollLeft;
//        element_Y = element_Y - document.body.scrollTop;
//
//        return {
//            x : element_X,
//            y : element_Y
//        };
        var pos= {};
        if(parentId) {
            pos = $(obj).position();
            return {
                x : pos.left,
                y : pos.top
            };
        }
        pos = $(obj).offset();
        return {
            x : pos.left,
            y : pos.top
        };
    },
	hideDialog:function(id){
		for(var i=0;i<id.length;i++)
		{
			$("#"+id[i]).hide();
			$(document).unbind("mousedown."+id[i]);
		}
	},
    mousedown_hide_ele : function(id,parent_id,descard_id) {   // 实现鼠标点击其他地方，关闭对话框，

        $(document).bind("mousedown."+id, function(r) {
            var p = r.target;
            var q = document.getElementById(id);
            while (true) {
                if (p == q) {
                    return true;
                } else {
                    try {
                        if (p.id == parent_id) {     // 此处需要修改，有的情况下会出现脚本停止响应的现象(p == document)
                            $(document).unbind("mousedown."+id);
                            $("#"+id).hide();
                            return false;
                        } else {
							if(p.id==descard_id){
								return;
							}
                            p = $(p).parent()[0]
                        }
                    } catch(e) {
                        return false;
                    }
                }
            }
        });
    }
};
/*==============cacheMgr,在cal365中用到===============*/
var cacheMgr = {
    cldCache : {}, // 注意！这里存的是calendarObj.js中定义的calendar对象，不是数据文件载入的cldObj
    getCld : function(year, month) {
        var key = getMonthKey(year, month);
        var cld = this.cldCache[key];
        if (typeof cld == 'undefined') {
            cld = new calendar(year, month);
            this.cldCache[key] = cld;
        }
        return cld;
    }
};

/*==========================时间处理===========================*/
/*
 %e  Day of the month without leading zeros (01..31)
 %d  Day of the month, 2 digits with leading zeros (01..31)
 %j  Day of the year, 3 digits with leading zeros (001..366)
 %a  A textual representation of a day, two letters
 %W  A full textual representation of the day of the week

 %c  Numeric representation of a month, without leading zeros (0..12)
 %m  Numeric representation of a month, with leading zeros (00..12)
 %b  A short textual representation of a month, three letters (Jan..Dec)
 %M  A full textual representation of a month, such as January or March (January..December)

 %y  A two digit representation of a year (93..03)
 %Y  A full numeric representation of a year, 4 digits (1993..03)
 */
var cal365 = {};
cal365.date= {
    date_part: function(date) {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    },
    month_day : function(date) {
        var d = date || new Date();
        return d.getDate();
    },
    time_part: function(date) {
        return (date.valueOf()/1000 - date.getTimezoneOffset()*60)%86400;
    },
    week_start: function(date,start_on_monday) {
        var shift=date.getDay();
        if (start_on_monday) {
            if (shift==0)
                shift=6
            else
                shift--;
        }
        return this.date_part(this.add(date,-1*shift,"day"));
    },
    month_start: function(date) {
        date.setDate(1);
        return this.date_part(date);
    },
    month_view_start : function(date, start_on_monday) {
        return this.week_start(this.month_start(date), start_on_monday);
    },
    year_start: function(date) {
        date.setMonth(0);
        return this.month_start(date);
    },
    day_start: function(date) {
        return this.date_part(date);
    },
    add: function(date,inc,mode) {
        var ndate=new Date(date.valueOf());
        switch(mode) {
            case "day":
                ndate.setDate(ndate.getDate()+inc);
                break;
            case "week":
                ndate.setDate(ndate.getDate()+7*inc);
                break;
            case "month":
                ndate.setMonth(ndate.getMonth()+inc);
                break;
            case "year":
                ndate.setYear(ndate.getFullYear()+inc);
                break;
            case "hour":
                ndate.setHours(ndate.getHours()+inc);
                break;
            case "minute":
                ndate.setMinutes(ndate.getMinutes()+inc);
                break;
            default:
                return defaults.date["add_"+mode](date,inc,mode);
        }
        return ndate;
    },
    to_fixed: function(num) {
        if (num<10)
            return "0"+num;
        return num;
    },
    copy: function(date) {
        return new Date(date.valueOf());
    },
    getChinaNum : function(Num) {
        var monthEn;
        switch(Num) {
            case 1 :
                monthEn = "一";
                break;
            case 2 :
                monthEn = "二";
                break;
            case 3 :
                monthEn = "三";
                break;
            case 4 :
                monthEn = "四";
                break;
            case 5 :
                monthEn = "五";
                break;
            case 6 :
                monthEn = "六";
                break;
            case 7 :
                monthEn = "七";
                break;
            case 8 :
                monthEn = "八";
                break;
            case 9 :
                monthEn = "九";
                break;
            case 10 :
                monthEn = "十";
                break;
            case 11 :
                monthEn = "十一";
                break;
            case 12 :
                monthEn = "腊";
                break;
        }
        return monthEn;
    },
    getDayNameBrief: function(day_index) {
        var day_name = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
        return day_name[day_index];
    },
    daynameToIndex: function(dayname) {
    	var dayname_index_map = {'SUN':0,'MON':1,'TUE':2,'WED':3,'THU':4,'FRI':5,'SAT':6};
    	return dayname_index_map[dayname];
    },
    /*
     * date_time所在日期为当月第几周
     */
    getWeekOfMonth: function(date_time, start_on_monday) {
        var date = this.copy(date_time);
        return Math.floor((this.date_part(date).getTime() - this.month_view_start(date, start_on_monday).getTime())/604800000) + 1;
    },
    lunar_year : function(date) {
        var l_year = date.getFullYear()+'年'+(date.getMonth()+1)+'月 '+cyclical(date.getFullYear() - 1900 + 36) + '年【'+ Animals[(date.getFullYear() - 4) % 12] + '年】';
        return l_year;
    },
    lunar_Info : function(date) {

        var cld = cacheMgr.getCld(date.getFullYear(), date.getMonth());
        var day = date.getDate();
        var cld_day = cld[day - 1];
        var lunar_detail = {
            l_day : "",
            l_month : "",
            l_day_full:""
        };
        lunar_detail.l_day = cDay(cld_day.lDay);
        lunar_detail.l_month = cld_day.lMonth;
        lunar_detail.color = "";
        var s,s2;
        s=cld_day.lunarFestival;
        if(s.length>0) { // 农历节日
            if(s.length>6) {
                s2 = s.toString();
                s = s.substr(0, 4)+'...';
            }
            lunar_detail.color = "#32CD32";
        } else { // 廿四节气
            s=cld_day.solarTerms;
            s2=s.toString();
            //节气例外
            var key = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            if(typeof this.SolarTermException[key] != 'undefined'){
            	s = s2 = this.SolarTermException[key];
            }
            if(s.length>0) {
                lunar_detail.color = "#32CD32";
                if((s =='清明')||(s =='芒种')||(s =='夏至')||(s =='冬至')) {
                    lunar_detail.color = "#32CD32";
                    if(s =='清明')
                        s = '清明节';
                }
            }
            /*else
             { // 公历节日
             s=cld_day.solarFestival;
             s2 = s.toString();
             if(s.length>0) {
             if(s.length>6)
             {

             s = s.substr(0, 4)+'..';
             }
             lunar_detail.color = "#46BAEC";
             }
             }*/
        }
		lunar_detail.l_day_y = cDay(cld_day.lDay);
        if(s.length>0) {
            lunar_detail.l_day = s;
            lunar_detail.l_day_full = s2;
			
        }
        //var info = templates.getChinaNum(lunar_detail.l_month)+"月"+lunar_detail.l_day;

        //var info = lunar_detail.l_day;
        return lunar_detail;
    },
    //节气例外调整
	SolarTermException : {
		"2012-5-20":"小满",	"2012-5-21":"",
		"2012-12-6":"",		"2012-12-7":"大雪",
		"2013-2-3":"",		"2013-2-4":"立春",
		"2013-7-22":"大暑",	"2013-7-23":"",
		"2013-12-21":"",	"2013-12-22":"冬至",
		"2014-3-5":"",		"2014-3-6":"惊蛰",
		"2015-1-5":"",		"2015-1-6":"小寒",
		"2016-6-6":"",		"2016-6-7":"大雪",
		"2017-7-22":"大暑",	"2017-7-23":"",
		"2017-12-21":"",	"2017-12-22":"冬至",
		"2018-2-18":"",		"2018-2-19":"雨水",
		"2018-3-20":"",		"2018-3-21":"春分",
		"2019-2-4":"立春",	"2019-2-5":"",
		"2019-6-21":"夏至",	"2019-6-22":"",
		"2020-7-6":"小暑",	"2020-7-7":"",
		"2020-8-22":"处暑",	"2020-8-23":"",
		"2020-12-6":"",		"2020-12-7":"大雪"
	},
    date_to_str: function(format,utc) {
        format=format.replace(/%[a-zA-Z]/g, function(a) {
            switch(a) {

                case "%d":
                    return "\"+cal365.date.to_fixed(date.getDate())+\"";
                case "%m":
                    return "\"+cal365.date.to_fixed((date.getMonth()+1))+\"";
                case "%j":
                    return "\"+date.getDate()+\"";
                case "%n":
                    return "\"+(date.getMonth()+1)+\"";
                case "%y":
                    return "\"+cal365.date.to_fixed(date.getYear()%100)+\"";
                case "%Y":
                    return "\"+date.getFullYear()+\"";
                case "%D":
                    return "\"+cal365.locale.date.day_short[date.getDay()]+\"";
                case "%l":
                    return "\"+cal365.locale.date.day_full[date.getDay()]+\"";
                case "%M":
                    return "\"+cal365.locale.date.month_short[date.getMonth()]+\"";
                case "%F":
                    return "\"+cal365.locale.date.month_full[date.getMonth()]+\"";
                case "%h":
                    return "\"+cal365.date.to_fixed((date.getHours()+11)%12+1)+\"";
                case "%H":
                    return "\"+cal365.date.to_fixed(date.getHours())+\"";
                case "%i":
                    return "\"+cal365.date.to_fixed(date.getMinutes())+\"";
                case "%a":
                    return "\"+(date.getHours()>11?\"pm\":\"am\")+\"";
                case "%A":
                    return "\"+(date.getHours()>11?\"PM\":\"AM\")+\"";
                case "%s":
                    return "\"+cal365.date.to_fixed(date.getSeconds())+\"";
                default:
                    return a;
            }
        });
        if (utc)
            format=format.replace(/date\.get/g,"date.getUTC");
        return new Function("date","return \""+format+"\";");
    },
    numToWeek: function(inStr) {
        switch (inStr) {
            case 1:
                return '一';
            case 2:
                return '二';
            case 3:
                return '三';
            case 4:
                return '四';
            case 5:
                return '五';
            case 6:
                return '六';
            case 0:
                return '日';
        }
    },
    str_to_date: function(format,utc) {
        var splt="var temp=date.split(/[^0-9a-zA-Z]+/g);";
        var mask=format.match(/%[a-zA-Z]/g);
        for (var i=0; i<mask.length; i++) {
            switch(mask[i]) {
                case "%j":
                case "%d":
                    splt+="set[2]=temp["+i+"]||0;";
                    break;
                case "%n":
                case "%m":
                    splt+="set[1]=(temp["+i+"]||1)-1;";
                    break;
                case "%y":
                    splt+="set[0]=temp["+i+"]*1+(temp["+i+"]>50?1900:2000);";
                    break;
                case "%h":
                case "%H":
                    splt+="set[3]=temp["+i+"]||0;";
                    break;
                case "%i":
                    splt+="set[4]=temp["+i+"]||0;";
                    break;
                case "%Y":
                    splt+="set[0]=temp["+i+"]||0;";
                    break;
                case "%a":
                case "%A":
                    splt+="set[3]=set[3]%12+((temp["+i+"]||'').toLowerCase()=='am'?0:12);";
                    break;
                case "%s":
                    splt+="set[5]=temp["+i+"]||0;";
                    break;
            }
        }
        var code ="set[0],set[1],set[2],set[3],set[4],set[5]";
        if (utc)
            code =" Date.UTC("+code+")";
        return new Function("date","var set=[0,0,0,0,0,0]; "+splt+" return new Date("+code+");");
    }
};
cal365.templates= {};
cal365.config= {
    default_date: "%Y-%m-%d %H:%i",
    month_date: "%F %Y",
    load_date: "%Y-%m-%d",
    week_date: "%l",
    day_date: "%D, %F %j",
    hour_date: "%H:%i",
    month_day : "%d",
    xml_date:"%Y/%m/%d %H:%i",
    api_date:"%Y-%m-%d %H:%i",
    server_utc:false
};
cal365.init_templates= function() {
    var d=cal365.date.date_to_str;
    var c=cal365.config;
    var f = function(a,b) {
        for (var c in b)
            if (!a[c])
                a[c]=b[c];
    }
    f(cal365.templates, {
        day_date:d(c.default_date),
        month_date:d(c.month_date),
        week_date: function(d1,d2) {
            return cal365.templates.day_date(d1)+" &ndash; "+cal365.templates.day_date(cal365.date.add(d2,-1,"day"));
        },
        day_scale_date:d(c.default_date),
        month_scale_date:d(c.week_date),
        week_scale_date:d(c.day_date),
        hour_scale:d(c.hour_date),
        time_picker:d(c.hour_date),
        event_date:d(c.hour_date),
        month_day:d(c.month_day),
        xml_date:cal365.date.str_to_date(c.xml_date,c.server_utc),
        load_format:d(c.load_date,c.server_utc),
        xml_format:d(c.xml_date,c.server_utc),
        api_date:cal365.date.str_to_date(c.api_date),
        event_header: function(start,end,ev) {
            return cal365.templates.event_date(start)+" - "+cal365.templates.event_date(end);
        },
        event_text: function(start,end,ev) {
            return ev.text;
        },
        event_class: function(start,end,ev) {
            return "";
        },
        month_date_class: function(d) {
            return "";
        },
        week_date_class: function(d) {
            return "";
        },
        event_bar_date: function(start,end,ev) {
            return cal365.templates.event_date(start)+" ";
        },
        event_bar_text: function(start,end,ev) {
            return ev.text;
        }
    });
};

/*==================================语言处理============================*/
cal365.locale= {
    date: {
        month_full: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        day_full: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        day_short: ["日", "一", "二", "三", "四", "五", "六"]
    }
};
/*============================== JCT模版的封装 ===========================*/
var tplMgr = {
    tplMap : {},
    getInstance : function(id) {
        var instance = this.tplMap[id];
        if (!instance) {
            instance = new jCT($.dom(id).value);
            instance.Build();
            this.tplMap[id] = instance;
        }
        return instance;
    },
    getTemplate : function(id) {
        var element = $.dom(id);
        var content = element.value; // Like textarea.value.
        if (content == null)
            content = element.innerHTML; // Like textarea.innerHTML.
        content = content.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        return content;
    },
    loadTemplate : function(id, url, callback) {
        if ($('textarea[id=' + id + ']').length > 0) { // 如果已经载入
            if (callback) {
                callback();
            }
        } else {
            // utils.showLoadingShadow();
            $.get(url, {
                t : Math.ceil(Math.random() * 100)
            }, function(data) {
                // var tpl = data.replace(/</g, '&lt;').replace(/>/g,
                // '&gt;');
                $('<textarea id="' + id
                + '" style="display:none"></textarea>')
                .appendTo('body').val(data);
                if (callback) {
                    callback();
                }
            });
        }
    }
};

/*===============================dialog========================*/
var dialogMgr = {
    dialog : null,
    option : null,
    moving : false,
    pos : null,

    show : function(el, options) {

        var op = {
            width : 428,
            title : '',
            draggable : true
            // 默认对话框允许点击标题栏拖动
        };

        var options = options || {};

        for (var p in options) {
            op[p] = options[p];
        }

        if (this.dialog) {
            this.hide();
        }

        this.option = op;
        this.dialog = $.dom(el);
        var width = this.option.width;
        var w = utils.getClientWidth();
        var left = 0;

        if (w > width) {
            left = (w - width) / 2;
        }
        this.dialog.style.left = left + 'px';
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var top = 30 + scrollTop;
        this.dialog.style.top = top + 'px';

    },
    hide : function() {
        if (this.dialog) {

            $(this.dialog).hide();

            if (this.option.hideCallback) {
                try {
                    this.option.hideCallback();
                } catch (ex) {
                }
            }
            this.option = null;
            this.dialog = null;
            this.moving = false;
            this.pos = null;
        }
    }
};
/*================ 日历实用类 ==========================*/
var CalUtil = {
    /*
     * 返回一个对象,包含date所在月份的月视图的第一天和最后一天的日期,以及显示在月视图中的行数{start:..., end:..., row:...}
     */
    monthViewInfo : function(date, startOnMonday) {
        var dateUtil = cal365.date;
        var info = {};
        var s_date = dateUtil.copy(date);
        s_date = dateUtil.month_view_start(s_date, startOnMonday);
        info.start = dateUtil.copy(dateUtil.week_start(s_date, startOnMonday));
        var e_date = dateUtil.copy(date);
        e_date.setMonth(date.getMonth() + 1);
        e_date.setDate(1);
        info.row = Math.ceil((e_date.valueOf()-s_date.valueOf()) / 604800000);
        info.end = dateUtil.add(info.start, 7*info.row, 'day');
        return info;
    }
};
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
var colors = ['#CC3333', '#DD4477', '#994499', '#6633CC', '#336699', '#3366CC',
		'#22AA99', '#329262', '#109618', '#66AA00', '#AAAA11', '#D6AE00',
		'#EE8800', '#DD5511', '#A87070', '#8C6D8C', '#627487', '#7083A8',
		'#5C8D87', '#898951', '#B08B59'];