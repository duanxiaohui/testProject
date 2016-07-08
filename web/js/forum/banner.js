/**
 * banner
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-08-04 15:03:02
 */

(function() {
    function loadData() {
        var headers = {};
        if(app.getUa.android){
            headers['coco-ua'] = 'android';
        }
        $.ajax({
            url: '/calendar/getHallPicById.do',
            type: 'GET',
            dataType: 'json',
            headers:headers,
            success: function(datas) {
                if (datas.state !== 'ok') {
                    $('.activity').remove();
                    return false;
                }
                parseBanner(datas.rotate);
                parseActivity(datas.activity);
            },
            error: function() {
                
            }
        });
    }

    function parseBanner(rotates) {
        if(!rotates){
            return false
        }
        var $bannerBox = $('.banner_box');
        var html = [];
        for (var i = 0; i < rotates.length; i++) {
            html.push(insertBannerItem(rotates[i], i));
        };
        $bannerBox.removeClass('banner_loading');
        $bannerBox[0].innerHTML = html.join('');
        if(rotates.length){
            $('.banner').removeClass('none').Swipe(args());
        }
    }

    function insertBannerItem(rotate, i) {
        var image = new Image;

        image.i = i;
        image.onload = changeBannerLoadingToImage;

        setTimeout(function() {
            image.src = rotate.photo;
        });
        var url = '';
        switch (rotate.action) {
            case 1 :
                url = rotate.url;
                break;
            case 2 :
                url = 'coco://365rili.com/openCalendar?calendarID=' + rotate.url;
                break;
            case 3 :
                var uuid, cid;
                var ids = rotate.url.split(',');
                cid = ids[0];
                uuid = ids[1];
                if(app.getUa.ios){
                    url = 'coco52://365rili.com/schedule?scheduleUuid='+uuid+'&cid='+cid;
                }
                else{
                    url = 'http://www.365rili.com/temp/t_141226.html';
                }
                break;
            case 4 : 
                url = rotate.url;
        }
        return '<a href="'+url+'" class="banner_item"><div class="banner_loading"><div class="circle"></div><div class="circle1"></div></div></a>';
    }

    function changeBannerLoadingToImage() {
        var $item = $('.banner_item').eq(this.i);
        var $loading = $item.find('.banner_loading');
        var _this = this;
        $item.animate({
            opacity: 0
        }, 500, 'ease-out', function() {
            $item.removeClass('banner_loading');
            $loading.remove();
            $item.append(_this);
            $item.animate({
                opacity: 1
            }, 500, 'ease-out');
        });
    }

    function parseActivity(activitys) {
        if(!activitys || !activitys.length){
            return $('.activity').remove();
        }
        var $activityBox = $('<div class="activity_box"></div>').appendTo('.activity');
        var html = [];

        for (var i = 0; i < activitys.length; i++) {
            html.push(insertActivityItem(activitys[i], i));
        };
        $activityBox[0].innerHTML = html.join('');
        $('.activity').Swipe(args());
    }

    function insertActivityItem(activity, i) {
        var image = new Image;

        image.i = i;
        image.onload = changeActivityLoadingToImage;

        setTimeout(function() {
            image.src = activity.photo;
        });
        var url = '';
        switch (activity.action) {
            case 1 :
                url = activity.url;
                break;
            case 2 :
                url = 'coco://365rili.com/openCalendar?calendarID=' + activity.url;
                break;
            case 3 :
                var uuid, cid;
                var ids = activity.url.split(',');
                cid = ids[0];
                uuid = ids[1];
                if(app.getUa.ios){
                    url = 'coco52://365rili.com/schedule?scheduleUuid='+uuid+'&cid='+cid;
                }
                else{
                    url = 'coco://365rili.com/schedule?scheduleUuid='+uuid+'&cid='+cid
                }
                break;
            case 4 : 
                url = activity.url;
        }
        return '<a href="'+url+'" class="activity_item"><div class="activity_loading"><div class="circle"></div><div class="circle1"></div></div></a>';
    }

    function changeActivityLoadingToImage() {
        var $item = $('.activity_item').eq(this.i);
        var $loading = $item.find('.activity_loading');
        var _this = this;
        $item.animate({
            opacity: 0
        }, 500, 'ease-out', function() {
            $item.removeClass('activity_loading');
            $loading.remove();
            $item.append(_this);
            $item.animate({
                opacity: 1
            }, 500, 'ease-out');
        });
    }

    loadData();
})();
