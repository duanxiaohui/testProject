/**
 * qp_holiday
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-10-19 17:04:23
 */

(function () {

    //分享数据
	var title = $('.info_txt h1').html();
	var content = $('.qp_main p:first').html();
	var image = $('.top_img img:first')[0].src;

	if(app.version){
        var shareData ={
            "title": title,
            "content": content,
            "link":window.location.href.replace('\?needMore=true' ,''),
            "image": image
        }
        try{
            app.call({
                action: 'setShareContent',
                params: [
                    {
                        name: 'shareString',
                        value: JSON.stringify(shareData)
                    }
                    ],
                callBack: null
            })
        }catch(e){}
    }else if(app.getUa.weixin){
        footer.init({
            type: 'publicSchedule',
            cocourl: 'coco://365rili.com'
        });

        wxProtocol.init(function (wx, link) {
            wx.onMenuShareAppMessage({
                title: title,
                desc: content,
                imgUrl: image
            });
            wx.onMenuShareTimeline({
                title: title,
                imgUrl: image
            });
        });
    }
    
    //往期按钮
    if(app.query('needMore') == 'true') {
        $('.info').append('<a class="qpholidaylistbtn" href="javascript:;">查看往期奇葩节日内容</a>');

        $('.qpholidaylistbtn').on('tap', function () {
            if(window.location.pathname == '/discover/list.do'){
                app.call({
                    action: 'openUrlWithNewActivity',
                    params: [
                        {
                            name: 'url',
                            value: 'http://www.365rili.com/pages/found/qp_holiday_list.html'
                        },
                        {
                            name: 'isInnerWebview',
                            value: true
                        }
                    ],
                    callBack: null
                })
            }
            else{
                window.location.href = 'http://www.365rili.com/pages/found/qp_holiday_list.html';
            }
        })
    }

})();