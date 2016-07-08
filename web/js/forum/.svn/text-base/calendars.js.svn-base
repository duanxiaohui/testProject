/**
 * calendars
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-08-04 16:11:43
 */

(function() {
    var temp = null;
    function loadData() {
        var headers = {};
        if(app.getUa.android){
            headers['coco-ua'] = 'android';
        }
        $.ajax({
            url: '/calendar/getHallCalendars.do',
            type: 'GET',
            dataType: 'json',
            headers:headers,
            success: function(datas) {
                if (datas.state !== 'ok') {
                    return false;
                }
                temp = {
                    recommend:'<div class="box">\
                        <h4 class="box_title js-typejump" data-title="{$long_title}" data-id="{$id}">{$long_title}\
                            <span class="icon_{$hot_new} icon_{$color}"></span>\
                        </h4>\
                        <div class="scrollcalendar">\
                            <ul class="calenda_list e_clear">\
                                {$calendars}\
                            </ul>\
                        </div>\
                    </div>',
                    recommendCalendar: '<li>\
                        <a href="javascript:;" class="calendar_item js-calendar" data-id="{$id}">\
                            <b><img src="' + datas.pic_path + '/{$logo}" class="calendar_face"></b>\
                            <span class="calendar_title">{$title}</span>\
                        </a>\
                    </li>',
                    normal:'<div class="box">\
                        <h4 class="box_title js-typejump" data-title="{$long_title}" data-id="{$id}">{$long_title}\
                            <span class="icon_hot icon_{$color}"></span>\
                        </h4>\
                        <div class="scrollcalendar">\
                            <ul class="calenda_list calenda_normal e_clear">\
                                {$calendars}\
                            </ul>\
                        </div>\
                    </div>',
                    normalCalendar: '<li>\
                        <a href="javascript:;" class="calendar_item js-calendar" data-id="{$id}">\
                            <b><img src="' + datas.pic_path + '/{$logo}" class="calendar_face"></b>\
                            <span class="calendar_title">{$title}</span>\
                        </a>\
                    </li>'
                };
                parseCalendarType(datas.data);
                $('.content').removeClass("none");
            },
            error: function() {
                
            }
        });
    }
    function scrollCalendar () {
        var scrollBoxs = $('.scrollcalendar');
        for (var i = 0; i < scrollBoxs.length; i++) {
            $(scrollBoxs[i]).Swipe(args());
        };
    }
    function bindTypeLogic () {
        $('.js-typejump').on('tap', jumpType);
    }
    function bindCalendarLogic () {
        $('.js-calendar').on('tap', jumpCalendar);
        $('.js-calendar-focusAndOpen').on('tap', focusAndJump);
    }
    function focusAndJump () {
        var _this = $(this);
        var __this = this;
        var id = _this.attr('data-id');
        showFocusLoading();
        
        window.subscribeCallBack = function (calendarId) {
            hideFocusLoading();
            window.location.href = 'coco://365rili.com/openCalendar?calendarID=' + calendarId;
        }
        callCoCo('subscribe', {
            calendarID: id
        });
    }
    function jumpType (e) {
        var _this = $(this);
        var title = _this.attr('data-title');
        var id = _this.attr('data-id');
        callAction('list', {
            title: title,
            type: id
        });
    }
    function jumpCalendar (e) {
        var _this = $(this);
        var id = _this.attr('data-id');
        callCoCo('openCalendar', {
            calendarID: id
        });
    }
    function parseCalendarType (calendarTypes) {
        calendarTypes.sort(function (x,y) {
            return x.sequence - y.sequence;
        });
        // parserRecommend(calendarTypes[1], 'new', 'green');
        parserRecommend(calendarTypes[0], 'hot', 'red');

        var html = [];
        for (var i = 1; i < calendarTypes.length; i++) {
            html.push(parseCalendar(calendarTypes[i]));
        };

        $('.normal')[0].innerHTML = html.join('');

        bindTypeLogic();
        bindCalendarLogic();
        scrollCalendar();
    }
    function parserRecommend (calendarType, _type, color) {
        calendarType.calendars.sort(function (x, y) {
            return x.seq - y.seq;
        });
        calendarType['hot_new'] = _type
        var s = template(temp.recommend, calendarType, {
            color: color,
            calendars: function (o, p, c) {
                return template(temp.recommendCalendar, o, {});
            }
        });
        var o = $(s);
        if(_type === 'new'){
            o.appendTo('.recommend');
            return;
        }
        else{
            o.prependTo('.recommend');
            var classForClient = app.getUa.ios ? 'js-calendar' : 'js-calendar-focusAndOpen';
            o.find('.calenda_list').prepend('\
                <li>\
                    <a href="javascript:;" class="calendar_item '+classForClient+'" data-id="170861719">\
                        <b><img src="http://cocoimg.365rili.com/pic/default//17986d9d-d64f-40c0-bc75-38ff8d05912a.jpg" class="calendar_face"></b>\
                        <span class="calendar_title">韩流娱乐圈</span>\
                    </a>\
                </li>');
        }
    }
    function parseCalendar (calendarType) {
        calendarType.calendars.sort(function (x, y) {
            return x.seq - y.seq;
        });
        return template(temp.normal, calendarType, {
            calendars: function (o, p, c) {
                return template(temp.normalCalendar, o, {});
            }
        });
    }

    loadData();
})();
