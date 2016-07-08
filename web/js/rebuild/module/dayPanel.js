define([
    'rebuild/base/common',
    'rebuild/base/calendar_Protocol',
    'rebuild/class/Gird',
    'rebuild/module/getHolidays',
    'rebuild/module/scheduleData',
    'rebuild/widget/scheduleCreator',
    'rebuild/base/solarAndLunar'
], function(c, cp, Gird, Holidays, sd, scheduleCreator) {
    var _data = {};
    var _ex = {
        modeName: 'day',
        report: function () {
            amplify.publish('initPanelModule', _ex.modeName, '#ul_view_switcher li[tab="day"]');
        },

        //检测是否需要初始化模块，避免重复
        checkPanel: function () {
            var currentPanel = arguments[0];
            var prevPanel = cp.getCurrentPanel();

            //如果自身为第一个模块，执行初始化
            if(!prevPanel && currentPanel === _ex.modeName){
                _ex.init();
            }

            //如果不为第一个模块，就算是自身也不能初始化，防止冲突，需要等待其他模块注销完毕。此处仅记录
            if(prevPanel){
                _data.currentPanel = currentPanel;
            }

            //如果不为自身，则注销
            if(prevPanel === _ex.modeName && currentPanel !== _ex.modeName){
                try{
                    _ex.destroy();
                }catch(e){}
                return;
            }
        },

        checkOtherPanelDestroy: function () {
            var destroyPanel = arguments[0];

            //如果注销的模块不为自身，且当前模块为自身，则切换过来
            if(destroyPanel !== _ex.modeName && _data.currentPanel == _ex.modeName){
                _ex.init();
            }
        },

        destroy: function () {

            //解绑窗口resize
            $(window).off('.dayPanel');

            //解绑切换
            $('.today_calendar').off('.dayPanel');

            //隐藏年月
            $('#today_calendar_year_month').hide();

            //隐藏今天
            $('#lnk_today').hide();

            $('#div_calendar_panel').empty();

            amplify.unsubscribe('AcrossTheDay', _ex.acrossDate);

            amplify.publish('panelDestroied', _ex.modeName);
        },

        init: function() {

            //初始化数据
            _ex.buildData();

            //初始化基础UI
            _ex.buildBaseUI();

            //初始化逻辑
            _ex.buildLogic();

            $('.addSchBtn').on('click', function() {
                scheduleCreator.showForm(c.formatDate(_data.today), undefined);
                return false;
            });

            _ex.updateScheduleData();

            amplify.subscribe("scheduleDataChanged", _ex.updateScheduleData);
            amplify.subscribe('AcrossTheDay', _ex.acrossDate);

            //发出消息，模块已经切换完毕
            amplify.publish('calendarPanelChanged', _ex.modeName);
        },

        buildData: function() {
            _data.html = {
                dayView: '<div class="dayview_wrapper">\
                              <div class="dayview_left">\
                                  <div class="dateInfo">\
                                      <div class="iniLetter"></div>\
                                      <div class="solarStr"></div>\
                                      <div class="lunarStr"></div>\
                                  </div>\
                                  <div class="pickerView">\
                                      <div class="datePicker"></div>\
                                  </div>\
                              </div>\
                              <div class="dayview_mid">\
                                  <div class="schHeader"></div>\
                                  <ul class="schList"></ul>\
                              </div>\
                              <div class="dayview_right">\
                                  <div class="addSch">\
                                      <input class="addSchBtn" type="button" value="新建"/>\
                                  </div>\
                                  <div class="schDetails">\
                                      <div class="detailTxt"></div>\
                                      <ul class="showPics" style="margin-top:15px"></ul>\
                                  </div>\
                              </div>\
                          </div>',
                schItem: '<li>\
                              <div class="schTxt">{txt}</div>\
                              <div class="schTime">{schTime}</div>\
                              <div class="schPics" style="display:none">{schPics}</div>\
                          </li>'
            };

            _data.yearDom = $('#sp_year');
            _data.monthDom = $('#sp_month');
            _data.prevBtn = $('#lnk_prev');
            _data.nextBtn = $('#lnk_next');
            _data.todayBtn = $('#lnk_today');

            _data.Girds = [];

            _data.today = new Date(+G.currDate);
            _data.now = new Date(+G.currDate);
            _data.date = new Date(+G.currDate);
            _data.month = _data.date.getMonth();
            _data.calendar = new Calendar(_data.date);
            _data.isSundayFirst = cp.getFirstDay() === 'sunday';
            _data.fromDate = _ex.getFromDate();
            _data.fromMonth = _data.fromDate.getMonth();

            _data.holidays = Holidays.getHolidays();

            _data.girdReady = 0;
            _data.needGetScheduleDayRang = null;
        },

        buildBaseUI: function() {
            var date = _data.today;
            var htmlTemp = _data.html;
            var html = [];
            html.push(htmlTemp.dayView);

            $('#div_calendar_panel').html(html.join(''));
            $('.iniLetter').text(date.getDate());
            $('.solarStr').text(_ex.getSolarStr(date));
            $('.lunarStr').text(_ex.getLunarStr(date));
            $('.datePicker').datepicker({
                showOtherMonths: true,
                dateFormat: "yy-mm-dd",
                yearSuffix: '年',
                showMonthAfterYear: true,
                dayNamesMin: ['日','一','二','三','四','五','六'],
                monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                onSelect: function(dateText, inst) {
                    var d = new Date(Date.parse(dateText));
                    _ex.updateDataInfo(d);
                },
                onChangeMonthYear: function(year, month, inst) {
                    var currentDate = $(".datePicker").datepicker("getDate");
                    var date = new Date(year, month-1, currentDate.getDate());
                    _ex.updateDataInfo(date);
                }
            });
            $('.schHeader').text(date.getFullYear() + '年' + (date.getMonth()+1) + '月');
            _ex.resize();
        },

        buildLogic: function() {
            //监听resize
            $(window).on('resize.dayPanel', _ex.resize);

            //后天
            $('.today_calendar').on('click.dayPanel', '#lnk_next', _ex.nextMonth);

            //前天
            $('.today_calendar').on('click.dayPanel', '#lnk_prev', _ex.prevMonth);

            //今天
            $('.today_calendar').on('click.dayPanel', '#lnk_today', _ex.toDay);

            //显示今天
            $('#lnk_today').show();

            //显示年月
            $('#today_calendar_year_month').show();

            _ex.toDay();

            $('.schList').on('click', 'li', function() {
                $('.showPics').empty();
                $('.detailTxt').html($(this).find('.schTxt').html());
                var picArr = $(this).find('.schPics').text().split(',');
                if(picArr.length < 1 || picArr.length ==1 && picArr[0] == "") return;
                $.each(picArr, function(index, o) {
                    var image = $('<div><image src="' + 'http://cocoimg.365rili.com/schedule_pics/default/' + o + '"' + ' style="width:400px;height:250px;"/></div>');
                    $('.showPics').append(image);
                });
            });

        },

        getFromDate: function () {
            return _data.isSundayFirst ? _data.calendar.getWeekSundayFirstDate() : _data.calendar.getWeekFirstDate();
        },

        nextMonth: function () {
            //切换到下个月的第一天
            _data.date.setMonth(_data.date.getMonth() + 1);
            _ex.updateDataInfo(_data.date);
            _ex.updateDate();
        },

        prevMonth: function () {
            //切换到上个月的第一天
            _data.date.setMonth(_data.date.getMonth() - 1);
            _ex.updateDataInfo(_data.date);
            _ex.updateDate();
        },

        toDay: function () {
            //切换到今天
            var date = _data.date;
            date.setYear(_data.today.getFullYear());
            date.setMonth(_data.today.getMonth());
            date.setDate(_data.today.getDate());

            _ex.updateDataInfo(date);

            _ex.updateDate();
        },

        acrossDate: function () {
            //如果为当前月，需要更新_data.date
            if(!(_data.date.getFullYear() !== _data.today.getFullYear() || _data.month !== _data.today.getMonth() || _data.date.getDate() !== _data.today.getDate())){
                _data.date = new Date(+G.currDate);
            }

            //更新今天
            _data.today = new Date(+G.currDate);

            _ex.updateDate();
        },

        updateDate: function () {
            //更新其他信息
            _data.month = _data.date.getMonth();
            _data.calendar = new Calendar(_data.date);
            _data.fromDate = _ex.getFromDate();
            _data.fromMonth = _data.fromDate.getMonth();

            //更新显示日期
            $('#sp_year').text(_data.date.getFullYear());
            $('#sp_month').text(_data.date.getMonth() + 1);

            //判断是否需要显示今天

            if(_data.date.getFullYear() !== _data.today.getFullYear() || _data.month !== _data.today.getMonth()){
                $('#lnk_today').show();
            }
            else{
                $('#lnk_today').hide();
            }

            amplify.publish('dateUpdated', _data);
        },

        resize: function () {
            var windowHeight = $(window).height();
            var resizeHeight = windowHeight - $('#div_today').height();
            if(!c.isPCVersion()){
                resizeHeight -= $('.calendar_header').height();
            }
            $('.dayview_wrapper').height(
                resizeHeight
            );
            amplify.publish('panelResized');
        },

        getDayOfWeek: function(date) {
            var arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            return arr[date.getDay()];
        },

        getSolarStr: function(date) {
            return date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日 ' + _ex.getDayOfWeek(date);
        },

        getLunarStr: function(date) {
            return lunar(date).gzYear + lunar(date).animal + '年 ' + lunar(date).lMonth + '月' + lunar(date).lDate;
        },

        getMonthFirstDay: function(date) {
            date.setDate(1);
            return date;
        },

        getMonthLastDay: function(date) {
            var currentMonth = date.getMonth();
            var nextMonth = ++currentMonth;
            var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
            var oneDay = 1000 * 60 * 60 * 24;
            return new Date(nextMonthFirstDay - oneDay);
        },

        updateDataInfo: function(date) {
            $('.iniLetter').text(date.getDate());
            $('.solarStr').text(_ex.getSolarStr(date));
            $('.lunarStr').text( _ex.getLunarStr(date));
            $(".datePicker").datepicker("setDate", date);
            _data.now = date;
            _ex.updateScheduleData();
            $('.schHeader').text(_data.now.getFullYear() + '年' + (_data.now.getMonth()+1) + '月');
        },

        getDateFromStr: function(str) {
            var d = new Date();
            try {
                var ary = str.split(" ");
                d.setFullYear(ary[0].split("-")[0]);
                d.setMonth(parseInt(ary[0].split("-")[1],10) - 1,ary[0].split("-")[2]);

                d.setHours(ary[1].split(":")[0]);
                d.setMinutes(ary[1].split(":")[1]);
                d.setSeconds(ary[1].split(":")[2]);
                return d;
            } catch(e) {
                return new Date(str);
            }
        },
        isRN: function(year) {
            return (year%4 == 0 && year%100 != 0) || (year%400 == 0);
        },

        getDays: function(year, month) {
            if(month == 2) {
                return _ex.isRN(year) ? 29 : 28;
            } else if(month < 8) {
                return month%2 == 0 ? 30 : 31;
            } else {
                return month%2 == 0 ? 31 : 30;
            }
        },

        updateScheduleData: function() {
            //公共数据不存在则退出
            var data;
            if(arguments.length > 0) {
                data = arguments[0]['scheduleList'] || cp.getScheduleList();
            } else {
                data = cp.getScheduleList();
            }
            if(!data) {
                return;
            }
            var days = _ex.getDays(_data.now.getFullYear(), _data.now.getMonth()+1);
            var calendars;
            if(arguments.length > 0) {
                calendars = arguments[1] || cp.getCalendarListSelectedCld();
            } else {
                calendars =  cp.getCalendarListSelectedCld();
            }

            for(var i=1; i<=days; i++) {
                var date = new Date(_data.now.getFullYear(), _data.now.getMonth(), i);
                var strDate = c.formatDate(date);
                var schedules = data[strDate];
                if(!schedules) {
                    return amplify.publish('scheduleDataNotEnough', _ex.setNeedGetScheduleRang(calendars, date));
                } else if(schedules) {
                    for(var j=0; j<calendars.length; j++) {
                        if(!schedules[calendars[j]]) {
                            return amplify.publish('scheduleDataNotEnough', _ex.setNeedGetScheduleRang(calendars, date));
                        }
                    }
                }
            }
            //根据日历id筛选出自身日程数据, 缺少的日历会统计
            var object = {};
            var arr = [];
            for(var i=1; i<=days; i++) {
                var date = new Date(_data.now.getFullYear(), _data.now.getMonth(), i);
                var strDate = c.formatDate(date);
                var schedules = data[strDate];
                for(var j=0; j<calendars.length; j++) {
                    if(schedules[calendars[j]].length > 0) {
                        var obj = {};
                        obj[calendars[j]] = schedules[calendars[j]];
                        arr.push(obj);
                        object[strDate] = obj;
                    }
                }
            }
            $('.schList').empty();
            _ex.updateScheduleView(object);
        },

        updateScheduleView: function(data) {
            var scheduleList = [];
            $.each(data, function(i, o) {
                $.each(o, function(_, schlist) {
                    if(schlist.length>0) {
                        $.each(schlist, function(_, schedule) {
                            scheduleList.push(schedule);
                        });
                    }
                })
            });
            var htmlDiv = [];
            $.each(scheduleList, function(k, v) {
                var picArr = [];
                if($(v).attr('pics') != undefined) {
                    var arr = $(v).attr('pics');
                    $.each(arr, function(index, o) {
                        picArr.push($(o).attr('pic'));
                    });
                }
                htmlDiv.push($.format(_data.html.schItem, {
                    'txt': $(v).attr('text'),
                    'schTime': $(v).attr('start_time'),
                    'schPics': picArr.join(',')
                }));
            });
            $('.schList').html(htmlDiv);
        },

        setNeedGetScheduleRang: function(calendars, date) {
            var rang = {};
            rang.begin = new Date(_ex.getMonthFirstDay(date));
            rang.end = new Date(_ex.getMonthLastDay(date));
            rang.calendars = {};

            //无日期表示无数据，则不光是日期信息，还需要包括所选日历信息
            for (var i = 0, l = calendars.length; i < l; i++) {
                if(!rang.calendars[calendars[i]]){
                    rang.calendars[calendars[i]] = 1;
                }
            }
            return rang;
        }

    };

    amplify.subscribe('toChangeCalendarPanel', _ex.checkPanel);
    amplify.subscribe('panelReady', _ex.report);
    amplify.subscribe('panelDestroied', _ex.checkOtherPanelDestroy);
});