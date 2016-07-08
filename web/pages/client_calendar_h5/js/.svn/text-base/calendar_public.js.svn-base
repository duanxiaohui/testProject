
var calendar_public = {
    config: {
        tmpl: '<li>\
                    <div class="comments_title e_clear">\
                        <p class="comments_time">{created}</p>{username}\
                    </div>\
                    <div class="comments_txt e_clear">\
                        <p>{content}<a href="javascript:;" class="reply">回复</a></p>\
                    </div>\
               </li>'
    },
    init: function() {
        calendar_public.getPublicSchedule();
        calendar_public.getPics();
        calendar_public.getUserInfo();
        calendar_public.bindEvents();
    },
    bindEvents: function() {
        $('.main .btn').on('click', function() {
            if($(this).find('.btn_txt').text() == '添加提醒') {
                calendar_public.getFollow();
            } else {
                calendar_public.getUnFollow();
            }
        });
        $('.return_btn').on('click', function() {
            if(/android/i.test(navigator.userAgent)) {
                AliansBridge.back();
            }
            if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
                location.href = 'cocoinapp://back';
            }
        });
        //进入日历
        $('.enter_calendar').on('click', function() {
            var cocoUrl = 'coco://365rili.com/subscribe?time=' + new Date().getTime() + '&calendarID=' + G.cid;
            if(/android/i.test(navigator.userAgent)) {
                location.href = cocoUrl;
            }
            if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
                location.href = 'coco://365rili.com/subscribe?calendarID=' + G.cid;
            }
        });
        //评论
        $('.view_all_comments').on('click', function() {
            if(/android/i.test(navigator.userAgent)) {
                AliansBridge.openComment(G.cid, G.uuid);
            }
            if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
                location.href = 'cocoinapp://comment?cid=' + G.cid + '&uuid=' + G.uuid;
            }
        });
        //分享
        $('.share_btn').on('click', function() {
            var link = location.href;
            if(location.href.indexOf('#') > 0) {
                link = location.href.substr(0, location.href.indexOf('#'));
            }
            if(/android/i.test(navigator.userAgent)) {
                var shareObj = {
                    title: $('.main h3').text(),
                    content: $('.main .txt').text(),
                    link: link,
                    image: G.imgUrl
                };
                AliansBridge.share(JSON.stringify(shareObj));
            }
            if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
                location.href = 'cocoinapp://share';
                G.share = JSON.stringify(shareObj);
            }
        });
    },
    getUserInfo: function() {
        if(/android/i.test(navigator.userAgent)) {
            G.token = AliansBridge.getToken();
        }
        if(/ipad|iphone|mac/i.test(navigator.userAgent)) {
            setTimeout(function () {
                G.token = document.getElementById('TOKEN').value;
            },500);
        }
    },
    getPublicSchedule: function() {
        $.ajax({
            url: '/schedule/getRawPubScheduleById.do',
            type: 'post',
            dataType: 'json',
            data: {
                cid: G.cid,
                sid: G.sid,
                uuid: G.uuid
            },
            success: function(data) {
                calendar_public.handleScheduleData(data);
                setTimeout(function () {
                    $('.calendar_content').fadeIn(500);
                },500)
            }
        });
    },
    handleScheduleData: function(data) {
        if(data.state != 'ok') return;
        $('.main > h3').text(data.s.title);
        $('.main .time').text(calendar_public.formatTime(data.s.startTime));
        if(data.s.location == null || data.s.location == '') {
            $('.main .address').addClass('none');
        }else {
            var location = data.s.location;
            var index = location.indexOf('@');
            if(index > -1) {
                $('.main .address').text(location.substring(0, index));
            }
        }
        if(data.s.url == null || data.s.url == '') {
            $('.main .url').addClass('none');
        }else {
            $('.main .url').text(data.s.url);
        }
        if(G.bell == true) {
            $('.remind_icon').addClass('on');
            $('.btn_txt').text('取消提醒');
        } else {
            $('.remind_icon').removeClass('on');
            $('.btn_txt').text('添加提醒');
        }
        if(data.s.description == null || data.s.description == '') {
            $('.main .txt').addClass('none');
        }else {
            $('.main .txt').text(data.s.description);
        }

        $('.cares, .schedule_more_btn').show();
    },
    getPics: function() {
        $.ajax({
            url: '/schedule/m-getpics.do',
            type: 'post',
            dataType: 'json',
            data: {
                calendarID: G.cid,
                scheduleUUID: G.uuid                                    //'bbd40fb4-ac34-4ad1-b02e-7b6782fcb094'
            },
            success: function(data) {
                calendar_public.handlePics(data);
            }
        });
    },
    handlePics: function(data) {
        if(data.state != 'ok') return;
        var picUrl = data.pic_url,
            picArr = [];
        $.each(data.pics, function(k, v) {
            picArr.push(picUrl + v.pic);
        });
        $('.pic').Slide({ pics: picArr.join(',') });
        if(picArr.length >= 1) {
            G.imgUrl = picArr[0];
        }
        if(!data.replyList || data.replyList.length < 1) return;
        $('.comments_content ul').html($.format(calendar_public.config.tmpl, $.map(data.replyList, function(o) {
            o.created = calendar_public.formatTime(o.created);
            return o;
        })));
    },
    getFollow: function() {
        $.ajax({
            url: '/schedule/follow.do',
            type: 'post',
            dataType: 'json',
            data: {
                cid: G.cid,
                uuid: G.uuid
            },
            headers: {
                'x-365rili-key' : G.token
            },
            success: function(data) {
                if(data.state != 'ok') return;
                if(/android/i.test(navigator.userAgent)) {
                    AliansBridge.follow(JSON.stringify(data.schedule), G.uuid);
                }
                if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
                    location.href = 'cocoinapp://follow?uuid=' + G.uuid;
                    G.schedule = JSON.stringify(data.schedule);
                }
            }
        });
    },
    getUnFollow: function() {
        $.ajax({
            url: '/schedule/unfollow.do',
            type: 'post',
            dataType: 'json',
            data: {
                cid: G.cid,
                uuid: G.uuid
            },
            headers: {
                'x-365rili-key' : G.token
            },
            success: function(data) {
                if(data.state != 'ok') return;
            }
        });
    },
    formatTime: function(time) {
        return new Date(parseInt(time)).toLocaleString().replace(/:d{1,2}$/,' ');
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

    calendar_public.init();
});