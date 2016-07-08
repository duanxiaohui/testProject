/**
 * list
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-08-05 17:48:55
 */

(function() {
    var focusData = [];
    var temp = '<dl class="list e_clear js-calendar" data-id="{$id}">\
                    <dt class="list_face">\
                        <a href="javascript:;" data-src="{$picpath}{$logo}"><div class="loading"><div class="circle1"></div></div></a>\
                    </dt>\
                    <dd class="list_main">\
                        <a href="javascript:;" class="list_focus js-list_focus" data-id="{$id}" data-status="unsubscribe">关注</a>\
                        <div class="list_info">\
                            <a class="overT" href="javascript:;">{$title}</a>\
                            <p class="overT">收藏人数：{$userCount}{$subCount}{$user_count}</p>\
                            <p class="overT">{$description}{$desc}</p>\
                        </div>\
                    </dd>\
                </dl>';
    window.init = function() {
        focusData = window.data || ['125795741', '238209325'];
        parseFocus();
    };

    function jumpCalendar (e) {
        var _this = $(this).parents('.js-calendar');
        var id = _this.attr('data-id');
        callCoCo('openCalendar', {
            calendarID: id
        });
    }

    function parseFocus() {
        var o = null;
        for (var i = 0; i < focusData.length; i++) {
            o = $('.js-list_focus[data-id="'+focusData[i]+'"]');
            if(o){
                o.attr('data-status', 'subscribe')
                 .addClass('list_focus_cancel');
            }
        }
    }

    window.loadList = function (typeId) {
        typeId = typeId || query('type') || 3;

        var headers = {};
        var cocoua;
        var ua = navigator.userAgent;
        if(app.getUa.android){
            ua = ua.split('Android-coco')[1];
            if(ua){
                cocoua = 'Android-coco' + ua;
            }
            else{
                cocoua = 'Android';
            }
        }
        else if(app.getUa.ios){
            ua = ua.split('iOS-coco')[1];
            if(ua){
                cocoua = 'iOS-coco' + ua;
            }
            else{
                
                cocoua = 'iOS';
            }
        }
        headers['coco-ua'] = cocoua;
        $.ajax({
            url: '/calendar/getHallCalendars.do',
            type: 'POST',
            dataType: 'json',
            headers:headers,
            data: {
                categoryId: typeId
            },
            beforeSend: function () {
            	$('<div class="loadmore" style="display: none;">加载中...<div class="icon_loadmore"></div></div>').insertAfter('.content').show();
            },
            complete: function () {
        		setTimeout(function () {
        			$('.loadmore').fadeOut(100, function () {
	        			$(this).remove();
	        		});
        		},500);
            },
            success: function(datas) {
                if (datas.state !== 'ok') {
                    $('.content')[0].innerHTML = '';
                    return false;
                }
                datas.pic_path += '/';
                parseCalendarList(datas.data[0].calendars, datas.pic_path);
            },
            error: function() {

            }
        });
    }

    window.parseCalendarList = function (calendars, picpath) {
        temp = temp.replace('{$picpath}', picpath);
    	calendars.sort(function (x, y) {
    		return x.seq - y.seq;
    	});

    	$('.content')[0].innerHTML = template(temp, calendars, {
            userCount: function (o) {
                if(o === 0){
                    return '0';
                }
                return o || '';
            },
            user_count: function (o) {
                if(o === 0){
                    return '0';
                }
                return o || '';
            },
            subCount: function (o) {
                if(o === 0){
                    return '0';
                }
                return o || '';
            },
            description: function (o) {
                return o ? o : '';
            }
        });
    	parseImg();
        parseFocus();
    }

    function parseImg () {
    	var imgBoxs = $('.list_face a');
    	for (var i = 0; i < imgBoxs.length; i++) {
    		loadImg($(imgBoxs[i]));
    	};
    }

    function loadImg ($o) {
    	var src = $o.attr('data-src');
    	var img = new Image;
    	img.$o = $o;
    	img.onload = changeLoadingToImg;
    	img.src = src;
    }

    function changeLoadingToImg () {
    	var _this = this;
    	var $o = _this.$o;
    	$o.fadeOut(200, function () {
    		$o.children().remove();
    		$o.addClass('loaded')
    		$o.append(_this);
    		$o.fadeIn(200);
    	})
    }


    $('.content').on('tap', '.list_info, .list_face', jumpCalendar);
})();
