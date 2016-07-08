var schedule_public = {

    config: {
        tmpl: '<dd class="e_clear">\
                    <div class="schedule_remind"><a href="javascript:;"></a></div>\
                    <div class="schedule_img"><img src="{thumb}"/></div>\
                    <div class="sc_schedule_txt" _all="{all}" pic="{thumb}" sid="{id}" uuid="{uuid}">\
                        <div class="sc_schedule_txt_p figcaption"><p class="h3">{title}</p></div>\
                        <!--<p>{desc}</p>-->\
                        <div class="time_address">\
                            <p class="time">{td}</p>\
                            <p class="address">{location}</p>\
                        </div>\
                    </div>\
                </dd>',
        obj: {},
        pic_path: ''

    },

    init: function() {
        if(location.hash.indexOf('sh') > 0){
            var sid = schedule_public.getURLParameter('sid');
            var uuid = schedule_public.getURLParameter('uuid');
            var time = schedule_public.getURLParameter('time');
            var bgu  = schedule_public.getURLParameter('bgu');

            schedule_public.getRawPubScheduleById(sid, uuid, time, bgu);
            $(".sc_main").remove();
        }else{
            schedule_public.getPublicCalendarDetailById();
            schedule_public.listNextPhrase();
            schedule_public.bindEvents();
            $('.schedule_more_btn, .cares').show();
        }
    },

    getPublicCalendarDetailById: function() {
        $.ajax({
            url: '/calendar/getPublicCalendarDetailById.do',
            type: 'post',
            dataType: 'json',
            data: {
                id: G.cid
            },
            success: function(data) {
                schedule_public.handlePublicCalendarDetail(data);
            }
        });
    },

    handlePublicCalendarDetail: function(data) {
        if(data.state != 'ok') return;
        $('.header').css('background-image', 'url(' + data.background + ') ');
        $('.head_content img').attr('src', data.logo);
        $('.head_content h3').text(data.title);
        $('.head_content span').text(data.user_count);
        var width_info = parseInt($(window).width()) * 0.05 * 2;
        $('.clendar_info').css('width', parseInt($(window).width())-width_info).html('<p>'+data.desc+'</p>');
        schedule_public.setCalendar_info();

        for(var prop in data) {
            schedule_public.config.obj[prop] = data[prop];
        }

        //微信转发的配置
        wxProtocol && wxProtocol.initWithAlready({
            imgUrl: data.background,
            title: data.title,
            desc: data.desc
        });
    },

    listNextPhrase: function() {
        $.ajax({
            url: '/schedule/listNextPhrase.do',
            type: 'post',
            dataType: 'json',
            data: {
                calendarId: G.cid,
                fromDate: schedule_public.formatDate(G.currDate)

            },
            success: function(data) {
                schedule_public.handleListNextPhrase(data);
            }
        });
    },

    handleListNextPhrase: function(data) {
        if(data.state != 'ok') return;
        if(data.schedules.schlist.length < 1) {
            $('.schedule_more_btn').addClass("none_schedule").text('该日历还没安排日程或活动哦~');
                var h = $('.head_content').css('height');
                $('.head_content').css('height', $(window).height()-106);
            return;
        }

        var finalArr = [];
        var result = {};
        schedule_public.config.pic_path = data.schedules.pic_url;
        var arr = data.schedules.schlist;
        var filterArr = $.grep(arr, function(n, i) {
            return schedule_public.formatDate(new Date(n.start)) >= schedule_public.formatDate(G.currDate);

        });

        if(filterArr.length >= 5) {
            finalArr = filterArr.slice(0, 5);
        } else {
            finalArr = filterArr;
        }

        //整合数据
        $.map(finalArr, function(v, k) {
            var date = new Date(v.start);
            var dateStr = schedule_public.formatDate(date);
            if(!result[dateStr]) {
                result[dateStr] = [];
            }
            var tmp = {};
            for(var prop in v) {
                tmp[prop] = v[prop];
            }
            result[dateStr].push(tmp);
        });


        //渲染数据到页面上
        $.each(result, function(k, v) {
            var date = new Date(k);
            var scheduleTitle = $('<dt>' + schedule_public.getScheduleTitle(date) + '</dt>');
            var scheduleItem = $('<dl class="schedule_list_dl" time="' + schedule_public.formatDate(date) + '"></dl>');
            scheduleItem.append(scheduleTitle);
            scheduleItem.append($.format(schedule_public.config.tmpl, $.map(v, function(o) {
                o.thumb = schedule_public.config.pic_path + o.thumb;
                return o;
            })));
            $('.schedule_list').append(scheduleItem);
        });
        //如果仅有一条日程，需要调整背景图的高度
        if(finalArr.length == 1) {
            var h = $('.head_content').css('height');
             $('.head_content').css('height', $(window).height()-227);
        }

        //如果加载的图片报错，使用默认图片
        $('.schedule_img img').on('error', function(evt) {
            $(this).attr('src', '../share/images/new/default.png');
        });
        //判断图片宽高比，谁小谁100%

        $('.schedule_list img').on('load',function(){
             var imgw =$(this).width(), imgh = $(this).height();
            if(imgw>imgh){
                $(this).css('height','100%');
            }else{
                $(this).css('width','100%');

            }
        });

        //将没有图片的日程去掉图片占位
        $('.schedule_list_dl').find('dd').each(function(index, o) {
            if($(o).find('img').attr('src') == schedule_public.config.pic_path + 'null') {
                $(this).addClass('noimg');
            }
        });
        //如果没有地理位置直接去掉占位
        $('.time_address .address').each(function(index, o) {
            if($(o).text() == '' || $(o).text() == 'null') {
                $(this).addClass('none');
            } else {
                var str = $(o).text();
                var index = str.indexOf('@');
                if(index > -1) {
                    $(this).text(str.substring(0, index));
                }
            }
        });

        schedule_public.setFigcaption();

    },

    setCalendar_info: function() {
        $(".clendar_info").each(function(i){
            var divH = $(this).height()-20;
            var $p =$($("p", $(this)).eq(0));
            while ($p.height() > divH) {
                $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
            };
        });
    },

    setFigcaption: function() {
        $(".figcaption").each(function(i){
            var divH = $(this).height();
            var $p =$("p", $(this)).eq(0);
            while ($p.height() > divH) {
                $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
            };
        });
    },

    bindEvents: function() {
        //调用新的app.js
        // $('.layer_btn').on('click', function(evt) {
        //     schedule_public.wrapRedirectApp(1, '');
        // });

        $('.schedule_more_btn').on('click', function(evt) {
            var txt = $('.schedule_more_btn').text();
            if(txt == '该日历还没安排日程或活动哦~') return;
            app.open(
                {
                    ios:'coco://365rili.com/subscribe?calendarID='+G.cid + '&calendarType=public',
                    android:'coco://365rili.com/subscribe?calendarID='+G.cid
                },
                app.getUa.ios,
                function () {
                    app.showTip("public");
                }
            );
        });

        //调用新的app.js
        // $('.schedule_list').on('click', 'div.schedule_remind a', function(evt) {
        //     schedule_public.wrapRedirectApp(0, '请使用365日历<br/>为感兴趣的日程添加提醒');
        // });

        $('.mask').on('click', function() {
            $('.tips_layer').css('display', 'none');
            $('.mask').css('display', 'none');
        });

        $('.schedule_list').on('click', '.schedule_img, .sc_schedule_txt', function(evt) {
            var $schedule_txt = null, all_day = '';
            if(this.className == 'schedule_img') {
                $schedule_txt = $(this).next('.sc_schedule_txt');
            } else {
                $schedule_txt = $(this);
            }

            if($schedule_txt.attr('_all') == 'true') {
                all_day = ' 全天';
            }
            var time = $schedule_txt.closest('dl.schedule_list_dl').attr('time') + all_day,
                sid = $schedule_txt.attr('sid'),
                uuid = $schedule_txt.attr('uuid');
            schedule_public.getRawPubScheduleById(sid, uuid, time, schedule_public.config.obj['background'])
        });

        window.addEventListener("hashchange", function(e) {
            if(e.newURL.indexOf("#") == -1) {
                location.reload();
            } else {
                $('.sc_main').css({
                    'display': 'none',
                    'z-index': 0
                });
                $('.bg, .mask_bg').show();

                //$('.bg').css('opacity', 0.6);
                $('.ss_main').css({
                    'display': 'block',
                    'z-index': 5
                });
            }
        }, false);

        window.addEventListener('resize', function() {
            schedule_public.getPublicCalendarDetailById();
            var width_info = parseInt($(window).width()) * 0.05 * 2;
            $('.clendar_info').css('width', parseInt($(window).width())-width_info);
            schedule_public.setCalendar_info();
            schedule_public.setFigcaption();
        }, false);
    },

    getRawPubScheduleById: function(sid, uuid, time, bgu){
        $.ajax({
            url: '/schedule/getRawPubScheduleById.do',
            type: 'post',
            dataType: 'json',
            data: {
                sid: sid,
                uuid: uuid,
                cid: G.cid
            },
            success: function(result) {
                if(result.state == 'ok'){
                    $.ajax({
                        url: '/schedule/m-getpics.do',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            calendarID: G.cid,
                            scheduleUUID: uuid
                        },
                        success: function(data) {
                            if(data.state == 'ok'){
                                $.ajax({
                                    url: '/schedule/checkScheduleState.do',
                                    type: 'post',
                                    dataType: 'json',
                                    data: {
                                        cid: G.cid,
                                        uuid: uuid
                                    },
                                    success: function(loginStatus){
                                        if(loginStatus.state == 'ok'){
                                            var pic_arr = [];
                                            $.each(data.pics, function(_, o) {
                                                pic_arr.push(data.pic_url + o.pic);
                                            });
                                            var pics = pic_arr.join(',');
                                            var scheduleObj = {
                                                cid: G.cid,
                                                isSpecial: G.isSpecial,
                                                calendarType: 'public',
                                                calendarName: result.s.calendar.title,
                                                calendarDesc: result.s.calendar.description,
                                                scheduleTitle: result.s.title,
                                                scheduleDesc: result.s.description,
                                                creator: '',
                                                bgu: bgu,
                                                location: result.s.location,
                                                dateline1: time,
                                                dateline2: '',
                                                lunar_time: '',
                                                url: result.s.url,
                                                pics: pics,
                                                isLogin: loginStatus.isLogin,
                                                on: loginStatus.on,
                                                uuid: uuid
                                            };
                                            location.hash = ['#sh?sid=',encodeURIComponent(sid),'&uuid=',encodeURIComponent(uuid),'&time=', encodeURIComponent(time), '&bgu=', encodeURIComponent(bgu)].join('');
                                            schedule_public.renderDisplay();
                                            scheduleShare.render(scheduleObj, $('.ss_main'));
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
                
            }
        });
    },


    formatDate: function(date) {
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
    },

    getDayOfWeek: function(date) {
        var arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        return arr[date.getDay()];
    },

    getScheduleTitle: function(date) {
        var schedule_title = '';
        if(schedule_public.formatDate(date) == schedule_public.formatDate(G.  currDate)) {
            schedule_title = '今天 ' + (date.getMonth()+1) + '月' + date.getDate() + '日 ' + this.getDayOfWeek(date);
        } else {
            schedule_title = (date.getMonth()+1) + '月' + date.getDate() + '日 ' + this.getDayOfWeek(date);
        }
        return schedule_title;
    },

    //新的app.js代替
    // redirectApp: function(url, ios, flag, str, callback) {
    //     var iframe = document.createElement("iframe");
    //     iframe.style.display = "none";
    //     iframe.src = url;
    //     document.body.appendChild(iframe);

    //     var startTime = new Date().getTime();
    //     var interval = setTimeout(function(){
    //         if(new Date().getTime() - startTime > 1200 && (ios)){
    //             return;
    //         }
    //         if(!callback){
    //             if(flag == 1) {
    //                 window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609";
    //             } else {
    //                 schedule_public.popUp(str);
    //             }
    //         }else{
    //             callback();
    //         }
    //     }, 1000)
    //     window.onblur = function(){
    //         clearTimeout(interval);
    //     };
    // },

    popUp: function(str) {
        $('.tips_layer').removeClass('none').show();
        $('.mask').removeClass('none').show();
        $('.tips_layer h3').html(str);
    },
    //新的app.js代替
    // wrapRedirectApp: function(flag, str) {
    //     var sUserAgent = navigator.userAgent.toLowerCase();
    //     var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    //     var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    //     var cocoUrl = 'coco://365rili.com/subscribe?calendarID='+G.cid + "&calendarType=public";
    //     this.redirectApp(cocoUrl, bIsIpad||bIsIphoneOs, flag, str);
    // },

    renderDisplay: function() {
        $('body').scrollTop(0);
        $('.ss_main').removeClass('none');
        $('.ss_main').css({
            'position': 'relative',
            'z-index': 5
        });
        $('.sc_main').remove();
    },
    getURLParameter: function(name){
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.hash)||[,""])[1].replace(/\+/g, '%20'))||null;
    }
};

$(document).ready(function() {
    var rRoute, rFormat;

    $.route = function(obj, path) {
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

    $.format = function() {
        var args = Array.prototype.slice.call(arguments), str = String(args.shift() || ""), ar = [], first = args[0];
        args = $.isArray(first) ? first : typeof(first) == 'object' ? args : [args];
        $.each(args, function(i, o){
            ar.push(str.replace(rFormat || (rFormat = /\{([\d\w\.]+)\}/g), function(m, n, v){
                v = n === 'INDEX' ? i : n.indexOf(".") < 0 ? o[n] : $.route(o, n);
                return v === undefined ? m : ($.isFunction(v) ? v.call(o, n) : v)
            }));
        });
        return ar.join('');
    };

    schedule_public.init();
});