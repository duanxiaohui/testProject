/**
 * movie
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-04-15 11:14:33
 */

(function () {
	if(app.getUa.weixin){
		$('.gdyp').attr('href', 'http://www.365rili.com/c/NzZhNTkyZTAtMTdjMC00ZGQ0LThmODQtNmNjMjdlNTM0NWNl');
        wxProtocol.init(function (wx, link) {
            wx.onMenuShareAppMessage({
                title: '终于找到了，上海国际电影节掌门贴，必看影片一网打尽！',
                desc: '一分钟看完上海国际电影节最全攻略，我只说重点！',
                link: 'http://www.365rili.com/pages/bd/movie_sh/wx/index.html',
                imgUrl: 'http://www.365rili.com/pages/bd/movie_sh/images/wx.jpg',
                success:function () {
                    $.ajax({
                        url: '/operation/share.do?shareId=118&channel=weixin'
                    });
                }
            });
            wx.onMenuShareTimeline({
                title: '一分钟看完上海国际电影节最全攻略，必看影片一网打尽！',
                link: 'http://www.365rili.com/pages/bd/movie_sh/wx/index.html',
                imgUrl: 'http://www.365rili.com/pages/bd/movie_sh/images/wx.jpg',
                success:function () {
                    $.ajax({
                        url: '/operation/share.do?shareId=118&channel=weixin'
                    });
                }
            });
        });
	}
	else{
        if(window.location.pathname.split('/')[4] == 'plaza'){
            $('<div class="bar">\
                <a href="javascript:;" class="share_btn"></a>\
                <a href="javascript:;" class="return_btn"></a>\
                <div class="bar_txt">上海国际电影节全攻略</div>\
            </div>').appendTo('body');
            $('body').addClass('plaza');
            $('.share_btn').on('tap', function () {
                $.ajax({
                    url:'/operation/share.do?shareId=118&channel=plaza',
                    success: function () {
                        app.call({
                            action: 'share',
                            params: [
                                {
                                    name: 'shareString',
                                    value: JSON.stringify({
                                        title: '终于找到了，上海国际电影节掌门贴，必看影片一网打尽！',
                                        content: '一分钟看完上海国际电影节最全攻略，我只说重点！',
                                        link: 'http://www.365rili.com/pages/bd/movie_sh/wx/index.html',
                                        image: 'http://www.365rili.com/pages/bd/movie_sh/images/wx.jpg',
                                        isEvent: 'true'
                                    })
                                }
                            ],
                            callBack: function (headers) {}
                        });
                    }
                });
            });
        }
        if(app.getUa.android){
            $('.gdyp').hide();
        }
		$('.gdyp').on('click', function () {
            $.ajax({
                url: '/operation/share.do?shareId=118&channel=more',
                success:function () {
                    app.open(
                        {
                            ios:'coco://365rili.com/subscribe?calendarID=125821939&calendarType=public',
                            android:'coco://365rili.com/subscribe?calendarID=125821939'
                        },
                        app.getUa.ios
                    );
                }
            })
		});
		$('<img src="/pages/bd/movie_sh/images/share.png" class="share" alt="" />').on('click', function () {
            if(window.location.pathname.split('/')[4] == 'hotevent'){
                $.ajax({
                    url:'/operation/share.do?shareId=118&channel=hot',
                    success: function () {
                        $.ajax({
                            url:'http://www.365rili.com/tmpmessage/shared.do',
                            data:{
                                id: '3',
                                target: '.'
                            },
                            success: function (datas) {
                                if(datas.state != 'ok'){
                                    return false;
                                }
                                app.call({
                                    action: 'share',
                                    params: [
                                        {
                                            name: 'shareString',
                                            value: JSON.stringify({
                                                title: '终于找到了，上海国际电影节掌门贴，必看影片一网打尽！',
                                                content: '一分钟看完上海国际电影节最全攻略，我只说重点！',
                                                link: 'http://www.365rili.com/pages/bd/movie_sh/wx/index.html',
                                                image: 'http://www.365rili.com/pages/bd/movie_sh/images/wx.jpg',
                                                isEvent: 'true'
                                            })
                                        }
                                    ],
                                    callBack: function (headers) {}
                                });
                            },
                            error: function () {

                            }
                        });
                    }
                });
            }
            else{
                $.ajax({
                    url:'/operation/share.do?shareId=118&channel=plaza',
                    success: function () {
                        app.call({
                            action: 'share',
                            params: [
                                {
                                    name: 'shareString',
                                    value: JSON.stringify({
                                        title: '终于找到了，上海国际电影节掌门贴，必看影片一网打尽！',
                                        content: '一分钟看完上海国际电影节最全攻略，我只说重点！',
                                        link: 'http://www.365rili.com/pages/bd/movie_sh/wx/index.html',
                                        image: 'http://www.365rili.com/pages/bd/movie_sh/images/wx.jpg',
                                        isEvent: 'true'
                                    })
                                }
                            ],
                            callBack: function (headers) {}
                        });
                    }
                });
            }
		}).appendTo('.footer');
	}
})();