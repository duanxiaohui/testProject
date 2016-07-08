/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2016-01-09 16:27:28
 * @version $Id$
 */

(function() {
    window.mobClendar = {
            _data: {
                startTime: (function() {
                    var date = new Date;
                    date.setYear(date.getFullYear() - 100);
                    return date;
                })(),
                endTime: (function() {
                    var date = new Date;
                    date.setYear(date.getFullYear() + 100);
                    return date;
                })(),
                setMonth: true,
                setDay: true,
                year: 0,
                month: 0
            },
            tmpl: {
                body: '<div class="mobile_data_picker">\
                        <div class="mobile_title">\
                            <span class="cancel_btn">取消</span>\
                            <h2>选择日期</h2>\
                            <span class="retrun_btn">确定</span>\
                        </div>\
                        <div class="mobile_containter">\
                            <div class="dd_containte_mask"></div>\
                        </div>\
                    </div>',
                year: '<div class="dd_select_year">\
                        <div class="dd_select_year_list">\
                            <ul></ul>\
                        </div>\
                        <span class="dd_yaer_txt">年</span>\
                    </div>',
                month: '<div class="dd_select_month">\
                        <div class="dd_select_month_list">\
                            <ul>\
                                <li value="1">1</li>\
                                <li value="2">2</li>\
                                <li value="3">3</li>\
                                <li value="4">4</li>\
                                <li value="5">5</li>\
                                <li value="6">6</li>\
                                <li value="7">7</li>\
                                <li value="8">8</li>\
                                <li value="9">9</li>\
                                <li value="10">10</li>\
                                <li value="11">11</li>\
                                <li value="12">12</li>\
                            </ul>\
                        </div>\
                        <span class="dd_month_txt">月</span>\
                    </div>',
                day: '<div class="dd_select_day">\
                        <div class="dd_select_day_list">\
                            <ul></ul>\
                        </div>\
                        <span class="dd_month_txt">日</span>\
                    </div>',
                time: '<div class="dd_select_time">\
                        <div class="dd_select_month_list">\
                            <ul>\
                                <li value="1">1</li>\
                            </ul>\
                        </div>\
                        <span class="dd_month_txt">月</span>\
                    </div>'
            },
            parseArgs: function(opt) {
                for (var i in opt) {
                    mobClendar._data[i] = opt[i];
                }
            },
            init: function(opt) {
                $(window).on('touchstart', stopDefault);
                $(window).on('pointerdown', stopDefault);
                mobClendar.parseArgs(opt);
                mobClendar.drawTrunkFn();
                mobClendar.drawYearFn();
                mobClendar._data.setMonth && mobClendar.drawMonthFn();
                mobClendar._data.setDay && mobClendar.drawDayFn();
                mobClendar.editHtmlFn();
                mobClendar.dateInitFn();
                $(".dd_select_year_list ul").Swipe(mobClendar.SwipeArgs(mobClendar.year));
                $(".dd_select_month_list ul").Swipe(mobClendar.SwipeArgs(mobClendar.month));
                $(".dd_select_day_list ul").Swipe(mobClendar.SwipeArgs(mobClendar.day));
                mobClendar.bind();
                mobClendar.getDate();
                mobClendar.selectDate();

                return mobClendar;
            },
            events: {},
            bindevent: function(eventName, fn) {
                mobClendar.events[eventName] = fn;
            },
            attachevent: function(event, args) {
                mobClendar.events[event](args);
            },
            bind: function() {
                $('body').on('tap', '.retrun_btn', function() {
                    mobClendar.attachevent('btnClick',
                        mobClendar._data.getDate
                    );
                });
                $('body').on('tap', '.cancel_btn', function() {
                    $('.mobile_data_picker').hide().remove()
                });
            },
            SwipeArgs: function(dateType) {
                return {
                    iniL: 30, //X方向滑动的最小距离
                    iniT: 50, //Y方向滑动的最大距离
                    mCallback: function(tPoint) {
                        var _this = tPoint.self;
                        var parClassNext = _this.parents()[1].className.split('_')[2];
                        var initScrollTop = mobClendar._data['init' + parClassNext];
                        var direction = tPoint.endY > tPoint.startY ? 'bottom' : 'top';
                        var distance = tPoint.distance || 0;
                        tPoint.setAttr("distance", distance);


                        var spacing = tPoint.endY - tPoint.startY + distance + initScrollTop;

                        var spacingNum = parseInt(spacing / 30) * 30;
                        var liNum = $(_this).find('li').length;
                        if (spacingNum < (-(liNum - 3) * 30)) {
                            spacingNum = (-(liNum - 3) * 30)
                        }
                        if (spacingNum > 60) {
                            spacingNum = 60
                        }
                        transformBox(_this, spacingNum, tPoint.speed, tPoint.has3d);
                    },
                    eCallback: function(tPoint) {
                        dateType(tPoint);
                        mobClendar.attachevent('datechange', tPoint);
                    }
                }
            },
            year: function(tPoint) {
                var _this = tPoint.self;
                var distance = tPoint.distance || 0;

                //计算滑动的高度 
                var spacing = tPoint.endY - tPoint.startY + distance;
                //计算滑动整个LI
                var spacingNum = parseInt(spacing / 30) * 30;
                //计算滑动的上下边界
                var liNum = $(_this).find('li').length;
                if (spacingNum < (-(liNum - 3) * 30)) {
                    spacingNum = (-(liNum - 3) * 30)
                }
                if (spacingNum > 60) {
                    spacingNum = 60
                }

                tPoint.setAttr("distance", spacingNum);
                console.log(tPoint.distance);
                var eqNum = mobClendar.calcFn(spacingNum, _this)
                mobClendar._data.year = eqNum;
            },
            month: function(tPoint) {
                var _this = tPoint.self;
                var distance = tPoint.distance || 0;
                var spacing = tPoint.endY - tPoint.startY + distance;

                var spacingNum = parseInt(spacing / 30) * 30;
                var liNum = $(_this).find('li').length;
                if (spacingNum < (-(liNum - 3) * 30)) {
                    spacingNum = (-(liNum - 3) * 30)
                }
                if (spacingNum > 60) {
                    spacingNum = 60
                }
                tPoint.setAttr("distance", spacingNum);
                var eqNum = mobClendar.calcFn(spacingNum, _this)
                mobClendar._data.month = eqNum;
                mobClendar.drawDayFn();
            },
            day: function(tPoint) {
                var _this = tPoint.self;
                var distance = tPoint.distance || 0;
                var spacing = tPoint.endY - tPoint.startY + distance;

                var spacingNum = parseInt(spacing / 30) * 30;
                var liNum = $(_this).find('li').length;
                if (spacingNum < (-(liNum - 3) * 30)) {
                    spacingNum = (-(liNum - 3) * 30)
                }
                if (spacingNum > 60) {
                    spacingNum = 60
                }
                tPoint.setAttr("distance", spacingNum);
                var eqNum = mobClendar.calcFn(spacingNum, _this)
                mobClendar._data.day = eqNum;
            },
            drawTrunkFn: function() {
                $('body').append(mobClendar.tmpl.body);
            },
            drawYearFn: function() {
                var liTmpl = '';
                mobClendar._data.startTime = mobClendar._data.startTime ? new Date(mobClendar._data.startTime).getFullYear() : new Date().getFullYear() - 100;
                mobClendar._data.endTime = new Date().getFullYear() + 100;
                for (var i = mobClendar._data.startTime; i < mobClendar._data.endTime; i++) {
                    liTmpl += '<li value="' + i + '">' + i + '</li>';
                };
                $('.mobile_containter').append(mobClendar.tmpl.year);
                $('.dd_select_year ul').append(liTmpl);
            },
            drawMonthFn: function() {
                $('.mobile_containter').append(mobClendar.tmpl.month);
            },
            drawDayFn: function() {
                var liTmpl = '';
                var dayNum = 30;
                switch (+mobClendar._data.month) {
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 8:
                    case 10:
                    case 12:
                        dayNum = 31;
                        break;
                    case 4:
                    case 6:
                    case 9:
                    case 11:
                        dayNum = 30;
                        break;
                }
                if (mobClendar._data.month == 2) {
                    console.log(1);
                    if (mobClendar._data.year % 4 == 0) {
                        dayNum = 29
                    } else {
                        dayNum = 28
                    }
                }
                console.log(dayNum);
                for (var i = 1; i <= dayNum; i++) {
                    liTmpl += '<li value="' + i + '">' + i + '</li>';
                };
                if ($('.dd_select_day').length > 0) {
                    $('.dd_select_day ul').html(liTmpl);
                } else {
                    $('.mobile_containter').append(mobClendar.tmpl.day);
                    $('.dd_select_day ul').append(liTmpl);
                }
            },
            editHtmlFn: function() {
                if (mobClendar._data.setMonth && mobClendar._data.setDay) {
                    $(".dd_select_year,.dd_select_month,.dd_select_day").css({
                        "width": '33.3333%'
                    })
                }
            },
            dateInitFn: function() {
                var nowDate = new Date(),
                    nYear = nowDate.getFullYear(),
                    nMonth = nowDate.getMonth() + 1,
                    nDay = nowDate.getDate();

                 console.log(mobClendar._data.startTime);
                var yearNum = -(nYear - mobClendar._data.startTime - 2) * 30;

                var monthNum;
                if (nMonth == 1) {
                    monthNum = 60
                } else if (nMonth == 2) {
                    monthNum = 30
                } else if (nMonth == 3) {
                    monthNum = 0
                } else {
                    monthNum = -(nMonth - 3) * 30
                }
                var dayNum = -(nDay-3) * 30;

                mobClendar._data.inityear = yearNum;
                mobClendar._data.initmonth = monthNum;
                mobClendar._data.initday = dayNum;
                console.log(mobClendar._data.inityear);
                console.log(mobClendar._data.initmonth);
                console.log(mobClendar._data.initday);
                var $yearUl = $('.dd_select_year_list').find('ul');
                var $monthUl = $('.dd_select_month_list').find('ul');
                var $dayUl = $('.dd_select_day_list').find('ul');

                transformBox($yearUl, yearNum, 3, true);
                transformBox($monthUl, monthNum, 3, true);
                transformBox($dayUl, dayNum, 3, true);
            },
            selectDate:function () {
                selectYear = mobClendar._data.inityear/30 + 2 + mobClendar._data.startTime;
                console.log(selectYear);
            },
            getDateString: function() {
                return mobClendar._data.year + '-' + mobClendar._data.month + '-' + mobClendar._data.day;
            },
            getDate: function() {
                console.log(1);
                var s = new Date(+mobClendar._data.year, +mobClendar._data.month - 1, +mobClendar._data.day);
                mobClendar._data.getDate = s
                console.log(+mobClendar._data.year);
                console.log(+mobClendar._data.month);
                console.log(+mobClendar._data.day);
                return mobClendar._data.getDate;
            },
            calcFn: function(num, _this) {
                var liNum = $(_this).find('li').length;
                if (num < (-(liNum - 3) * 30)) {
                    num = (-(liNum - 3) * 30)
                }
                if (num > 60) {
                    num = 60
                }
                if (num > 0) {
                    var eqNum = Math.abs(parseInt(num / 30) - 2);
                    var calcNum = $($(_this).find('li').eq(eqNum)).attr('value');
                    return calcNum;
                } else {
                    var eqNum = Math.abs(parseInt(num / 30)) + 2;
                    var calcNum = $($(_this).find('li').eq(eqNum)).attr('value');
                    return calcNum;
                }
            }
        }
        // mobClendar.init();
    function transformBox(obj, value, time, has3d) {
        var time = time ? time : 0;
        transl = has3d ? "translate3d(0," + value + "px,0)" : "translate(0," + value + "px)";
        obj.css({
            '-webkit-transform': transl,
            '-webkit-transition': time + 'ms linear'
        });
    }

    function stopDefault(e) {    
        if (e && e.preventDefault)         e.preventDefault();    
        else         window.event.returnValue = false;    
        return false;
    }
    if (window.jQuery || window.Zepto) {
        (function(a) {
            a.fn.mobClendar = mobClendar;
        })(window.jQuery || window.Zepto)
    };

})()